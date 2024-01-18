export class LibIDB {
    private db: IDBDatabase | null = null;

    private async initDb(dbName: string): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            
            const openRequest = indexedDB.open(dbName);

            openRequest.onupgradeneeded = (e) => {
                if (e.oldVersion === 0) {
                    const req = indexedDB.deleteDatabase(dbName)
                    req.onsuccess = e => {
                        reject(new Error("Database not found"))
                    }
                }
                const db = openRequest.result;
                if (!db.objectStoreNames.contains('$LOOKUP'))
                    db.createObjectStore('$LOOKUP');
                if (!db.objectStoreNames.contains('$ITEMS'))
                    db.createObjectStore('$ITEMS');
            };

            openRequest.onsuccess = () => {
                this.db = openRequest.result;
                resolve(this.db);
            };

            openRequest.onerror = () => {
                reject(openRequest.error);
            };
        });
    }

    async drive(dbName: string): Promise<LibIDB> {
        await this.initDb(dbName);
        return this;
    }

    async file(filePath: string): Promise<Blob | null> {
        if (!this.db)
            throw new Error('Database is not initialized.');

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction('$LOOKUP', 'readonly');
            const store = transaction.objectStore('$LOOKUP');
            const request = store.get(filePath);

            request.onsuccess = () => {
                const fileId = request.result;

                // If fileId is not found, resolve with null
                if(!fileId) {
                    resolve(null);
                    return;
                }

                const transItems = this.db.transaction('$ITEMS', 'readonly');
                const storeItems = transItems.objectStore('$ITEMS');
                const reqItem = storeItems.get(fileId.toString());

                reqItem.onsuccess = () => resolve(reqItem.result);

                reqItem.onerror = () => reject(reqItem.error);

            };

            request.onerror = () => reject(request.error);
        });
    }
    async createFile(filePath: string, fileContent: Blob): Promise<void> {
        if (!this.db)
            throw new Error('Database is not initialized.');

        const transaction = this.db.transaction(['$LOOKUP', '$ITEMS'], 'readwrite');
        const lookupStore = transaction.objectStore('$LOOKUP');
        const itemsStore = transaction.objectStore('$ITEMS');

        const fileId = Math.random().toString(16).slice(2);

        lookupStore.put(fileId, filePath);
        itemsStore.put({ id: fileId, content: fileContent }, fileId);
    }

    async deleteFile(filePath: string): Promise<void> {
        if (!this.db)
            throw new Error('Database is not initialized.');

        const transaction = this.db.transaction(['$LOOKUP', '$ITEMS'], 'readwrite');
        const lookupStore = transaction.objectStore('$LOOKUP');
        const itemsStore = transaction.objectStore('$ITEMS');

        const fileId = await this.getFileId(filePath);

        lookupStore.delete(filePath);
        itemsStore.delete(fileId);
    }

    async renameFile(oldFilePath: string, newFilePath: string): Promise<void> {
        if (!this.db)
            throw new Error('Database is not initialized.');

        const transaction = this.db.transaction(['$LOOKUP'], 'readwrite');
        const lookupStore = transaction.objectStore('$LOOKUP');

        const fileId = await this.getFileId(oldFilePath);

        lookupStore.delete(oldFilePath);
        lookupStore.put(fileId, newFilePath);
    }

    async moveFile(oldFilePath: string, newFilePath: string): Promise<void> {
        // Move is the same as rename in this context
        await this.renameFile(oldFilePath, newFilePath);
    }

    async editFile(filePath: string, newContent: Blob): Promise<void> {
        if (!this.db)
            throw new Error('Database is not initialized.');

        const transaction = this.db.transaction(['$ITEMS'], 'readwrite');
        const itemsStore = transaction.objectStore('$ITEMS');

        const fileId = await this.getFileId(filePath);

        return new Promise((resolve, reject) => {
            const cursorRequest = itemsStore.openCursor(fileId);

            cursorRequest.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
                if (cursor) {
                    const file = cursor.value;
                    file.content = newContent;
                    cursor.update(file);
                    resolve();
                } else {
                    reject(new Error('File not found'));
                }
            };

            cursorRequest.onerror = () => {
                reject(cursorRequest.error);
            };
        });
    }

    private async getFileId(filePath: string): Promise<string> {
        if (!this.db)
            throw new Error('Database is not initialized.');

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['$LOOKUP'], 'readonly');
            const lookupStore = transaction.objectStore('$LOOKUP');

            const request = lookupStore.get(filePath);

            request.onsuccess = () => resolve(request.result as string);
            request.onerror = () => reject(request.error);
        });
    }

}

export const libIDB = new LibIDB();
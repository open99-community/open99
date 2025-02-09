import { DBDriver } from "../interface";
import { FileContentTypes, FileMetadataType } from "../../types/fs";
import { Drive } from "..";

export class IDBDriver implements DBDriver {
    name: string = "IDB";
    private db: IDBDatabase | null = null;

    async init(drive: Drive): Promise<void | Error> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(drive.UUID, 1);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                db.createObjectStore("lookup", { keyPath: "path" });
                db.createObjectStore("content", { keyPath: "id" });
                db.createObjectStore("metadata", { keyPath: "id" });
            };

            request.onsuccess = (event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve();
            };

            request.onerror = (event) => {
                reject(new Error("Failed to open IndexedDB"));
            };
        });
    }

    async write(path: string, content: FileContentTypes, metadata?: FileMetadataType): Promise<void | Error> {
        if (!this.db) return new Error("Database not initialized");

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(["lookup", "content", "metadata"], "readwrite");
            const lookupStore = transaction.objectStore("lookup");
            const contentStore = transaction.objectStore("content");
            const metadataStore = transaction.objectStore("metadata");

            const lookupRequest = lookupStore.get(path);
            lookupRequest.onsuccess = () => {
                const id = lookupRequest.result ? lookupRequest.result.id : this.generateId();
                lookupStore.put({ path, id });
                contentStore.put({ id, content });
                if (metadata) {
                    metadataStore.put({ id, ...metadata });
                }

                transaction.oncomplete = () => resolve();
                transaction.onerror = () => reject(new Error("Failed to write to IndexedDB"));
            };
        });
    }

    async read(path: string): Promise<FileContentTypes | Error> {
        if (!this.db) return new Error("Database not initialized");

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction("lookup", "readonly");
            const lookupStore = transaction.objectStore("lookup");
            const lookupRequest = lookupStore.get(path);

            lookupRequest.onsuccess = () => {
                const id = lookupRequest.result ? lookupRequest.result.id : null;
                if (!id) return reject(new Error("File not found"));

                const contentTransaction = this.db!.transaction("content", "readonly");
                const contentStore = contentTransaction.objectStore("content");
                const contentRequest = contentStore.get(id);

                contentRequest.onsuccess = () => {
                    const result = contentRequest.result;
                    if (result) {
                        resolve(result.content);
                    } else {
                        reject(new Error("File not found"));
                    }
                };

                contentRequest.onerror = () => reject(new Error("Failed to read from IndexedDB"));
            };

            lookupRequest.onerror = () => reject(new Error("Failed to read from IndexedDB"));
        });
    }

    async readDir(path: string): Promise<string[] | Error> {
        if (!this.db) return new Error("Database not initialized");

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction("lookup", "readonly");
            const lookupStore = transaction.objectStore("lookup");
            const request = lookupStore.getAllKeys();

            request.onsuccess = (event) => {
                const result = (event.target as IDBRequest).result;
                resolve(result.filter((filePath: string) => filePath.startsWith(path)));
            };

            request.onerror = () => reject(new Error("Failed to read directory from IndexedDB"));
        });
    }

    async readMetadata(path: string): Promise<FileMetadataType | Error> {
        if (!this.db) return new Error("Database not initialized");

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction("lookup", "readonly");
            const lookupStore = transaction.objectStore("lookup");
            const lookupRequest = lookupStore.get(path);

            lookupRequest.onsuccess = () => {
                const id = lookupRequest.result ? lookupRequest.result.id : null;
                if (!id) return reject(new Error("Metadata not found"));

                const metadataTransaction = this.db!.transaction("metadata", "readonly");
                const metadataStore = metadataTransaction.objectStore("metadata");
                const metadataRequest = metadataStore.get(id);

                metadataRequest.onsuccess = () => {
                    const result = metadataRequest.result;
                    if (result) {
                        resolve(result);
                    } else {
                        reject(new Error("Metadata not found"));
                    }
                };

                metadataRequest.onerror = () => reject(new Error("Failed to read metadata from IndexedDB"));
            };

            lookupRequest.onerror = () => reject(new Error("Failed to read metadata from IndexedDB"));
        });
    }

    async delete(path: string): Promise<void | Error> {
        if (!this.db) return new Error("Database not initialized");

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction(["lookup", "content", "metadata"], "readwrite");
            const lookupStore = transaction.objectStore("lookup");
            const contentStore = transaction.objectStore("content");
            const metadataStore = transaction.objectStore("metadata");

            const lookupRequest = lookupStore.get(path);
            lookupRequest.onsuccess = () => {
                const id = lookupRequest.result ? lookupRequest.result.id : null;
                if (!id) return reject(new Error("File not found"));

                lookupStore.delete(path);
                contentStore.delete(id);
                metadataStore.delete(id);

                transaction.oncomplete = () => resolve();
                transaction.onerror = () => reject(new Error("Failed to delete from IndexedDB"));
            };

            lookupRequest.onerror = () => reject(new Error("Failed to delete from IndexedDB"));
        });
    }

    async mv(oldPath: string, newPath: string): Promise<void | Error> {
        const content = await this.read(oldPath);
        if (content instanceof Error) return content;

        const metadata = await this.readMetadata(oldPath);
        if (metadata instanceof Error) return metadata;

        await this.write(newPath, content, metadata);
        await this.delete(oldPath);
    }

    async cp(oldPath: string, newPath: string): Promise<void | Error> {
        const content = await this.read(oldPath);
        if (content instanceof Error) return content;

        const metadata = await this.readMetadata(oldPath);
        if (metadata instanceof Error) return metadata;

        await this.write(newPath, content, metadata);
    }

    async getFreeSpace(): Promise<number | Error> {
        return new Promise((resolve) => {
            resolve(Infinity); // IndexedDB does not have a straightforward way to get free space
        });
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}

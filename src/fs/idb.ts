export async function loadStore(): Promise<IDBDatabase> {
    // noinspection TypeScriptUMDGlobal
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("open99", 2);

        request.onupgradeneeded = () => {
            console.log("Database upgrade needed!");
            const db = request.result;
            if (!db.objectStoreNames.contains("C")) {
                db.createObjectStore("C", {keyPath: "path"});
            }
        };

        request.onsuccess = () => {
            //console.log("Database loaded successfully!");
            const db = request.result;

            try {
                db.transaction("C", "readwrite");
                resolve(db);
            } catch (error) {
                console.error("An error occurred while creating the transaction or storing the record:", error);
                reject(error);
            }
        };

        request.onerror = event => {
            console.error("An error occurred while creating the database:", event);
            reject(event);
        };
    });
}

export const database: IDBDatabase = await loadStore();
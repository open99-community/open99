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

// Execution context must be within an async function to use `await` keyword.
// Therefore, export it as a Promise:
export const database: Promise<IDBDatabase> = loadStore();
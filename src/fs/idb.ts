export async function loadStore(): Promise<IDBDatabase> {
    // noinspection TypeScriptUMDGlobal
    return new Promise((resolve, reject) => {
        // dont change the version number ever
        const request = indexedDB.open("open99", 2);

        request.onupgradeneeded = (e) => {
            if (e.oldVersion === 0) {
                console.log("Database created successfully!");
                return;
            } else {
                console.warn(`Database version upgraded from ${e.oldVersion} to ${e.newVersion}
                Upgrading the database is unnecessary and breaks things. See
                https://learn.d.pluto.stretch.wtf/platform#kernel-versioning`);
            }
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
                console.error("[fatal] Error occured when calling IDB transaction:", error);
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
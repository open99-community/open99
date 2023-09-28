export async function loadStore() {
    // noinspection TypeScriptUMDGlobal
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("open99", 2)

        request.onupgradeneeded = event => {
            console.log("Database upgrade needed!")
            const db = request.result
            if (!db.objectStoreNames.contains("C")) {
                const filesys = db.createObjectStore("C", {keyPath: "path"})
            }
        }

        request.onsuccess = () => {
            console.log("Database created successfully!")
            const db = request.result

            try {
                const transaction = db.transaction("C", "readwrite")
                const store = transaction.objectStore("C")
                resolve(db)
            } catch (error) {
                console.error("An error occurred while creating the transaction or storing the record:", error)
                reject(error)
            }
        }

        request.onerror = event => {
            console.error("An error occurred while creating the database:", event)
            reject(event)
        }
    })
}
const db = await loadStore()

export const database = db
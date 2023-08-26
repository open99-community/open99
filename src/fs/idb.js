export async function loadStore() {
    // noinspection TypeScriptUMDGlobal
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("open99", 2)

        request.onupgradeneeded = event => {
            console.log("Database upgrade needed!")
            const db = request.result
            if (!db.objectStoreNames.contains("c")) {
                const filesys = db.createObjectStore("c", {keyPath: "path"})
                console.log(filesys)
            }
        }

        request.onsuccess = () => {
            console.log("Database created successfully!")
            const db = request.result

            try {
                const transaction = db.transaction("c", "readwrite")
                const store = transaction.objectStore("c")
                store.add({path: "test-key", content: "test-content"})
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
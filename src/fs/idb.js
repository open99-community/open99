export async function loadStore() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("open99", 2)
        request.onupgradeneeded = event => {
            console.log("Database upgrade needed!")
            const db = event.target.result
            const filesys = db.createObjectStore("c", {keyPath: "path"})
            console.log(filesys)
        }
        request.onsuccess = event => {
            console.log("Database created successfully!")
            const db = event.target.result
            const transaction = db.transaction("c", "readwrite")
            const store = transaction.objectStore("c")
            store.add({path: "test-key", content: "test-content"})
            resolve(db)
        }
        request.onerror = event => {
            console.error("An error occurred while creating the database:", event)
            reject(event)
        }
    })
}
export const db = await loadStore()
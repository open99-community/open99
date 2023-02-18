const fsTask = async () => {

    let openRequest = window.indexedDB.open("open99", 1)
    openRequest.onerror = e => {
        return new Error("Error when attempting to open database: " + e)
    }
    /**
     * the database
     * @type {IDBDatabase}
     */
    let db
    openRequest.onsuccess = e => {
        db = openRequest.result
    }
    if (db) {
        db.createObjectStore("C:/")
        return db
    }
}

export default fsTask
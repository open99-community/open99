const fsTask = async () => {

    let openRequest = window.indexedDB.open("open99", 1)
    openRequest.onerror = e => {
        return new Error("Error when attempting to open database")
    }
    let db
    openRequest.onsuccess = e => {
        db = openRequest.result
    }
    if (db) {
        sys41._db = db
    }
    db.createObjectStore("C:/")
}

export default fsTask
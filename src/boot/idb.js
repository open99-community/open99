const fsTask = () => {

    let openRequest = window.indexedDB.open("open99", 1)
    openRequest.onerror = e => {
        console.log("Error when attempting to open database: " + e)
    }
    return new Promise((resolve, reject) => {
        openRequest.onsuccess = e => {
            resolve(openRequest.result || e.target.result)
        }
        openRequest.onerror = e => {
            reject("Error opening db:" + e)
        }
    })
}

export default fsTask
const idb = () => {

    let openRequest = window.indexedDB.open("open99", 1)
    return new Promise((resolve, reject) => {
        openRequest.onsuccess = e => {
            resolve(openRequest.result || e.target.result)
        }
        openRequest.onerror = e => {
            reject("Error attempting to open db:" + e)
        }
    })
}

export default idb
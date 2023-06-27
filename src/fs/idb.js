/**
 * IDB
 * @returns {IDBDatabase}
 */
const idb = async () => {
    let openRequest = window.indexedDB.open("open99", 1)
    return new Promise((resolve, reject) => {
        openRequest.onsuccess = () => {
            resolve(openRequest.result)
        }
        openRequest.onerror = e => {
            reject("Error attempting to open db:" + e)
        }
    })
}

const result = await idb()
result.onversionchange = (ev) => {
    console.log("IndexedDB version change detected", ev)
}

export default result
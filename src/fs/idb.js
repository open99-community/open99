/**
 * IDB
 * @returns {Promise<IDBDatabase> | Promise<Error>}
 */
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
/**
 * lets just assume this isn't an error for now
 * @type {IDBDatabase}
 */
const result = await idb()
result.onversionchange = (ev) => {
    console.log("IndexedDB version change detected", ev)
}

export default result
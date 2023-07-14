import { db } from "../fs/idb.js"

/**
 * file system item (should be extended)
 * @abstract
 */
const FileSystemItem = class {
    /**
     * creates an entry in the idb
     * @param {Object} arg
     * @param {string} arg.path Path to item
     * @param {string} [arg.content] Item content
     */
    constructor({
        path,
        content= ""
    }){
        this.path = path
        this.content = content
    }

    /**
     * Saves the file system item.
     * @returns {Promise<void> | Promise<ErrorEvent>}
     */
    save(){
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("c", "readwrite")
            const store = transaction.objectStore("c")
            const request = store.add({path: this.path, content: this.content})
            request.onsuccess = () => {
                resolve()
            }
            request.onerror = (error) => {
                reject(error)
            }
        })
    }

    /**
     * Removes the file system item
     * @returns {Promise<void> | Promise<ErrorEvent>}
     */
    remove() {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("c", "readwrite")
            const store = transaction.objectStore("c")
            const request = store.delete(this.path)
            request.onsuccess = () => {
                resolve()
            }
            request.onerror = (error) => {
                reject(error)
            }
        })
    }
}

export default FileSystemItem
import { db } from "./idb.js"

/**
 * file system item (should be extended)
 */
class FileSystemItem {
    path: string
    content: string
    constructor(data: {
        //https://github.com/Microsoft/TypeScript/issues/5326
        path: string,
        content: string,
    }){
        data.path = this.path
        data.content = this.content
        this.save()
    }

    /**
     * Saves the file system item.
     */
    save(): Promise<this> {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction("c", "readwrite")
            const store = transaction.objectStore("c")
            const request = store.add({path: this.path, content: this.content})
            request.onsuccess = () => {
                resolve(this)
            }
            request.onerror = (error) => {
                reject(error)
            }
        })
    }

    /**
     * Removes the file system item
     */
    remove(): Promise<void> {
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
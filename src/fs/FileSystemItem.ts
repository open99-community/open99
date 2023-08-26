import { database } from "./idb.js"

/**
 * file Pluto item (should be extended)
 */
class FileSystemItem {
    path: string
    content: string | Blob
    constructor(data: {
        //https://github.com/Microsoft/TypeScript/issues/5326
        path: string,
        content: string | Blob,
    }){
        this.path = data.path
        this.content = data.content
        this.save()
        console.log(this.path, this.content)
    }

    /**
     * Saves the file Pluto item.
     */
    save(): Promise<this> {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("c", "readwrite")
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
     * Removes the file Pluto item
     */
    remove(): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction("c", "readwrite")
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
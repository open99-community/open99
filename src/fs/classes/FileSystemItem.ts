import { database } from "../idb.js"
import { Store } from "../../types/fs";

/**
 * file item (should be extended)
 */
class FileSystemItem {
    path: string
    content: string | Blob | undefined
    store: Store
    constructor(data: {
        //https://github.com/Microsoft/TypeScript/issues/5326
        path: string,
        content?: string | Blob | undefined,
        store?: Store
    }){
        this.path = data.path
        this.content = data.content ?? ""
        this.store = data.store ?? "C"
        console.log("ACCESS FILE", this.path, this.content)
    }

    /**
     * Saves the file item.
     */
    save(): Promise<this> {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(this.store, "readwrite")
            const store = transaction.objectStore(this.store)
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
     * Removes the file item
     */
    remove(): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(this.store, "readwrite")
            const store = transaction.objectStore(this.store)
            const request = store.delete(this.path)
            request.onsuccess = () => {
                resolve()
            }
            request.onerror = (error: unknown) => {
                reject(error)
            }
        })
    }

    /**
     * Returns the content of the item.
     */
    async Vcontent(): Promise<string | Blob | undefined> {
        return this.content
    }

    /**
     * writes to file
     */
    async write(content: string | Blob): Promise<this> {
        return this
    }
}

export default FileSystemItem
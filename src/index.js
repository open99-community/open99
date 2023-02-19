import fsApi from "./fs/fs.js";
import fsTask from "./boot/idb.js";

window.sys41 = {
    fs: fsApi,
    /**
     * the raw database
     * @type {IDBDatabase}
     */
    _db: await fsTask()
}
import fsApi from "./fs/fs.js"
import fsTask from "./boot/idb.js"
import Bootscreen from "./boot/boot.js"

window.sys41 = {
    fs: fsApi,
    /**
     * the raw database
     * @type {IDBDatabase}
     */
    _db: await fsTask(),
    _boot: new Bootscreen(document.getElementsByClassName("boot")[0])
}
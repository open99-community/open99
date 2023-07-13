import Bootscreen from "./gui/boot.js"
import idb from "./fs/idb.js"
import {loadRootFs} from "./fs/loadRootFs.js"
import fsApi from "./fs/fs.js"
import AppRuntime from "./41worker/AppRuntime.js"
const sys41 = {}
if (process.env.NODE_ENV === "development") {
    window.sys41 = sys41
}
sys41._boot = new Bootscreen(document.getElementsByClassName("boot")[0])
sys41._db = idb
sys41.fs = fsApi
sys41.AppRuntime = AppRuntime

sys41._boot.write("open99 BETA rewrite booting on " + navigator.userAgent + " at " + new Date() + "...")

//ROOTFS-LOAD
sys41._boot.write("Writing root fs...")
try {
    await loadRootFs()
    //throw new Error("test catch of the error!!!")
    sys41._boot.write("Root filesystem loaded", ["success"])
} catch (e) {
    sys41._boot.write("Root filesystem failed to load", ["error"])
    sys41._boot.write(e, ["error", "blink"])
}
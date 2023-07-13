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

sys41._boot.write({ text: "open99 BETA rewrite booting on " + navigator.userAgent + " at " + new Date() })

//ROOTFS-LOAD
sys41._boot.write({text: "Writing root fs..."})
await loadRootFs()
sys41._boot.write({text: "Root filesystem loaded!", features: {success: true}})
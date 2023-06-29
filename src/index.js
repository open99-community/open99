import Bootscreen from "./gui/boot.js"
import idb from "./fs/idb.js"
import {loadRootFs} from "./fs/loadRootFs.js"
import fsApi from "./fs/fs.js"
import AppRuntime from "./41worker/AppRuntime.js"


const sys41 = {
    _boot: new Bootscreen(document.getElementsByClassName("boot")[0])
}
if (process.env.NODE_ENV === "development") {
    window.sys41 = sys41
}

sys41._boot.write({ text: "open99 BETA rewrite booting on " + navigator.userAgent + " at " + new Date() })

//IDB
sys41._boot.write({ text: "Loading IDB..." })
try {
    sys41._db = idb
} catch (e) {
    sys41._boot.write({ text: "IDB failed to load", features: { error: true, blink: true } })
}
sys41._boot.write({ text: "IDB loaded!", features: { success: true } })

//ROOTFS-LOAD
sys41._boot.write({text: "Writing root fs..."})
loadRootFs()
sys41._boot.write({text: "Root filesystem loaded!", features: {success: true}})

//FS
sys41._boot.write({ text: "Loading FileSystem..." })
sys41.fs = fsApi
sys41._boot.write({ text: "Filesystem loaded!", features: { success: true } })

//41WORKER
sys41._boot.write({text: "Loading application runtime..."})
sys41.AppRuntime = AppRuntime
sys41._boot.write({text: "Application runtime loaded!", features: {success: true}})
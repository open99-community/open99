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

await sys41._boot.write({ text: "open99 BETA rewrite booting on " + navigator.userAgent + " at " + new Date() })

//IDB
await sys41._boot.write({ text: "Loading IDB..." })
try {
    sys41._db = await idb
} catch (e) {
    await sys41._boot.write({ text: "IDB failed to load", features: { error: true, blink: true } })
}
await sys41._boot.write({ text: "IDB loaded!", features: { success: true } })

//ROOTFS-LOAD
await sys41._boot.write({text: "Writing root fs..."})
loadRootFs()
await sys41._boot.write({text: "Root filesystem loaded!", features: {success: true}})

//FS
await sys41._boot.write({ text: "Loading FileSystem..." })
sys41.fs = fsApi
await sys41._boot.write({ text: "Filesystem loaded!", features: { success: true } })

//41WORKER
await sys41._boot.write({text: "Loading application runtime..."})
sys41.AppRuntime = AppRuntime
await sys41._boot.write({text: "Application runtime loaded!", features: {success: true}})
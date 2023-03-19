import Bootscreen from "./boot/boot.js"
const sys41 = {
    _boot: new Bootscreen(document.getElementsByClassName("boot")[0])
}
window.sys41 = sys41

sys41._boot.write({ text: "open99 BETA rewrite booting on " + navigator.userAgent + " at " + new Date() })

//IDB
sys41._boot.write({ text: "Loading IDB..." })
const idb = await import("./boot/idb.js")
try {
    sys41._db = await idb()
} catch (e) {
    sys41._boot.write({ text: "IDB failed to load", features: { error: true, blink: true } })
}
sys41._boot.write({ text: "IDB loaded!", features: { success: true } })

//FS
sys41._boot.write({ text: "Loading FileSystem..." })
const fsApi = await import("./fs/fs.js")
sys41.fs = fsApi
sys41._boot.write({ text: "Filesystem loaded!", features: { success: true } })

//41WORKER
sys41._boot.write({text: "Loading application runtime..."})
const AppRuntime = await import("./41worker/AppRuntime.js")
sys41.AppRuntime = AppRuntime
sys41._boot.write({text: "Application runtime loaded!", features: {success: true}})
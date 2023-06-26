import Bootscreen from "./gui/boot.js"
const sys41 = {
    _boot: new Bootscreen(document.getElementsByClassName("boot")[0])
}
if (process.env.NODE_ENV === "development") {
    window.sys41 = sys41
}

await sys41._boot.write({ text: "open99 BETA rewrite booting on " + navigator.userAgent + " at " + new Date() })

//IDB
await sys41._boot.write({ text: "Loading IDB..." })
const idb = await import("./fs/idb.js")
try {
    sys41._db = await idb.default
} catch (e) {
    await sys41._boot.write({ text: "IDB failed to load", features: { error: true, blink: true } })
}
await sys41._boot.write({ text: "IDB loaded!", features: { success: true } })

//ROOTFS-LOAD
await sys41._boot.write({text: "Writing root fs..."})
const loadRootFs = await import("./fs/loadRootFs.js").loadRootFs
loadRootFs()
await sys41._boot.write({text: "Root filesystem loaded!", features: {success: true}})

//FS
await sys41._boot.write({ text: "Loading FileSystem..." })
const fsApi = await import("./fs/fs.js").default
sys41.fs = fsApi
await sys41._boot.write({ text: "Filesystem loaded!", features: { success: true } })

//41WORKER
await sys41._boot.write({text: "Loading application runtime..."})
const AppRuntime = await import("./41worker/AppRuntime.js").default
sys41.AppRuntime = AppRuntime
await sys41._boot.write({text: "Application runtime loaded!", features: {success: true}})
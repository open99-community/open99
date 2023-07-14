import Bootscreen from "./gui/boot.js"
import { db } from "./fs/idb.js"
import { load } from "./fs/loadRootFs.js"
import fsApi from "./fs/fs.js"
import AppRuntime from "./41worker/AppRuntime.js"
import {pointerlock} from "./gui/pointerlock.js"
const sys41 = {}
if (process.env.NODE_ENV === "development") {
    window.sys41 = sys41
}
sys41._boot = new Bootscreen(document.getElementsByClassName("boot")[0])
sys41._db = db
sys41.fs = fsApi
sys41.AppRuntime = AppRuntime

sys41._boot.write("open99 BETA rewrite booting on " + navigator.userAgent + " at " + new Date() + "...")

try {
    await load()
    //throw new Error("test catch of the error!!!")
    sys41._boot.write("Root filesystem loaded", ["success"])
} catch (e) {
    sys41._boot.write("Root filesystem failed to load", ["error"])
    sys41._boot.write(e, ["error", "blink"])
}
const clickListen = sys41._boot.write("Click once anywhere on the screen...", ["blink"])
await pointerlock()
clickListen.update(clickListen.content.text + " done", ["success"])
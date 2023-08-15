import Bootscreen from "./gui/boot.ts"
import { db } from "./fs/idb.js"
import { load } from "./fs/loadRootFs.js"
import fsApi from "./fs/fs.ts"
import AppRuntime from "./41worker/AppRuntime.js"
import {pointerLock} from "./util/pointerLock.ts"
import {components} from "./gui/components/index.js"
import { monitorDevtools } from "./util/noDevtools.js"
monitorDevtools()

const sys41 = {
    _db: db,
    _boot: new Bootscreen(document.getElementsByClassName("boot")[0]),
    fs: fsApi,
    AppRuntime,
    components
}
if (process.env.NODE_ENV === "development") {
    window.sys41 = sys41
}

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
await pointerLock()
clickListen.update(clickListen.content.text + " done", ["success"])
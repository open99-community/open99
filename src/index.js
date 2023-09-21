import Bootscreen from "./startup/gui.ts"
import { database } from "./fs/idb.js"
import { load } from "./startup/loadRootFs.js"
import fsApi from "./fs/fs.ts"
import AppRuntime from "./41worker/AppRuntime.js"
import {components} from "./gui/components/index.js"
import {startup} from "./startup/index.js"

const sys41 = {
    _db: database,
    _boot: new Bootscreen(document.getElementsByClassName("boot")[0]),
    fs: fsApi,
    AppRuntime,
    components
}
if (process.env.NODE_ENV === "development") {
    window.sys41 = sys41
}

await startup()
sys41._boot.write(`🌌 <span class=\"rainbow-text\">Pluto</span> v${SYSVER} booting on ${navigator.userAgent} at ${new Date()}...`)

try {
    await load()
    //throw new Error("test catch of the error!!!")
    sys41._boot.write("Root filesystem loaded", ["success"])
} catch (e) {
    sys41._boot.write("Root filesystem failed to load", ["error"])
    sys41._boot.write(e, ["error", "blink"])
}
import fsApi from "./fs/fs.js"
import idb from "./boot/idb.js"
import Bootscreen from "./boot/boot.js"

const sys41 = {
    _boot: new Bootscreen(document.getElementsByClassName("boot")[0])
}

sys41._boot.write({text: "open99 BETA rewrite booting on " + navigator.userAgent + " at " + new Date()})
sys41._boot.write({text: "Loading IDB..."})
try {
    sys41._db = await idb()
} catch (e) {
    sys41._boot.write({text: "IDB failed to load", features: {error: true, blink: true}})
}
sys41._boot.write({text: "IDB loaded!", features: {success: true}})
sys41._boot.write({text: "Loading FileSystem..."})
sys41.fs = fsApi
sys41._boot.write({text: "Filesystem loaded!", features: {success: true}})
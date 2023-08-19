/**
 * Pluto apis such as sys41.*, __app, worker, etc
 * @param {import("../../types/appInfo.ts").default} appInfo Application metadata. Accessible within runtime
 * @returns {string}
 */
const decl = {
    sys41: "const sys41 = {fs:{}};",
    app(appInfo) {
        return `const __app = ${JSON.stringify(appInfo)};`
    },
    worker: "const worker = {send: async function(op, args) {self.postMessage({op: op, args: args})}};",
}
class ExposedApis {
    constructor() {
        this.exposedapis = ""
    }
    getExposedApis() {
        return this.exposedapis
    }

    /**
     * @param {string} api The name of the api to not expose
     */
    removeApi(api) {
        this.exposedapis += `delete globalThis.${api};`
        return this
    }
}

function applyApis(context) {
    const exposedapis = new ExposedApis
    exposedapis
        .removeApi("BroadcastChannel")
        .removeApi("Cache")
        .removeApi("CacheStorage")
        .removeApi("StorageManager")
        .removeApi("CustomEvent")
        .removeApi("FileReader")
        .removeApi("FileReaderSync")
        .removeApi("FormData")
        .removeApi("ImageData")
        .removeApi("indexedDB")
        .removeApi("NetworkInformation")
        .removeApi("Notification")
        .removeApi("NotificationEvent")
        .removeApi("ServiceWorkerRegistration")
        .removeApi("Worker")
        .removeApi("WorkerNavigator")
    if (context.appInfo.permissions?.network) {
        exposedapis
            .removeApi("fetch")
            .removeApi("WebSocket")
            .removeApi("XMLHttpRequest")
    }
    let spawn_child = "" //context.appInfo.permissions?.spawn_child ? "alert('spawn_child permission granted');" : "alert('Lacking spawn_child permission');"
    return exposedapis.getExposedApis() + decl.app(context.appInfo) + decl.sys41 + spawn_child + decl.worker
}

export {applyApis}
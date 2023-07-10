//we expose web apis by deleting ones we dont want to be accessible with the 41worker runtime
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

export default exposedapis.getExposedApis()
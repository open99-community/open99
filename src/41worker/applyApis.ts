import { App } from '../types/App';

interface Decl {
    app(appInfo: App): string;
    worker: string;
}

/**
 * Pluto apis such as sys41.*, __app, worker, etc
 * @param {App} appInfo Application metadata. Accessible within runtime
 * @returns {string}
 */
const decl: Decl = {
    app(appInfo: App): string {
        return `const __app=${JSON.stringify(appInfo)};`
    },
    worker: `
    function sendMessage(data) {
        // activity ID: 7 char random numbers
        const activityID = Math.random().toString().substring(2, 9)
        return new Promise((resolve, reject) => {
            if (!data) reject("No data provided")
            self.onmessage = event => {
                // 0: data, 1: activityID
                if (event.data[1] === activityID) {
                    resolve("received" + event.data)
                    console.log("[41worker:work] Main thread responded:", event.data)
                } else {
                    self.postMessage("received" + event.data)
                    console.log("[41worker:work] Main thread requested:", event.data)
                }
            }
            self.postMessage([data, activityID])
        });
    }
    `,
};

class ExposedApis {
    exposedapis: string;

    constructor() {
        this.exposedapis = "";
    }

    getExposedApis(): string {
        return this.exposedapis;
    }

    /**
     * @param {string} api The name of the api to not expose
     */
    removeApi(api: string): this {
        this.exposedapis += `delete globalThis.${api};`
        return this;
    }
}

function applyApis(context: { App: App }): string {
    const exposedapis = new ExposedApis();
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
        .removeApi("WorkerNavigator");

    if (!context.App?.permissions?.includes("network")) {
        exposedapis
            .removeApi("fetch")
            .removeApi("WebSocket")
            .removeApi("XMLHttpRequest");
    }

    let spawn_child = "" //context.appInfo.permissions?.spawn_child ? "alert('spawn_child permission granted');" : "alert('Lacking spawn_child permission');"

    return exposedapis.getExposedApis() + decl.app(context.App) + spawn_child + decl.worker;
}

export { applyApis };
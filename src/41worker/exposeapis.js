//we expose web apis by deleting ones we dont want to be accessible with the 41worker runtime

const exposedapis = `
delete globalThis.BroadcastChannel;
//cache
delete globalThis.Cache;
delete globalThis.CacheStorage;
delete globalThis.StorageManager;
//
delete globalThis.CustomEvent;
delete globalThis.FileReader;
delete globalThis.FileReaderSync;
delete globalThis.FormData;
delete globalThis.ImageData;
delete globalThis.IndexedDB;
delete globalThis.NetworkInformation;
delete globalThis.Notification;
delete globalThis.NotificationEvent;
delete globalThis.ServiceWorkerRegistration;
delete globalThis.Worker;
delete globalThis.WorkerNavigator;
//network perm? Yes, you can use the internet. No network perm? Unfortunate!
if(!__app.permissions?.native?.network) {
    delete globalThis.fetch;
    delete globalThis.WebSocket;
    delete globalThis.XMLHttpRequest;
}
`

export default exposedapis
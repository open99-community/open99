import {Pluto} from "@use-pluto/satellite"

//const res = await Pluto._core.sendRequest({op: 10})
//const res2 = await Pluto._core.sendRequest({op: 70})
//console.log(res)
//console.log(res2)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const e = eval

const originalSetTimeout = self.setTimeout;
const originalSetInterval = self.setInterval;
let heartbeatInterval = null;
let lastHeartbeatTime = null;

function startHeartbeat() {
    const HEARTBEAT_INTERVAL = 5000; // 5 seconds
    const HEARTBEAT_CHECK_INTERVAL = 1000; // 1 second

    // Send initial heartbeat
    sendHeartbeat();

    // Set up interval to check if heartbeat should be sent
    this.heartbeatInterval = self.setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - lastHeartbeatTime >= HEARTBEAT_INTERVAL) {
            sendHeartbeat();
        }
    }, HEARTBEAT_CHECK_INTERVAL);
}

function sendHeartbeat() {
    lastHeartbeatTime = Date.now();
    comms.sendStreamEvent(2);
}

function resetHeartbeat() {
    lastHeartbeatTime = Date.now();
}


self.setTimeout = function(handler, timeout, ...args) {
    const wrappedHandler = function(...handlerArgs) {
        resetHeartbeat();
        if (typeof handler === 'function') {
            handler.apply(this, handlerArgs);
        } else {
            e(handler);
        }
    };
    return originalSetTimeout.call(this, wrappedHandler, timeout, ...args);
};

self.setInterval = function(handler, timeout, ...args) {
    const wrappedHandler = function(...handlerArgs) {
        resetHeartbeat();
        if (typeof handler === 'function') {
            handler.apply(this, handlerArgs);
        } else {
            e(handler);
        }
    };
    return originalSetInterval.call(this, wrappedHandler, timeout, ...args);
};


console.log("sleeping for 5 seconds")
await sleep(5000)
console.log("done sleeping")

const comms = Pluto._core.CommsHandler.getInstance();

await comms.call("fs.createFile");

startHeartbeat();
console.log("test")
setInterval(() => {console.log("duhh")}, 1000);
//while (true) {}
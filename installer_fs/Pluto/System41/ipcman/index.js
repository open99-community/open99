import {Pluto} from "@use-pluto/satellite"
const _core = Pluto._core

class IPCManager {
    constructor() {
        this.registrar = new Map();
        this.stream = _core.StreamHandler;
    }

    * Broker() {
        for (let i = 1; ; i++) {
            yield Math.floor(1000 + Math.random() * 9000)
        }
        //use with Broker.next().value
    }

    handleRegister(sourceProcess, targetProcess) {
        const handlerID = this.Broker().next().value
        this.registrar.set(handlerID, targetProcess)
        return [handlerID]
        //return communication handler, and then the source process can use it to communicate with ipc an who can then forward the message to the target process
    }

    removeHandler(handlerID) {
        try {
            this.registrar.delete(handlerID)
            return true;
        } catch {
            return false;
        }
    }
}

const ipc = new IPCManager();
_core.StreamHandler.addListener(33, e => { //33 means a process is requesting to register a handler
    ipc.handleRegister(e.SOURCE_PID, e.TARGET_PID);
})
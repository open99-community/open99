import {_core} from "@use-pluto/satellite"

const registrar = new Map()
const stream = _core.StreamHandler

function* Broker() {
    for (let i = 1; ; i++) {
        yield Math.floor(1000 + Math.random() * 9000)
    }
} //use with Broker.next().value

const handleRegister = (sourceProcess, targetProcess) => {
    const handlerID = Broker.next().value
    registrar.set(handlerID, targetProcess)
    return [handlerID]
    //return communication handler, and then the source process can use it to communicate with ipc man who can then forward the message to the target process
}

const removeHandler = (handlerID) => {
    try {
        registrar.delete(handlerID)
        return true
    } catch {
        return false
    }
}
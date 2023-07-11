import {applyApis} from "./applyApis.js"

/** Class representing 41worker runtime */
class AppRuntime {
    //TODO: look at @typedef
    /**
     * Run the application
     * @param {string} code Code to be executed in 41worker runtime
     //* @param {import("../../types/appInfo.ts").default} context Application metadata. Accessible within runtime
     */
    constructor(code, context) {
        context.AppRuntime = AppRuntime
        this.code = code
        this.context = context
        this.execCode = applyApis(context) + code
        this.blob = new Blob([this.execCode], { type: "application/javascript" })
        this.url = URL.createObjectURL(this.blob)
        this.worker = new Worker(this.url, { type: "classic" })
        this.channel = new MessageChannel()
        //remember, port1 is main thread, port2 is worker
        this.channel.port1.onmessage =
            /**
             * @typedef {import("../../types/messageEvent.ts").default} event
            */
            (event) => {
                const returnValue = this.handleReceivedMessage(event.op, event.args)
                this.worker.postMessage(returnValue, this.channel.port2)
            }
    }
    /**
     * Terminates the worker
     * @returns {this}
     */
    terminate() {
        this.worker.terminate()
        console.log("[41worker] worker terminated.")
        return this
    }
    /**
     * handles the received message
     * @param {string} op Message type to communicate to main thread
     * @param {string} data Arguments for the op
     * @returns {string} Message to communicate to runtime
     */
    handleReceivedMessage(op, data) {
        //here is where we put a super long switch statement to determine what to return
        switch (op) {
            case "fs.createFile":
                console.log("Worker environment tried creating a file:", data)
                break
            case "fs.createDir":
                console.log("[41worker] Worker tried creating a dir:", data)
                break
            default:
                alert("41worker op unknown: " + op)
        }
    }
}

export default AppRuntime
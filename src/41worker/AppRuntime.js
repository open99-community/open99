import exposedapis from "./exposeapis.js"
import sysApis from "./sysApis.js"

/** Class representing 41worker runtime */
class AppRuntime {
    /**
     * Run the application
     * @param {string} code Code to be executed in 41worker runtime
     * @param {{title: string, id: string}} appInfo Application metadata. Accessible within runtime
     */
    constructor(code, appInfo) {
        this.code = code
        this.appInfo = appInfo
        this.execCode = sysApis({ appInfo: appInfo }) + exposedapis + code
        this.blob = new Blob([this.execCode], { type: "application/javascript" })
        this.url = URL.createObjectURL(this.blob)
        this.worker = new Worker(this.url, { type: "classic" })
        this.channel = new MessageChannel()
        //remember, port1 is mainthread, port2 is worker
        this.channel.port1.onmessage =
            /**
             * @param {import("../types/messageEvent.js").default} event
            */
            (event) => {
                const returnValue = this.handleReceivedMessage(event.op, event.args)
                this.worker.postMessage(returnValue, this.channel.port2)
            }
    }
    /**
     * 
     * @param {string} reason 
     * @returns {this}
     */
    terminate(reason) {
        this.worker.terminate()
        console.log("[41worker] worker terminated. Reason:", reason)
        return this
    }
    /**
     * handles the received message
     * @param {string} msg Message to communicate to main thread
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
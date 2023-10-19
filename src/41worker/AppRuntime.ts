import {applyApis} from "./applyApis.js"
import type { App } from '../types/App'
import type { MessageData } from '../types/messageEvent'

/** Class representing 41worker runtime */
export default class AppRuntime {
    code: string;
    context: { App: App, AppRuntime?: typeof AppRuntime };
    execCode: string;
    blob: Blob;
    url: string;
    worker: Worker;
    channel: MessageChannel;

    /**
     * Run the application
     */
    constructor(code: string, context: {App: App, AppRuntime?: typeof AppRuntime}) {
        context.AppRuntime = AppRuntime
        this.code = code
        this.context = context
        this.execCode = applyApis(context) + code
        this.blob = new Blob([this.execCode], { type: "application/javascript" })
        this.url = URL.createObjectURL(this.blob)
        this.worker = new Worker(this.url, { type: "classic" })
        this.channel = new MessageChannel()
        //remember, port1 is main thread, port2 is worker
        this.channel.port1.onmessage = (event: MessageEvent) => {
            const data: MessageData = event.data as MessageData
            const returnValue = this.handleReceivedMessage(data)
            this.worker.postMessage({result: returnValue}, [this.channel.port2])
        }
        this.worker.onerror = e => {
            console.error("[41worker] Worker error:", e)
        }
    }
    /**
     * Terminates the worker
     */
    terminate(): AppRuntime {
        this.worker.terminate()
        console.log("[41worker] worker terminated.")
        return this
    }
    /**
     * handles the received message
     */
    handleReceivedMessage(data: MessageData): any { //this can literally be anything!
        //here is where we put a super long switch statement to determine what to return
        switch (data.op) {
            case "fs.createFile":
                console.log("Worker environment tried creating a file:", data)
                return "HELLO! I AM A FILE!" + data
            case "fs.createDir":
                return "[41worker] Worker tried creating a dir:" + data
            default:
                return "41worker op unknown: " + data.op
        }
    }
}
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
    procID: string;

    /**
     * Run the application
     */
    constructor(code: string, context: {App: App, AppRuntime?: typeof AppRuntime}) {
        this.procID = Math.random().toString().substring(2, 10)
        context.AppRuntime = AppRuntime
        this.code = code
        this.context = context
        this.execCode = applyApis(context) + code
        this.blob = new Blob([this.execCode], { type: "application/javascript" })
        this.url = URL.createObjectURL(this.blob)

        console.log(`[41worker:main] proc-${this.procID} created. URL: ${this.url} Run this.exec() to start the worker.`)
    }
    async exec() {
        this.worker = new Worker(this.url, { type: "classic" })
        this.worker.onerror = e => {
            console.error("[41worker:main] Worker error:", e)
            this.terminate()
        }
        return await this.postMessageToWorker("init")
    }
    /**
     * Terminates the worker
     */
    terminate(): void {
        this.worker.terminate()
        console.log(`[41worker] proc-${this.procID} terminated.`)
    }
    /**
     * handles the received message
     */
    handleReceivedRequest(data: MessageData): any { //this can literally be anything!
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
    handleReceivedResponse(data: MessageData): any {
        return data
    }
    postMessageToWorker(data: any){
        // activity ID: 7 char random numbers
        const activityID = Math.random().toString().substring(2, 9)
        const realData = [data, activityID]
        console.log("[41worker:main] Main thread requested:", realData)
        return new Promise((resolve, reject) => {
            if (!data) reject("No data provided")
            this.worker.onmessage = event => {
                // 0: data, 1: activityID
                if (event.data[1] === activityID) {
                    console.log("[41worker:main] Worker responded:", event.data)
                    resolve(this.handleReceivedResponse(event.data))
                } else {
                    console.log("[41worker:main] Worker requested:", event.data)
                    this.handleReceivedRequest(event.data)
                }
            }
            this.worker.postMessage([data, activityID])
        });
    }
}
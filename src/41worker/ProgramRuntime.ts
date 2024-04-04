import {removeAccessApis} from "./RemoveAccessApis"
import type { App } from '../types/App'
import type { MessageData } from '../types/messageEvent'

/** Class representing 41worker runtime */
export default class ProgramRuntime {
    code: string;
    context: { App: App, AppRuntime?: typeof ProgramRuntime };
    execCode: string;
    blob: Blob;
    url: string;
    worker: Worker | undefined;
    procID: string;

    /**
     * Run the application
     */
    constructor(code: string, context: {App: App, AppRuntime?: typeof ProgramRuntime}) {
        this.procID = Math.random().toString().substring(2, 10)
        context.AppRuntime = ProgramRuntime
        this.code = code
        this.context = context
        this.execCode = removeAccessApis() + code
        this.blob = new Blob([this.execCode], { type: "application/javascript" })
        this.url = URL.createObjectURL(this.blob)

        console.log(`[41worker:main] PID ${this.procID} created. URL: ${this.url} Run this.exec() to start the worker.`)
    }
    async exec() {
        this.worker = new Worker(this.url, { type: "classic" })
        this.worker.onerror = e => {
            console.error("[41worker:main] Worker error:", e)
            this.terminate()
        }
        // This is how the program knows it has entered running scope
        return await this.postMessageToWorker("init")
    }
    /**
     * Terminates the worker
     */
    terminate(): void {
        if (!this.worker) throw new Error("No such worker exists.")
        this.worker.terminate()
        console.log(`[41worker] proc-${this.procID} terminated.`)
        URL.revokeObjectURL(this.url)
    }
    // noinspection JSUnusedGlobalSymbols
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
        if (!this.worker) throw new Error("No such worker exists.")

        // doing worker instead of this.worker because of TS
        const worker = this.worker
        // API callID: 7 char random numbers, collision improbable but possible
        const callID = Math.random().toString().substring(2, 9)
        const realData = [data, callID]
        console.log(`[41worker:main] (${callID}) Sent Request\n`, realData[0])
        return new Promise((resolve, reject) => {
            if (!data) reject("No data provided")
            worker.onmessage = event => {
                // 0: data, 1: callID
                if (event.data[1] === callID) {
                    console.log(`[41worker:main] (${callID}) Received Response\n`, event.data[0])
                    resolve(this.handleReceivedResponse(event.data))
                } else {
                    console.log(`[41worker:main] (${event.data[1]}) Responding to\n`, event.data[0]);
                    worker.postMessage(["received" + event.data[0], event.data[1]])
                }
            }
            worker.postMessage([data, callID])
        });
    }
}
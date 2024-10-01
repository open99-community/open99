import {removeAccessApis} from "./RemoveAccessApis"
import type { MessageData } from '../types/messageEvent'
import {PIDBroker} from "./misc/PIDBroker";
import {Drive} from "../fs/drivers";
import {ArgsAndEnv} from "./misc/ArgsAndEnv";

const broker = PIDBroker()

// noinspection JSUnusedGlobalSymbols
/** Class representing 41worker runtime */
export default class ProgramRuntime {
    path: string;
    execCode: string;
    blob: Blob;
    cmdLine: string[];
    env: { [key: string]: string };
    url: string;
    worker: Worker | undefined;
    procID: string;

    /**
     * Run the application
     */
    // @TODO: provide the path, not the code. also inject the path somewhere into the executable
    constructor(path: string, cmdLine: string, env: { [key: string]: string }) {
        this.procID = broker.next().value
        this.path = path

        this.execCode = "" //for TS
        this.blob = new Blob //for TS
        this.url = "" //for TS

        this.cmdLine = cmdLine?.split(" ") ?? cmdLine
        this.env = env
        console.log(`[41worker:main] PID ${this.procID} created. Run this.exec() to start the worker.`)
    }
    async exec() {

        try {
            const code = await (await Drive.getByDriveLetter("C")?.driverInstance?.read(this.path.slice(3))).text()
            console.log("heres the code!", code)


            this.execCode = removeAccessApis() + ArgsAndEnv(this.cmdLine, this.env) + "(async () => {" + code + "})()"

            console.log("and execCode:", this.execCode)
        } catch (e) {
            //console.error(`[41worker:main] Error reading file: ${e}`)
            //this.terminate() isnt needed since the worker hasnt been created
            throw e
        }

        this.blob = new Blob([this.execCode], { type: "application/javascript" })
        this.url = URL.createObjectURL(this.blob)


        this.worker = new Worker(this.url, { type: "classic" })
        this.worker.onerror = e => {
            console.error("[41worker:main] Worker error:", e)
            this.terminate()
        }
        // This is how the program knows it has entered running scope
        await this.postMessageToWorker("init")
    }
    /**
     * Terminates the worker
     */
    terminate(): void {
        if (!this.worker) throw new Error("No such worker exists.")
        // hey future me: maybe it just hasn't been executed?
        this.worker.terminate()
        console.log(`[41worker] proc-${this.procID} terminated.`)
        URL.revokeObjectURL(this.url)
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * handles the received message
     */
    handleReceivedRequest(data: MessageData): any {
        switch (data.op) {
            case "fs.createFile":
                return "HELLO! I AM A FILE!"
            case "fs.createDir":
                return "HELLO! I AM A DIRECTORY!"
            case 10:
                console.log("Worker wants a new process.")
                return "New process!"
            case 70:
                return this;
            case 12:
                return "IPCv1 message!"
            default:
                return "41worker op unknown or missing: " + data.op
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
                    //console.log(`[41worker:main] (${event.data[1]}) Responding to\n`, event.data[0]);
                    try {
                        worker.postMessage([this.handleReceivedRequest(event.data[0]), event.data[1]])
                    } catch (e) {
                        console.error(`[41worker:main] Error: ${e}`)
                        reject(e)
                    }
                }
            }
            worker.postMessage([data, callID])
        });
    }
}
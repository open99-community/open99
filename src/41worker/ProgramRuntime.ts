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

    private pendingRequests: Map<number, { resolve: (value: any) => void, reject: (reason: any) => void }>;
    private streamEventListeners: Map<string, ((data: any) => void)[]>;

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
        this.env = env;

        this.pendingRequests = new Map();
        this.streamEventListeners = new Map();

        //console.log(`[41worker:main] PID ${this.procID} created. Run this.exec() to start the worker.`)
    }
    async exec() {

        try {
            const file = await (await Drive.getByDriveLetter("C")?.driverInstance?.read(this.path.slice(3)))
            if (!file || file instanceof Error) throw new Error("File not found")
            const code = await file.text()
            //console.log("heres the code!", code)


            this.execCode = removeAccessApis() + ArgsAndEnv(this.cmdLine, this.env) + "(async () => {" + code + "})()"

            console.log("execCode:", this.execCode)
        } catch (e) {
            //console.error(`[41worker:main] Error reading file: ${e}`)
            //this.terminate() isnt needed since the worker hasnt been created
            throw e
        }

        this.blob = new Blob([this.execCode], { type: "application/javascript" })
        this.url = URL.createObjectURL(this.blob)


        this.worker = new Worker(this.url, { type: "classic" })

        this.worker.onmessage = this.handleWorkerMessage.bind(this);

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

    private handleWorkerMessage(event: MessageEvent): void {
        const [data, callID] = event.data;

        if (callID) {
            //request-response call
            const pendingRequest = this.pendingRequests.get(Number(callID));
            if (pendingRequest) {
                // It's a response to a kernel-initiated request
                this.pendingRequests.delete(callID);
                console.log(`[41worker:main] (${callID}) Received Response\n`, data);
                pendingRequest.resolve(this.handleReceivedResponse(data));
            } else {
                // It's a request from the worker
                try {
                    const response = this.handleReceivedRequest(data);
                    this.worker!.postMessage([response, callID]);
                } catch (e) {
                    console.error(`[41worker:main] Error handling request: ${e}`);
                    this.worker!.postMessage([{ error: String(e) }, callID]);
                }
            }
        } else {
            // streamed event
            this.handleStreamEvent(data);
        }
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
            case 10: //wants to spawn new process
                console.log("Worker wants a new process.")
                return "New process!"
            case 70:
                //return this; NEVER DO THIS! WORKER OBJECT CANNOT BE CLONED
                return "uhhh duhh"
            case 12:
                return "IPCv1 message!"
            case 33:
                // @TODO: executable wants to register IPC
                break;
            default:
                return "41worker op unknown or missing: " + data.op
        }
    }
    handleReceivedResponse(data: MessageData): any {
        return data
    }
    postMessageToWorker(data: any){
        if (!this.worker) throw new Error("No such worker exists.") //has it been initiated?

        // API callID: 7 char random numbers, collision improbable but possible
        const callID = Math.random().toString().substring(2, 9)
        const realData = [data, callID]
        console.log(`[41worker:main] (${callID}) Sent Request\n`, realData[0])

        return new Promise((resolve, reject) => {
            if (!data) {
                reject(new Error("No data provided"));
                return;
            }

            this.pendingRequests.set(Number(callID), { resolve, reject });
            this.worker!.postMessage([data, callID]);
        });
    }

    handleStreamEvent(data: any): void {
        if (data && typeof data === "object" && "op" in data) {
            const eventName = data.op;

        } else {
            console.error(`[41worker:main] Received malformed Streamed Event: ${data}`)
        }
    }

    addStreamEventListener(eventName: string, callback: (data: any) => void): void {
        if (!this.streamEventListeners.has(eventName)) {
            this.streamEventListeners.set(eventName, [])
        }
        this.streamEventListeners.get(eventName)!.push(callback)
    }

    removeStreamEventListener(eventName: string, callback: (data: any) => void): void {
        const listeners = this.streamEventListeners.get(eventName);
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }
}
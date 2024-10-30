import {removeAccessApis} from "./RemoveAccessApis"
import type {MessageData} from '../types/messageEvent'
import {PIDBroker} from "./misc/PIDBroker";
import {Drive} from "../fs/drivers";
import {ArgsAndEnv} from "./misc/ArgsAndEnv";
import {indicateExit} from "./misc/indicateExit";

const broker = PIDBroker()

// noinspection JSUnusedGlobalSymbols
/** Class representing 41worker runtime */
export default class ProgramRuntime {
    path: string;
    execCode: string;
    blob: Blob | undefined;
    cmdLine: string[];
    env: { [key: string]: string };
    url: string;
    worker: Worker | undefined;
    procID: string;
    public state: string;

    private pendingRequests: Map<number, { resolve: (value: any) => void, reject: (reason: any) => void }>;
    private streamEventListeners: Map<string | number, ((data: any) => void)[]>;

    // @TODO: provide the path, not the code. also inject the path somewhere into the executable
    constructor(path: string, cmdLine: string, env: { [key: string]: string }) {
        this.procID = broker.next().value
        this.path = path

        this.execCode = ""
        this.url = ""
        this.state = "uninitiated"

        this.cmdLine = cmdLine?.split(" ") ?? cmdLine
        this.env = env;

        this.pendingRequests = new Map();
        this.streamEventListeners = new Map();

        //console.log(`[41worker:main] PID ${this.procID} created. Run this.exec() to start the worker.`)
    }

    async exec() {
        this.state = "running"

        try {
            const file = await (await Drive.getByDriveLetter("C")?.driverInstance?.read(this.path.slice(3)))
            if (!file || file! instanceof Error) throw new Error("File not found")
            let code = await file.text()

            code = code.endsWith(";") ? code : code + ";"

            //console.log("here's the code!", code)


            this.execCode =
                removeAccessApis() +
                ArgsAndEnv(this.cmdLine, this.env) +
                "(async () => {" +
                code +
                indicateExit() +
                "})();"

            console.log("execCode:", this.execCode)
        } catch (e) {
            //console.error(`[41worker:main] Error reading file: ${e}`)
            //this.terminate() isn't needed since the worker hasn't been created
            throw e
        }

        this.blob = new Blob([this.execCode], {type: "application/javascript"})
        this.url = URL.createObjectURL(this.blob)


        this.worker = new Worker(this.url, {type: "classic"})

        this.worker.onmessage = this.handleWorkerMessage.bind(this);

        // This is how the program knows it has entered running scope
        this.postStreamToWorker("init")
    }

    terminate(): void {
        if (!this.worker || this.state !== "running") throw new Error("Worker not running")
        // hey future me: maybe it just hasn't been executed?
        this.state = "terminated"
        this.worker.terminate()
        console.log(`[41worker] proc-${this.procID} terminated.`)
        URL.revokeObjectURL(this.url)
    }

    private handleWorkerMessage(event: MessageEvent): void {
        const [data, callID] = event.data;

        if (callID) {
            //request-response call
            //console.log("CALLID", callID)
            const pendingRequest = this.pendingRequests.get(Number(callID));
            if (pendingRequest) {
                // It's a response to a kernel-initiated request
                this.pendingRequests.delete(callID);
                console.log(`[41worker:main] (${callID}) Received Response\n`, data);
                pendingRequest.resolve(this.handleReceivedResponse(data));
            } else {
                // It's a request from the worker
                const response = this.handleReceivedRequest(data);
                this.worker!.postMessage([response, callID]);
            }
        } else {
            // streamed event
            //console.log("STREAMED EVENT RECEIVED", data)
            this.handleStreamEvent(data);
        }
    }

    // Call-based
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
            case 20:
                return "process exited gracefully"
            case 21:
                return "process errored out"
            case 33:
                // @TODO: executable wants to register IPC
                break;
            default:
                return {error: "Unknown operation"}
        }
    }

    handleReceivedResponse(data: MessageData): any {
        return data
    }

    postMessageToWorker(data: any): Promise<any> {
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

            this.pendingRequests.set(Number(callID), {resolve, reject});
            this.worker!.postMessage([data, callID]);
        });
    }

    postStreamToWorker(data: any): void {
        this.worker!.postMessage([data])
    }

    handleStreamEvent(data: any): void {
        if (data) {
            let eventName = data.op; //@TODO: data validators (testing ig)
            if (!data.op) {
                eventName = data
            }

            this.streamEventListeners.get(eventName)?.forEach(func => {
                func(data)
            })

            switch (eventName) {
                case 20:
                    this.terminate()
                    break;
                case 2:
                    console.log("received heartbeat")
                    break;
            }

        } else {
            console.error(`[41worker:main] Received malformed Streamed Event: ${data}`)
        }
    }

    addStreamEventListener(eventName: string | number, callback: (data: any) => void): void {
        if (!this.streamEventListeners.has(eventName)) {
            this.streamEventListeners.set(eventName, [])
        }
        this.streamEventListeners.get(eventName)!.push(callback)
    }

    removeStreamEventListener(eventName: string | number, callback: (data: any) => void): void {
        const listeners = this.streamEventListeners.get(eventName);
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }
}
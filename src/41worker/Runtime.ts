import type {MessageData} from '../types/messageEvent'
import {PIDBroker} from "./misc/PIDBroker";

const broker = PIDBroker()

// noinspection JSUnusedGlobalSymbols
/** Class representing generic runtime */
export class Runtime {
    path: string;
    execCode: string;
    blob: Blob | undefined;
    cmdLine: string[];
    env: { [key: string]: string };
    url: string;
    worker: Worker | undefined;
    procID: string;
    public state: string;
    public UNSAFE_NO_FULL_TERMINATE: boolean = false;

    streamEventListeners: Map<string | number, ((data: any) => void)[]>;

    constructor(path: string, cmdLine: string, env: { [key: string]: string }, flags?: { [key: string]: boolean }) {
        this.procID = broker.next().value
        this.path = path

        this.execCode = ""
        this.url = ""
        this.state = "uninitiated"

        this.cmdLine = cmdLine?.split(" ") ?? cmdLine
        this.env = env;

        this.streamEventListeners = new Map();
        this.UNSAFE_NO_FULL_TERMINATE = flags?.UNSAFE_NO_FULL_TERMINATE ?? false
        //console.log(`[41worker:main] PID ${this.procID} created. Run this.exec() to start the worker.`)
    }

    async exec() {

    }

    terminate(): void {
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

    postMessage(data: any): Promise<any> {
        return Promise.resolve("unimplemented")
    }

    postStream(data: any): void {
    }

    handleStreamEvent(data: any): void {

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
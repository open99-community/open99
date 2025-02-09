import {removeAccessApis} from "./RemoveAccessApis"
import {PIDBroker} from "./misc/PIDBroker";
import {Drive} from "../fs";
import {ArgsAndEnv} from "./misc/ArgsAndEnv";
import {indicateExit} from "./misc/indicateExit";
import {patchTimerFunctions} from "./misc/patchTimers";
import {Runtime} from "./Runtime"
import { handler } from "../util/URLHandler";

export default class ProgramRuntime extends Runtime {
    public UNSAFE_NO_FULL_TERMINATE: boolean = false;

    pendingRequests: Map<number, { resolve: (value: any) => void, reject: (reason: any) => void }>;
    streamEventListeners: Map<string | number, ((data: any) => void)[]>;

    constructor(path: string, cmdLine: string, env: { [key: string]: string }, flags?: { [key: string]: boolean }) {
        super(path, cmdLine, env, flags)
        this.pendingRequests = new Map();
        this.streamEventListeners = new Map();
        this.UNSAFE_NO_FULL_TERMINATE = flags?.UNSAFE_NO_FULL_TERMINATE ?? false
    }

    async exec() {
        this.state = "running"

        try {
            const file = await Drive.getByDriveLetter("C")?.driverInstance?.read(this.path.slice(3))
            if (!file || file! instanceof Error) throw new Error("File not found")
            let code = await file.text()

            code = code.endsWith(";") ? code : code + ";"

            //console.log("here's the code!", code)

            this.execCode =
                removeAccessApis() +
                patchTimerFunctions() +
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

        const {url, blob} = handler.createBlobUrl(this.execCode, {type: "application/javascript"})
        this.url = url;
        this.blob = blob;


        this.worker = new Worker(this.url, {type: "classic"})

        this.worker.onmessage = this.handleMessage.bind(this);

        // This is how the program knows it has entered running scope
        this.postStream({"op": "init"})
    }

    terminate(): void {
        if (!this.worker || this.state !== "running") throw new Error("Worker not running")
        // hey future me: maybe it just hasn't been executed?
        this.state = "terminated"
        this.worker.terminate()
        if (process.env.NODE_ENV !== "development"|| (process.env.NODE_ENV === "development" && !this.UNSAFE_NO_FULL_TERMINATE)) {
            console.log(`[41worker] proc-${this.procID} terminated.`)
            handler.revokeBlobUrl(this.url)
        } else {
            console.log(`[41worker] proc-${this.procID} terminated.`)
            console.warn("Full termination disabled. URL not revoked.")
        }
    }

    private handleMessage(event: MessageEvent): void {
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

    postMessage(data: any): Promise<any> {
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

    postStream(data: any): void {
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
}
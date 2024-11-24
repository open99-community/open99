import {Runtime} from "../41worker/Runtime"
import {Drive} from "../fs/drivers";
import { MessageData } from "../types/messageEvent";

interface WasmExports {
    memory: WebAssembly.Memory;
    [key: string]: any;
}

export default class AsmRuntime extends Runtime {
    wasmBytes: Uint8Array | undefined;
    private wasmInstance: WebAssembly.Instance | undefined;
    private exports: WasmExports | undefined;
    private readonly importObject: WebAssembly.Imports;
    pendingRequests: Map<number, { resolve: (value: any) => void, reject: (reason: any) => void }> = new Map;
    streamEventListeners: Map<string | number, ((data: any) => void)[]> = new Map();

    constructor(path: string, cmdLine: string, env: { [key: string]: string }, flags?: { [key: string]: boolean }) {
        super(path, cmdLine, env, flags);

        this.importObject = {
            env: {
                memory: new WebAssembly.Memory({ initial: 256 }), // 16MB initial memory
                // System calls that the WASM module can use
                pluto_fs_create_file: (pathPtr: number, pathLen: number) => {
                    const path = this.readWasmString(pathPtr, pathLen);
                    return this.handleSysCall("fs.createFile", { path });
                },
                pluto_fs_create_dir: (pathPtr: number, pathLen: number) => {
                    const path = this.readWasmString(pathPtr, pathLen);
                    return this.handleSysCall("fs.createDir", { path });
                },
                pluto_render_element: (elementPtr: number, elementLen: number) => {
                    const element = this.readWasmString(elementPtr, elementLen);
                    return this.handleSysCall("render.element", { element });
                },
                // Add more syscalls as needed
            },
            // Additional import objects can be added here
        };

    }

    public async exec(): Promise<void> {
        this.state = "running";
        try {
            const file = await Drive.getByDriveLetter("C")?.driverInstance?.read(this.path.slice(3));
            if (!file || file instanceof Error) throw new Error("File not found");
            this.wasmBytes = new Uint8Array(await file.arrayBuffer());

            const module = await WebAssembly.compile(this.wasmBytes);
            this.wasmInstance = await WebAssembly.instantiate(module, this.importObject);
            this.exports = this.wasmInstance?.exports as WasmExports;
        } catch (e) {
            throw e;
        }
    }

    terminate(): void {
        if (this.state !== "running") throw new Error("Runtime not running");

        this.state = "terminated";

        // Clean up WASM resources
        this.exports = undefined;
        this.wasmInstance = undefined;
        this.wasmBytes = undefined;

        console.log(`[AssemblyRuntime] proc-${this.procID} terminated.`);
    }

    postMessage(data: any): Promise<any> {
        if (this.state !== "running") throw new Error("Runtime not running");

        const callID = Math.random().toString().substring(2, 9);
        console.log(`[AssemblyRuntime] (${callID}) Sent Request\n`, data);

        return new Promise((resolve, reject) => {
            if (!data) {
                reject(new Error("No data provided"));
                return;
            }

            this.pendingRequests.set(Number(callID), { resolve, reject });
            const response = this.handleReceivedRequest({ op: data.op, args: data.data });

            const pendingRequest = this.pendingRequests.get(Number(callID));
            if (pendingRequest) {
                this.pendingRequests.delete(Number(callID));
                pendingRequest.resolve(response);
            }
        });
    }

    postStream(data: any): void {
        if (this.state !== "running") throw new Error("Runtime not running");

        console.log(`[AssemblyRuntime] Streamed Event\n`, data);
        this.handleStreamEvent(data);
    }

    handleStreamEvent(data: any): void {
        if (data) {
            let eventName = data.op;
            if (!data.op) {
                eventName = data;
            }

            this.streamEventListeners.get(eventName)?.forEach(func => {
                func(data);
            });

            switch (eventName) {
                case 20:
                    this.terminate();
                    break;
                case 2:
                    console.log("received heartbeat");
                    break;
            }
        } else {
            console.error(`[AssemblyRuntime] Received malformed Streamed Event: ${data}`);
        }
    }

    private readWasmString(ptr: number, len: number): string {
        if (!this.exports) throw new Error("WASM instance not initialized");
        const memory = new Uint8Array(this.exports.memory.buffer);
        const stringBytes = memory.slice(ptr, ptr + len);
        return new TextDecoder().decode(stringBytes);
    }

    private async handleSysCall(operation: string, data: any): Promise<any> {
        const callID = Math.random().toString().substring(2, 9);

        return new Promise((resolve, reject) => {
            this.pendingRequests.set(Number(callID), { resolve, reject });

            // Process the system call
            const response = this.handleReceivedRequest({
                op: operation,
                args: data
            });

            // Resolve the pending request
            const pendingRequest = this.pendingRequests.get(Number(callID));
            if (pendingRequest) {
                this.pendingRequests.delete(Number(callID));
                pendingRequest.resolve(response);
            } else {
                // @TODO program just initiated request. respond here
            }
        });
    }
}
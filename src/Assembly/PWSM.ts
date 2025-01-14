import AsmRuntime from "./AsmRuntime";
import { Drive } from "../fs";
import { handler } from "../util/URLHandler";
import { WasmExports } from "./AsmRuntime";

export default class PWSM extends AsmRuntime {
    constructor(path: string, cmdLine: string, env: { [key: string]: string }, flags?: { [key: string]: boolean }) {
        super(path, cmdLine, env, flags);
    }

    async exec() {
        const fileNoDrive = this.path.slice(3);
        const file = await Drive.getByDriveLetter("C")?.driverInstance?.read(fileNoDrive);
        const bindingsFile = fileNoDrive.replace(/\.wasm$/, ".js");
        const bindings = await Drive.getByDriveLetter("C")?.driverInstance?.read(bindingsFile);

        // Error handling
        if (!file || file! instanceof Error) throw new Error("File not found");
        if (!bindings || bindings! instanceof Error) throw new Error("Host bindings not found");

        this.state = "running";
        try {
            this.wasmBytes = new Uint8Array(await file.arrayBuffer());

            const {url} = handler.createBlobUrl(bindings, { type: "application/javascript" });
            this.url = url;
            const {instantiate} = await import(url);

            const instance = await instantiate(this.wasmBytes)
            this.wasmInstance = instance;
            this.exports = instance.exports as WasmExports;
            
            const run = this.exports!._start as Function;
            console.log(run());
        } catch (e) {
            console.error(`[AssemblyRuntime] Error running WASM module: ${e}`);
            this.terminate();
            throw e
        }
    }

    terminate(): void {
        super.terminate();
        handler.revokeBlobUrl(this.url);
    }
}
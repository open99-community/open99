import AsmRuntime from "./AsmRuntime";
import { Drive } from "../fs/drivers";
import { handler } from "../util/URLHandler";

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

        this.wasmBytes = new Uint8Array(await bindings.arrayBuffer());
        const {url} = handler.createBlobUrl(this.wasmBytes, { type: "application/javascript" });
        this.url = url;
        const {instantiate} = await import(url);
        console.log(await instantiate(this.wasmBytes))
    }

    async terminate(): Promise<void> {
        await super.terminate();
        handler.revokeBlobUrl(this.url);
    }
}
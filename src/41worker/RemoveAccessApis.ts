import { WebAPIBlacklist } from "./misc/WebAPIBlacklist";

const injectDebugScript: string = `` // for example, you can put Satellite lib here

export class ExposedApis {
    exposedapis: string;

    constructor() {
        this.exposedapis = "";
    }

    getExposedApis(): string {
        return this.exposedapis;
    }

    removeApi(api: string): this {
        this.exposedapis += `delete globalThis.${api};`
        return this;
    }
}

export function removeAccessApis(): string {
    const exposedapis = new ExposedApis();
    for (const api in WebAPIBlacklist) {
        exposedapis.removeApi(api);
    }
    return exposedapis.getExposedApis() + injectDebugScript;
}
// noinspection JSUnusedGlobalSymbols

import * as jszip from "jszip"

declare global {
    interface Window {
        // THE FOLLOWING ARE AVAILABLE IN THE MAIN THREAD
        PlatformUtility: any,
        JSZip: jszip,
    }

    // this is a little browser hack to make the NODE_ENV variable available
    // @ts-ignore
    const process: {
        env: {
            NODE_ENV: string,
            PATH: string,
        },
    }

    /**
     * Full version string of the Pluto kernel
     */
    const $SYSVER: string
    /**
     * Author of the Pluto kernel. Can be set in package.json
     */
    const $SYSAUT: string
}
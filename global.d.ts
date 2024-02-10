import type { tauri } from "@tauri-apps/api"
import * as jszip from "jszip"

declare global {
    interface Window {
        // THE FOLLOWING ARE AVAILABLE IN THE MAIN THREAD

        __TAURI__: typeof tauri | undefined,
        JSZip: jszip,
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
import type { tauri } from "@tauri-apps/api"
import * as jszip from "jszip"

declare global {
    interface Window {
        // THE FOLLOWING ARE AVAILABLE IN THE MAIN THREAD

        __TAURI__: typeof tauri | undefined,
        JSZip: jszip,
        // THE FOLLOWING ARE AVAILABLE IN WORKERS

        sys41: {fs:{}, balloon: (text:string) => void}, //@TODO actually narrow this down
        worker: {send: (op: string, args: any) => Promise<any>}
    }
    const $SYSVER: string
}
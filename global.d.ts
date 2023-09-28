import type { tauri } from "@tauri-apps/api"
import * as jszip from "jszip"

declare global {
    interface Window {
        __TAURI__: typeof tauri | undefined,
        JSZip: jszip,
        sys41: undefined | object //@TODO actually narrow this down
    }
    const SYSVER: string
}
import type { tauri } from "@tauri-apps/api"
import * as jszip from "jszip"

declare global {
    interface Window {
        __TAURI__: typeof tauri,
        JSZip: jszip
    }
}
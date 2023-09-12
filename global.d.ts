import type { tauri } from "@tauri-apps/api"

declare global {
    interface Window {
        __TAURI__: typeof tauri
    }
}
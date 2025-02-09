import { background } from "../background";
import { fn as welcome } from "./tasks/welcome";
import { fn as load } from "../installer"
import {Bootscreen} from "../gui";

export async function boot() {
    let backgroundError: Error | undefined
    try {
        background()
    } catch(e) {
        backgroundError = (e as Error)
    }
    const bootscreen = new Bootscreen(document.getElementsByClassName("boot")[0] as HTMLElement)
    if (process.env.NODE_ENV === "development") {
        window.PlatformUtility._boot = bootscreen
    }
    if (backgroundError) {
        bootscreen.write("An error occurred while running background tasks", ["error"])
        bootscreen.write(backgroundError.message, ["error", "blink"])
    }
    const write = (text: string, features?: string[]) => bootscreen.write(text, features)
    await welcome({ write })
    await load({ write })
}
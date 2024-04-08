import { background } from "../background";
import { fn as welcome } from "./tasks/welcome";
import { fn as load } from "../installer"
import {Bootscreen} from "../gui";

export async function boot() {
    background() //background doesn't need any write method, etc.
    const bootscreen = new Bootscreen(document.getElementsByClassName("boot")[0] as HTMLElement)
    if (process.env.NODE_ENV === "development") {
        window.PlatformUtility._boot = bootscreen
    }
    const write = (text: string, features?: string[]) => bootscreen.write(text, features)
    await welcome({ write })
    await load({ write })
}
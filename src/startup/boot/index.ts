import { background } from "../background";
import { fn as welcome } from "./tasks/welcome";
import { load } from "../loadInstaller"
import {Bootscreen} from "../gui";

const bootElement = document.createElement("div")
bootElement.classList.add("boot")
document.body.appendChild(bootElement)

export async function boot() {
    const bootscreen = new Bootscreen(bootElement)
    const write = (text: string, features?: string[]) => bootscreen.write(text, features)
    await welcome({ write })
    await background()
    try {
        await load()
        write("Root filesystem loaded", ["success"])
    } catch (e) {
        write("Root filesystem failed to load", ["error"])
        write(e, ["error", "blink"])
        console.error(e)
    }
}
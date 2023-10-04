import { background } from "../background";
import { fn as welcome } from "./tasks/welcome";
import { fn as load } from "../installer"
import {Bootscreen} from "../gui";

export async function boot() {
    await background() //background doesn't need any write method, etc
    const bootscreen = new Bootscreen(document.getElementsByClassName("boot")[0] as HTMLElement)
    const write = (text: string, features?: string[]) => bootscreen.write(text, features)
    await welcome({ write })
    await load({ write })
}
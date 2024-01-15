import devWatcher from "./devWatcher.ts"
import {monitorDevtools} from "./noDevtools.js"
import {noPiracy} from "./noPiracy.ts"
import {fn as setGlobals} from "./setGlobals"
import {fn as createScreen} from "./createScreen.ts"

export async function background() {
    const order = [
        noPiracy,
        monitorDevtools,
        devWatcher,
        createScreen,
        setGlobals
    ]

    for (const fn of order) {
        await fn()
    }
    return window.sys41
}
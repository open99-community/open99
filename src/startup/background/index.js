import devWatcher from "./devWatcher.ts"
import {monitorDevtools} from "./noDevtools.js"
import {noPiracy} from "./noPiracy.ts"
import {fn as createScreen} from "./createScreen.ts"

export async function background() {
    const order = [
        noPiracy,
        monitorDevtools,
        devWatcher,
        createScreen
    ]

    for (const fn of order) {
        await fn()
    }
}
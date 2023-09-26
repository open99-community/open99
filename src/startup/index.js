import devWatcher from "./background/devWatcher.ts"
import {monitorDevtools} from "./background/noDevtools.js"
import {noPiracy} from "./background/noPiracy.ts"

export async function startup() {
    const order = [
        noPiracy,
        monitorDevtools,
        devWatcher,
    ]

    for (const fn of order) {
        await fn()
    }
}
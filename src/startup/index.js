import devWatcher from "./devWatcher.ts"
import {monitorDevtools} from "./noDevtools.js"
import {noPiracy} from "./noPiracy.ts"

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
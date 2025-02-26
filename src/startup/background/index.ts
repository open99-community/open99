import devWatcher from "./devWatcher"
import {monitorDevtools} from "./noDevtools"
import {noPiracy} from "./noPiracy"
import {fn as setGlobals} from "./setGlobals"
import {fn as createScreen} from "./createScreen"

export function background() {
    const order = [
        noPiracy,
        monitorDevtools,
        devWatcher,
        createScreen,
        setGlobals
    ]

    for (const fn of order) {
        fn()
    }
}
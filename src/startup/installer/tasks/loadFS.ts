import { load } from "./loadInstaller.js"
import type { BootEntryWriteMethod } from "../../gui.ts"

export async function fn({write}: { write: BootEntryWriteMethod}) {
    write("Unpacking installerFS into MEM")
    try {
        await load()
    } catch (e) {
        write("[FATAL]: Root filesystem failed to load", ["error"])
        write(e, ["error", "blink"])
        console.error(e)
        return
    }
    write("InstallerFS unpacked successfully", ["success"])
}
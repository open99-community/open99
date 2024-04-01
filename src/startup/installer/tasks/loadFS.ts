import { load } from "./loadInstaller.js"
import { Drive } from "../../../fs/drivers";
import type { BootEntryWriteMethod } from "../../gui.ts"

export async function fn({write}: { write: BootEntryWriteMethod}) {
    const t = write("Initiating and mounting new storage driver")
    const ramDrive = new Drive("RAM", "C")
    await ramDrive.mount()
    t.update("Storage driver mounted successfully", ["success"])
    write("Unpacking installerFS into RAM")
    try {
        await load()
    } catch (e) {
        write("[FATAL]: Root filesystem failed to load", ["error"])
        // @ts-ignore // the error can be written to output
        write(e, ["error", "blink"])
        console.error(e)
        return
    }
    write("InstallerFS unpacked successfully", ["success"])
}
import { load } from "./loadInstaller.js"
import { Drive } from "../../../fs/index.js";
import type { BootEntryWriteMethod } from "../../gui.ts"

export async function fn({write}: { write: BootEntryWriteMethod}) {
    const t = write("Initiating and mounting new storage driver")

    const driverType = (process.env.DEV_INSTALLER_PERSISTENT == "true" && process.env.NODE_ENV == "development") ? "IDB" : "RAM";
    if (driverType == "IDB") {
        console.warn("Using IDB driver for installerFS. This will be reverted to RAM driver in production");
    }
    let ramDrive: Drive | undefined
    try {
        ramDrive = new Drive(driverType);
        ramDrive.assignDriveLetter("C");
        await ramDrive.mount();
    } catch (e) {
        t.update("[FATAL] Failed to initiate storage driver: " + e, ["error", "blink"])
        console.error(e)
        return
    }
    t.update("Storage driver mounted successfully", ["success"])
    write("Unpacking installerFS into " + driverType + " drive")
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
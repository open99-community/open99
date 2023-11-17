import {rimraf} from "rimraf"
import * as fs from "fs/promises"

// BEFORE BUILD
export async function buil1({session}) {
    const msg = session.addItem("Cleaning up...")
    await rimraf("./dist")
    //these two are probably unnecessary but who cares
    await rimraf("./target_fs_BUILD")
    await rimraf("./installer_fs_BUILD")
    await fs.mkdir("./dist")

    msg.addItem("Cleaned up", "success")
}

// AFTER BUILD
export async function buil2({session}) {
    const msg = session.addItem("Cleaning up...")
    await rimraf("./target_fs_BUILD")
    await rimraf("./installer_fs_BUILD")

    msg.addItem("Cleaned up", "success")
}
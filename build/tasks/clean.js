import {rimraf} from "rimraf"
import * as fs from "fs/promises"

export async function build({session}) {
    const msg = session.addItem("Cleaning up...")
    await rimraf("./dist")
    //these two are probably unnecessary but who cares
    await rimraf("./target_fs_BUILD")
    await rimraf("./installer_fs_BUILD")
    await fs.mkdir("./dist")

    msg.addItem("Cleaned up", "success")
}
import {rimraf} from "rimraf"
import * as fs from "fs/promises"
import {handle} from "../meta/versionhandler.js";

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

    // Miscellanious things- Tauri needs a semver string, so we limit it to major.minor.build
    // We put this in the version property of src-tauri/version.json

    const version = await handle()
    const versionFile = JSON.parse(await fs.readFile("./src-tauri/version.json", "utf-8"))
    versionFile.version = version.split(/\.(?=[^\d])/)[0] //limit to major.minor.build
    await fs.writeFile("./src-tauri/version.json", JSON.stringify(versionFile))

    msg.addItem("Cleaned up", "success")
}
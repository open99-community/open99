import { buildInstallerFs } from "../meta/fsbuild.js"
import zippy from "file-zippy"
import {sleep} from "../meta/sleep.js";

export async function build({session}) {
    const msg = session.addItem("Installer fs")
    const buildStatus = msg.addItem("Building", "success")
    await buildInstallerFs(msg)
    zippy("installer_fs_BUILD/", "./dist/assets/installer.zip")
    msg.addItem("Packed", "success")
}
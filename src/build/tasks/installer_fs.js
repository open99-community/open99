import { buildInstallerFs } from "../meta/fsbuild.js"
import zippy from "file-zippy"

export async function build({session}) {
    const msg = session.addItem("Installer fs")
    await buildInstallerFs(msg)
    zippy("installer_fs_BUILD/", "./dist/assets/installer.zip")
    msg.addItem("Packed", "success")
}
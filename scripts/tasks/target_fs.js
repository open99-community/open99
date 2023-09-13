import { buildInstallerFs } from "../fsbuild.js"
import zippy from "file-zippy"

export async function build(session) {
    const msg = session.addItem("Installer fs", "🛠")
    const buildingMsg = msg.addItem("Building", "🛠️")
    await buildInstallerFs()
    buildingMsg.addItem("Built", "✅")
    const packingMsg = msg.addItem("Packing", "📦")
    zippy("target_fs_BUILD/", "./public/assets/rootfs.zip")
    packingMsg.addItem("Packed", "✅")
}
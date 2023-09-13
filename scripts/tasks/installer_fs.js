import { buildTargetFs } from "../fsbuild.js"
import zippy from "file-zippy"

export async function build(session) {
    const msg = session.addItem("Target fs", "🛠")
    const buildingMsg = msg.addItem("Building", "🛠️")
    await buildTargetFs()
    buildingMsg.addItem("Built", "✅")
    const packingMsg = msg.addItem("Packing", "📦")
    zippy("installer_fs_BUILD/", "./public/assets/rootfs.zip")
    packingMsg.addItem("Packed", "✅")
}
import { buildTargetFs } from "../meta/fsbuild.js"
import zippy from "file-zippy"

export async function build(session) {
    const msg = session.addItem("Target fs", "🛠")
    const buildingMsg = msg.addItem("Building", "🛠️")
    await buildTargetFs()
    buildingMsg.addItem("Built", "✅")
    const packingMsg = msg.addItem("Packing", "📦")
    zippy("installer_fs_BUILD/", "./dist/assets/rootfs.zip")
    packingMsg.addItem("Packed", "✅")
}
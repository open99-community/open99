import { buildTargetFs } from "../meta/fsbuild.js"
import zippy from "file-zippy"

export async function build({session}) {
    const msg = session.addItem("Target fs")
    await buildTargetFs(msg)
    zippy("target_fs_BUILD/", "./dist/assets/rootfs.zip")
    msg.addItem("Packed", "success")
}
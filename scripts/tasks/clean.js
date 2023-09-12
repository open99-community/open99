import { rimraf } from "rimraf"

export async function build(session) {
    const msg = session.addItem("Cleaning up previous build...", "🧹")
    await rimraf("../dist")
    await rimraf("../target_fs_BUILD")
    await rimraf("../installer_fs_BUILD")
    msg.addItem("Cleaned up!", "✅")
}
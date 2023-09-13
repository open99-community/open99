import { readdir, mkdir, copyFile } from "fs/promises"
import { join, extname } from "path"
import esbuild from "esbuild"

async function recursiveCopy(sourceDir, targetDir) {
    const dirents = await readdir(sourceDir, { withFileTypes: true })

    for (const dirent of dirents) {
        let sourcePath = join(sourceDir, dirent.name)
        let targetPath

        if (dirent.isDirectory()) {
            if (dirent.name.startsWith("DIR_")) {
                targetPath = join(targetDir, dirent.name.replace(/^DIR_/, ""))
                await mkdir(targetPath, { recursive: true })
                await recursiveCopy(sourcePath, targetPath)
            } else {
                let bundlePath = join(targetDir, `${dirent.name}.js`)
                await handleDirectory(sourcePath, bundlePath)
            }
        } else {
            targetPath = join(targetDir, dirent.name)
            await handleFile(sourcePath, targetPath)
        }
    }
}

async function handleDirectory(sourcePath, bundlePath) {
    const files = await readdir(sourcePath)
    const indexExists = files.includes("index.js")
    if (!indexExists) {
        return
    }
    await esbuild.build({
        entryPoints: [join(sourcePath, "index.js")],
        outfile: bundlePath,
        bundle: true,
        minify: true,
        format: "esm",
    })
}

async function handleFile(sourcePath, targetPath) {
    if (extname(sourcePath) === ".js") {
        return
    }
    await copyFile(sourcePath, targetPath)
}

try {
    await mkdir("./target_fs_BUILD")
    await mkdir("./target_fs_BUILD")
} catch {
    // ignore
}

export async function buildTargetFs() {
    await recursiveCopy("./target_fs/Pluto/System41", "./target_fs_BUILD/Pluto/System41")
}
export async function buildInstallerFs() {
    await recursiveCopy("./target_fs/Pluto/System41", "./installer_fs_BUILD/Pluto/System41")
}
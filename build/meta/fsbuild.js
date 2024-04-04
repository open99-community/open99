import { readdir, mkdir, copyFile } from "fs/promises"
import { join, extname } from "path"
import { exec } from "child_process"

async function recursiveCopy(sourceDir, targetDir, session) {
    const dirents = await readdir(sourceDir, { withFileTypes: true })

    for (const dirent of dirents) {
        let sourcePath = join(sourceDir, dirent.name)
        let targetPath

        if (dirent.isDirectory()) {
            if (dirent.name.startsWith("DIR_")) { // if it's a directory that shouldn't be built into an executable
                targetPath = join(targetDir, dirent.name.replace(/^DIR_/, ""))
                await mkdir(targetPath, { recursive: true })
                await recursiveCopy(sourcePath, targetPath)
            } else {
                let bundlePath = join(targetDir, `${dirent.name}.js`)
                await handleDirectory(sourcePath, bundlePath, session)
            }
        } else {
            targetPath = join(targetDir, dirent.name)
            await handleFile(sourcePath, targetPath)
        }
    }
}

async function handleDirectory(sourcePath, bundlePath, session) {
    const files = await readdir(sourcePath)

    // run the directory's preferred build script (in build/index.js)

    const directorySeparator = process.platform === "win32" ? "\\" : "/"
    const sourcePathSplit = sourcePath.split(directorySeparator)
    const sourcePathLast = sourcePathSplit[sourcePathSplit.length - 1]
    if (!files.includes("build")) {
        session.addItem(`Skipping '${sourcePathLast}' executable because it has no build script`, "warning")
        return
    }

    exec(`node ${join(sourcePath, "build/index.js")}`, (err, stdout) => {
        console.log(stdout)
        if (err) {
            console.error(err)
            process.exit(1)
            return
        }
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
    await mkdir("./installer_fs_BUILD")
    await mkdir("./dist")
} catch {
    // ignore
}

export async function buildTargetFs(session) {
    await recursiveCopy("./target_fs/Pluto/System41", "./target_fs_BUILD/Pluto/System41", session)
}
export async function buildInstallerFs(session) {
    await recursiveCopy("./installer_fs/Pluto/System41", "./installer_fs_BUILD/Pluto/System41", session)
}
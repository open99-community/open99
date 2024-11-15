import { readdir, mkdir, cp } from "fs/promises"
import { join } from "path"
import { exec, spawn } from "child_process"
import { config } from "dotenv"
import { promisify } from "util"
config()
const execPromise = promisify(exec)
function spawnPromise(command, args, options) {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(command, args, options);

        childProcess.on('error', (error) => {
            reject(error);
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Command "${command}" exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

async function recursiveCopy(sourceDir, targetDir, session, notSystem = false) {
    const dirents = await readdir(sourceDir, { withFileTypes: true })

    for (const dirent of dirents) {
        let sourcePath = join(sourceDir, dirent.name)
        let targetPath

        if (dirent.isDirectory()) {
            if (dirent.name.startsWith("DIR_") || notSystem) { // if it's a directory that shouldn't be built into an executable
                targetPath = join(targetDir, (dirent.name.replace(/^DIR_/, "") ?? dirent.name))
                if (dirent.name !== "System41" && notSystem) {
                    await mkdir(targetPath, {recursive: true})
                    await recursiveCopy(sourcePath, targetPath, session, true)
                } else {
                    //we ignore. this is handled by the second recursiveCopy call
                }
            } else {
                let bundlePath = join(targetDir, `${dirent.name}.js`)
                await handleDirectory(sourcePath, bundlePath, session)
            }
        } else {
            //console.log("FILE", targetDir, dirent)
            targetPath = join(targetDir, dirent.name)
            await cp(sourcePath, targetPath)
        }
    }
}

/**
 * handles an executable directory
 * @param sourcePath
 * @param bundlePath
 * @param session
 * @returns {Promise<void>}
 */
async function handleDirectory(sourcePath, bundlePath, session) {
    const files = await readdir(sourcePath)
    //console.log("directory:" + sourcePath)
    // run the directory's preferred build script (in build/index.js)

    const directorySeparator = process.platform === "win32" ? "\\" : "/"
    const sourcePathSplit = sourcePath.split(directorySeparator)
    const sourcePathLast = sourcePathSplit[sourcePathSplit.length - 1]
    const buildFile = join(sourcePath, "dist", "index.js")

    //console.log("debug: starting " + sourcePathLast)

    if (!files.includes("build") || !(await readdir(sourcePath + directorySeparator + "build")).includes("index.js")) {
        session.addItem(`[${sourcePathLast}]: Skipping (no build script)`, "warning")
        return
    }

    await spawnPromise("npm", ["install"], { cwd: sourcePath, shell: true})

    const { stderr } = await execPromise(`node ${join(sourcePath, "build/index.js")}`)
    if (stderr) {
        session.addItem(`[${sourcePathLast}]: Error occurred while executing build script`, "error")
        console.log(stderr)
        process.exit(1)
    }
    //console.log((await stat(buildFile)).isFile())
    await cp(buildFile, bundlePath)
    session.addItem(`[${sourcePathLast}]: Success`, "success")
}

try {
    await mkdir("./target_fs_BUILD")
    await mkdir("./installer_fs_BUILD")
    await mkdir("./dist")
} catch {
    // ignore
}

export async function buildTargetFs(session) {
    await recursiveCopy("./target_fs/", "./target_fs_BUILD/", session, true)
    session.addItem("[root]: Copied root directory", "success")
    await recursiveCopy("./target_fs/Pluto/System41", "./target_fs_BUILD/Pluto/System41", session)
}
export async function buildInstallerFs(session) {
    await recursiveCopy("./installer_fs/", "./installer_fs_BUILD/", session, true)
    session.addItem("[root]: Copied root directory", "success")
    await recursiveCopy("./installer_fs/Pluto/System41", "./installer_fs_BUILD/Pluto/System41", session)
}
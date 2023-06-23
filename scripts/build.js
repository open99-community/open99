import { Command } from "commander"
import zippy from "file-zippy"

import { readFile } from "fs/promises"
const json = JSON.parse(
    await readFile(
        new URL("../package.json", import.meta.url)
    )
)

const cli = new Command()
cli
    .name("41")
    .description("CLI for building open99")
    .version(json.version || "unknown")

cli.command("fs-build")
    .description("Build the filesystem")
    .argument("[folder-location]", "The location of the folder you want to build from. Default is fs.", "fs")
    .action((folderLocation) => {
        zippy(folderLocation, "./src/rootfs.zip")
    })

cli.parse()
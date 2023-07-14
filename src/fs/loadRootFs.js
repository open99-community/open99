// noinspection ES6MissingAwait
// because my IDE is dumb

import JSZip from "jszip"
import fileSystemItem from "./FileSystemItem.js"

export async function load() {
    let zip = await JSZip.loadAsync(await (await fetch("/assets/rootfs.zip")).blob())
    await zip.forEach(async (relativePath, file) => {
        const content = await file.async("base64")
        const item = new fileSystemItem({
            path: relativePath,
            content: content
        })
        await item.save()
    })
}
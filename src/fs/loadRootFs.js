// noinspection ES6MissingAwait
// because my IDE is dumb

import JSZip from "jszip"
import file from "../rootfs.zip"
import fileSystemItem from "./FileSystemItem.js"

export async function loadRootFs() {
    let zip = await JSZip.loadAsync(file)
    await zip.forEach(async (relativePath, file) => {
        const content = await file.async("base64")
        const item = new fileSystemItem({
            path: relativePath,
            content: content
        })
        await item.save()
    })
}
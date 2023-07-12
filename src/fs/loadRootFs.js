// noinspection ES6MissingAwait
// because my IDE is dumb

import JSZip from "jszip"
import fileSystemItem from "./FileSystemItem.js"

export async function loadRootFs() {
    const storage = window.indexedDB.open("open99", 1)
    storage.onupgradeneeded = async (ev) => {
        console.log("upgrade needed", ev)
    }
    storage.onupgradeneeded = async (ev) => {
        //console.log(ev)
        const db = ev.target.result.createObjectStore("c", )
    }
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
// noinspection ES6MissingAwait
// because my IDE is dumb

import JSZip from "jszip"
import fileSystemItem from "./FileSystemItem.ts"
import rootfs from "../../public/assets/rootfs.zip"

export async function load() {
    //@TODO check if lockfile exists before formatting and writing rootfs
    try {
        const blob = await (await fetch(rootfs)).blob()
        let zip = await JSZip.loadAsync(blob)
        const filePromises = []

        zip.forEach((relativePath, file) => {
            filePromises.push(
                file.async("blob").then(content => { return { relativePath, content } })
            )
        })

        const files = await Promise.all(filePromises)

        await Promise.all(
            files.map(async ({ relativePath, content }) => {
                const item = new fileSystemItem({
                    path: relativePath,
                    content: content
                })
                return item.save()
            })
        )

    } catch(error) {
        // Handle error
        if (error.target.error.name === "ConstraintError") {
            console.warn("Root filesystem already loaded")
            return
        }
        console.error(error)
    }
}
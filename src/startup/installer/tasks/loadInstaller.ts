// @ts-ignore
import rootfs from "../../../../dist/assets/installer.zip" //this only imports an external URL. URL is randomized on build
import {Drive} from "../../../fs/drivers";

export async function load() {
    try {
        const blob = await (await fetch(rootfs)).blob()
        let zip = await window.JSZip.loadAsync(blob)
        let filePromises = []

        zip.forEach((relativePath: string, file: window.JSZip.JSZipObject) => {
            filePromises.push(
                file.async("blob").then(content => { return { relativePath, content } })
            )
        })

        const files = await Promise.all(filePromises)

        await Promise.all(
            files.map(async ({ relativePath, content }) => {
                // File saving mechanism here

                Drive.getByDriveLetter("C")?.driverInstance?.write(relativePath, content)
            })
        )

    } catch(error) {
        console.error(error)
    }
}
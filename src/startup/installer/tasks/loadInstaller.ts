// @ts-ignore
import {Drive} from "../../../fs/drivers";
import type * as JSZip from "jszip"
import {KernelError} from "../../../util/errors";

interface FilePromise {
    relativePath: string;
    content: Blob;
}

export async function load() {
    try {
        const blob = await (await fetch("./assets/installer.zip")).blob()
        let zip = await window.JSZip.loadAsync(blob)
        let filePromises: Promise<FilePromise>[] = []

        zip.forEach((relativePath: string, file: JSZip.JSZipObject) => {
            filePromises.push(
                file.async("blob").then((content: Blob) => { return { relativePath, content } })
            )
        })

        const files = await Promise.all(filePromises)

        let noDrive: boolean = false;
        await Promise.all(
            files.map(async ({ relativePath, content }) => {
                // File saving mechanism here

                if (Drive.getByDriveLetter("C") === undefined) {noDrive = true; return}
                Drive.getByDriveLetter("C")?.driverInstance?.write(relativePath, content)
            })
        )
        if (noDrive) {
            const err = new KernelError("C drive not found")
            console.error(err)
            return err
        }

    } catch(error) {
        console.error(error)
        return error
    }
}
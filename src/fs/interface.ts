import {FileContentTypes, FileMetadataType} from "../types/fs";
import { Drive } from ".";

//remember!!! when this file is updated, update https://learn.d.pluto.stretch.wtf/guide/fs/drivers

export interface DBDriver {
    /**
     * The name of the driver. For example, `IDB`.
     * This should not be the drive letter.
     */
    name: string,
    write: (path: string, content: FileContentTypes, metadata?: FileMetadataType) => Promise<void | Error>,
    read: (path: string) => Promise<FileContentTypes | Error>,
    readDir: (path: string) => Promise<string[] | Error>,
    readMetadata: (path: string) => Promise<FileMetadataType | Error>,
    delete: (path: string) => Promise<void | Error>,
    mv: (oldPath: string, newPath: string) => Promise<void | Error>,
    cp: (oldPath: string, newPath: string) => Promise<void | Error>,
    getFreeSpace: () => Promise<number | Error>,
    init: (drive: Drive) => Promise<void | Error>
}
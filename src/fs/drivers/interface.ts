import {FileContentTypes, FileMetadataType} from "../../types/fs";

export interface DBDriver {
    /**
     * The name of the driver. For example, `IDB`.
     * This should not be the drive letter.
     */
    name: string,
    write: (path: string, content: FileContentTypes, metadata: FileMetadataType) => Promise<void | Error>,
    read: (path: string) => Promise<FileContentTypes | Error>,
    delete: (path: string) => Promise<void | Error>,
    mv: (oldPath: string, newPath: string) => Promise<void | Error>,
    cp: (oldPath: string, newPath: string) => Promise<void | Error>,
    getFreeSpace: () => Promise<number | Error>,
    init: () => Promise<void | Error>
}
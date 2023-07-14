import {Directory} from "./Directory"
import {File} from "./File"

/**
 * A drive object.
 */
export interface Drive {
    /**
     * The name of the drive
     */
    friendlyName: string,
    /**
     * The letter of the drive
     */
    letter: string,
    /**
     * The type of the drive. Currently only IDB is supported.
     */
    type: "IDB",
    /**
     * The contents of the drive. This can be a list of directories and/or files.
     */
    contents: Directory | File[],
}
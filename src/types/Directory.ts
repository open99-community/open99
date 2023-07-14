import {File} from "./File"

/**
 * A directory object.
 */
export interface Directory {
    /**
     * The name of the directory.
     */
    name: string,
    /**
     * The path of the directory without the name. Includes the drive letter.
     */
    path: string,
    /**
     * The full path of the directory including the name and the drive letter.
     */
    fullPath: string,
    /**
     * The date the directory was last modified.
     */
    modified: Date,
    /**
     * The date the directory was created.
     */
    created: Date,
    /**
     * Whether the directory should not display in the file explorer.
     */
    hidden: boolean,
    /**
     * Whether the directory should not be editable.
     */
    readonly: boolean,
    /**
     * The type of the directory. Currently only 1 is supported.
     */
    type: 1,
    /**
     * The contents of the directory. This can be a list of directories and/or files.
     */
    readonly contents: Directory | File[],
}
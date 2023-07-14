/**
 * A file object.
 */
export interface File {
    /**
     * The name of the file with extension and without the path.
     */
    name: string,
    /**
     * The path of the file without the name. Includes the drive letter. Essentially just the directory in which it resides.
     */
    path: string,
    /**
     * The full path of the file including the name and the drive letter.
     */
    fullPath: string,
    /**
     * The size of the file in bytes.
     */
    size: number,
    /**
     * The date the file was last modified.
     */
    modified: Date,
    /**
     * The date the file was created.
     */
    created: Date,
    /**
     * The MIME type of the file.
     */
    mime: string,
    /**
     * The type of the file. Currently only 0 is supported.
     */
    type: 0,
    /**
     * The contents of the file as a Blob.
     */
    blob: Blob,
    /**
     * Whether the file should not display in the file explorer.
     */
    hidden: boolean,
    /**
     * Whether the file should not be editable.
     */
    readonly: boolean,
}
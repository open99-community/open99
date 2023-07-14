export interface File {
    name: string,
    path: string,
    size: number,
    modified: Date,
    mime: string,
    type: number,
    blob: Blob,
    hidden: boolean,
    readonly: boolean,
}
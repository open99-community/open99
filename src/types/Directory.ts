import {File} from "./File"

export interface Directory {
    name: string,
    hidden: boolean,
    readonly: boolean,
    modified: Date,
    type: number,
    path: string,
    readonly files: File[],
}
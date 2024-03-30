export type driveLetter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" |
    "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" |
    "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" |
    "Z"
export const DriveLetters: driveLetter[] = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y",
    "Z"
]
export type FileContentTypes = Blob
export interface FileMetadata {
    size: number,
    created: Date,
    modified: Date,
}
export type FileMetadataType = FileMetadata & {
    [key: string]: unknown
}
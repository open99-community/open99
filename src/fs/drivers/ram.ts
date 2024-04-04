import {DBDriver} from "./interface";
import {FileContentTypes, FileMetadataType} from "../../types/fs";

export class RAMDriver implements DBDriver {
    name: string = "RAM";
    private _DB: any = {};
    async init(): Promise<void | Error> {
        /* remember, the RAM database is just a simple object stored in memory.
           it is reset after each reboot, which means that there is no
           data persistence.
         */

        this._DB = {
            [Symbol.for("$LOOKUP")]: {}, //maps paths to IDs
            [Symbol.for("$MAP1")]: {}, //maps IDs to metadata
            [Symbol.for("$MAP2")]: {}, //maps IDs to content
        };

    }

    async write(path: string, content: FileContentTypes, metadata?: FileMetadataType): Promise<void | Error> {
        this.checkSymbolKeys()
        try {
            const id = this._DB[Symbol.for("$LOOKUP")][path]
            if (id) {
                //file edit request
                if (!metadata && !content) {
                    return new Error("Nothing to write")
                } else if (metadata) {
                    this._DB[Symbol.for("$MAP1")][id] = metadata;
                }

                if (content) {
                    this._DB[Symbol("$MAP2")][id] = content;
                } else {
                    //no content provided, do nothing
                }
                return;
            } else {
                //file creation request
                const id = this.generateId();

                this._DB[Symbol.for("$LOOKUP")][path] = id

                if (metadata) {
                    this._DB[Symbol.for("$MAP1")][id] = metadata;
                } else {
                    let size
                    if (content) {
                        size = content.size;
                    } else {
                        size = 0;
                    }

                    this._DB[Symbol.for("$MAP1")][id] = {
                        size: size
                    };
                }

                this._DB[Symbol.for("$MAP2")][id] = content;
                return;
            }
        } catch (e) {
            if (e instanceof Error) { //typescript is weird
                console.log(e)
                return e
            }
        }
    }

    async read(path: string): Promise<FileContentTypes | Error> {
        const id = this._DB[Symbol.for("$LOOKUP")][path]
        if (id) {
            return this._DB[Symbol.for("$MAP2")][id];
        } else {
            return new Error("File not found");
        }
    }

    async readDir(path: string): Promise<string[] | Error> {
        const files = Object.keys(this._DB[Symbol.for("$LOOKUP")])
        return files.filter(file => file.startsWith(path))
    }

    async readMetadata(path: string): Promise<FileMetadataType | Error> {
        const id = this._DB[Symbol.for("$LOOKUP")][path]
        if (id) {
            return this._DB[Symbol.for("$MAP1")][id];
        } else {
            return new Error("File not found");
        }
    }

    async delete(path: string): Promise<void | Error> {
        const id = this._DB[Symbol.for("$LOOKUP")][path]
        if (id) {
            this._DB[Symbol.for("$LOOKUP")][path] = undefined
            this._DB[Symbol.for("$MAP1")][id] = undefined
            this._DB[Symbol.for("$MAP2")][id] = undefined
        } else {
            return new Error("File not found");
        }
    }

    async mv(oldPath: string, newPath: string): Promise<void | Error> {
        const id = this._DB[Symbol("$LOOKUP")][oldPath]
        if (id) {
            this._DB[Symbol.for("$LOOKUP")][newPath] = id
            this._DB[Symbol.for("$LOOKUP")][oldPath] = undefined
        } else {
            return new Error("File not found");
        }
    }

    async cp(/*oldPath: string, newPath: string*/): Promise<void | Error> {
        return new Error("Not implemented");
    }

    async getFreeSpace(): Promise<number | Error> {
        return Infinity; // ok, technically this isn't true but who cares
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    private checkSymbolKeys(): true | Error {
        const symNotFound = (i: number) => {return new Error(`Symbol with index ${i} not in store`)}
        try {
            const propSymbols = Object.getOwnPropertySymbols(this._DB)
            propSymbols.forEach((val, i) => {
                switch (i) {
                    case 0:
                        if (val !== Symbol.for("$LOOKUP")) {
                            return symNotFound(i)
                        }
                        break;
                    default:
                        if (val !== Symbol.for(`MAP${i}`)) {
                            return symNotFound(i)
                        }
                        break;
                }
            })
        } catch {
            return new Error("Error checking store symbol keys.")
        }
        return new Error("stretch was here") //this will never be reached, typescript is just weird
    }
}
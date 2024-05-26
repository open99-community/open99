import {DBDriver} from "./interface";
import {FileContentTypes, FileMetadataType} from "../../types/fs";

export class RAMDriver implements DBDriver {
    name: string = "RAM";
    private _DB: any = {};
    private $LOOKUP: symbol | undefined;
    private $MAP1: symbol | undefined;
    private $MAP2: symbol | undefined;
    async init(): Promise<void | Error> {
        /* remember, the RAM database is just a simple object stored in memory.
           it is reset after each reboot, which means that there is no
           data persistence.
         */

        function shuffle(array: any[]) {
            let currentIndex = array.length;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }
        }

        if (process.env.NODE_ENV === "development") {
            this.$LOOKUP = Symbol.for("$LOOKUP");
            this.$MAP1 = Symbol.for("$MAP1");
            this.$MAP2 = Symbol.for("$MAP2");
        } else { //this is for the obfuscation
            this.$LOOKUP = Symbol.for(String(Math.random()));
            this.$MAP1 = Symbol.for(String(Math.random()));
            this.$MAP2 = Symbol.for(String(Math.random()));
        }


        this._DB = {
            [this.$LOOKUP]: {}, //maps paths to IDs
            [this.$MAP1]: {}, //maps IDs to metadata
            [this.$MAP2]: {}, //maps IDs to content
        };

        /* //TODO: fix the shuffle function, it was causing memory leaks, etc
        if (process.env.NODE_ENV !== "development") {
            shuffle(this._DB)
        }
        */

    }

    async write(path: string, content: FileContentTypes, metadata?: FileMetadataType): Promise<void | Error> {
        this.checkSymbolKeys()
        try {
            const id = this._DB[this.$LOOKUP][path]
            if (id) {
                //file edit request
                if (!metadata && !content) {
                    return new Error("Nothing to write")
                } else if (metadata) {
                    this._DB[this.$MAP1][id] = metadata;
                }

                if (content) {
                    this._DB[this.$MAP2][id] = content;
                } else {
                    //no content provided, do nothing
                }
                return;
            } else {
                //file creation request
                const id = this.generateId();

                this._DB[this.$LOOKUP][path] = id

                if (metadata) {
                    this._DB[this.$LOOKUP][id] = metadata;
                } else {
                    let size
                    if (content) {
                        size = content.size;
                    } else {
                        size = 0;
                    }

                    this._DB[this.$LOOKUP][id] = {
                        size: size
                    };
                }

                this._DB[this.$MAP2][id] = content;
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
        const id = this._DB[this.$LOOKUP][path]
        if (id) {
            return this._DB[this.$MAP2][id];
        } else {
            return new Error("File not found");
        }
    }

    async readDir(path: string): Promise<string[] | Error> {
        const files = Object.keys(this._DB[this.$LOOKUP])
        return files.filter(file => file.startsWith(path))
    }

    async readMetadata(path: string): Promise<FileMetadataType | Error> {
        const id = this._DB[this.$LOOKUP][path]
        if (id) {
            return this._DB[this.$MAP1][id];
        } else {
            return new Error("File not found");
        }
    }

    async delete(path: string): Promise<void | Error> {
        const id = this._DB[this.$LOOKUP][path]
        if (id) {
            this._DB[this.$LOOKUP][path] = undefined
            this._DB[this.$MAP1][id] = undefined
            this._DB[this.$MAP2][id] = undefined
        } else {
            return new Error("File not found");
        }
    }

    async mv(oldPath: string, newPath: string): Promise<void | Error> {
        const id = this._DB[Symbol("$LOOKUP")][oldPath]
        if (id) {
            this._DB[this.$LOOKUP][newPath] = id
            this._DB[this.$LOOKUP][oldPath] = undefined
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
                        if (val !== this.$LOOKUP) {
                            throw symNotFound(i)
                        }
                        break;
                    default:
                        if (val !== Symbol.for(`MAP${i}`)) {
                            throw symNotFound(i)
                        }
                        break;
                }
            })
        } catch {
            throw new Error("Error checking store symbol keys.")
        }
    }
}
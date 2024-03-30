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
            [Symbol("$LOOKUP")]: {}, //maps paths to IDs
            [Symbol("$MAP1")]: {}, //maps IDs to metadata
            [Symbol("$MAP2")]: {}, //maps IDs to content
        };

    }

    async write(path: string, content: FileContentTypes, metadata: FileMetadataType): Promise<void | Error> {
        const id = this._DB[Symbol("$LOOKUP")][path]
        if (id) {
            //file edit request

            if (metadata) {
                this._DB[Symbol("$MAP1")][id] = metadata;
            } else { //if there is no metadata, we assume filesize
                let size
                if (content) {
                    size = content.size;
                } else {
                    size = 0;
                }

                this._DB[Symbol("$MAP1")][id] = {
                    size: size
                };
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

            this._DB[Symbol("$LOOKUP")][path] = id
            this._DB[Symbol("$MAP1")][id] = metadata;
            this._DB[Symbol("$MAP2")][id] = content;
            return;
        }
    }

    async read(path: string): Promise<FileContentTypes | Error> {
        const id = this._DB[Symbol("$LOOKUP")][path]
        if (id) {
            return this._DB[Symbol("$MAP2")][id];
        } else {
            return new Error("File not found");
        }
    }

    async delete(path: string): Promise<void | Error> {
        const id = this._DB[Symbol("$LOOKUP")][path]
        if (id) {
            this._DB[Symbol("$LOOKUP")][path] = undefined
            this._DB[Symbol("$MAP1")][id] = undefined
            this._DB[Symbol("$MAP2")][id] = undefined
        } else {
            return new Error("File not found");
        }
    }

    async mv(oldPath: string, newPath: string): Promise<void | Error> {
        const id = this._DB[Symbol("$LOOKUP")][oldPath]
        if (id) {
            this._DB[Symbol("$LOOKUP")][newPath] = id
            this._DB[Symbol("$LOOKUP")][oldPath] = undefined
        } else {
            return new Error("File not found");
        }
    }

    async cp(/*oldPath: string, newPath: string*/): Promise<void | Error> {
        return new Error("Not implemented");
    }

    async getFreeSpace(): Promise<number | Error> {
        return Infinity;
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
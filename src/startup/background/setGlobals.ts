import {database} from "../../fs/idb";
import fsApi from "../../fs/fs";
import {components} from "../../gui/components";
import ProgramRuntime from "../../41worker/ProgramRuntime"
import { libIDB } from "../../fs/libIDB"

export async function fn() {
    if (process.env.NODE_ENV === "development") {
            window.PlatformUtility = {
                _db: database,
                _boot: undefined, //@TODO fix this
                fs: fsApi,
                AppRuntime: ProgramRuntime,
                components,
                libIDB
            }
    }
}
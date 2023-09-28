import {database} from "../../../fs/idb";
import {Bootscreen} from "../../gui";
import fsApi from "../../../fs/fs";
import {components} from "../../../gui/components";
import AppRuntime from "../../../41worker/AppRuntime"

export async function fn() {
    if (process.env.NODE_ENV === "development") {
            window.sys41 = {
                _db: database,
                _boot: undefined, //@TODO fix this
                fs: fsApi,
                AppRuntime,
                components
            }
    }
}
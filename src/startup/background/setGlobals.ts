import ProgramRuntime from "../../41worker/ProgramRuntime"
import {Drive} from "../../fs/drivers";

export function fn() {
    if (process.env.NODE_ENV === "development") {
            window.PlatformUtility = {
                Drive,
                _boot: undefined, //@TODO fix this
                AppRuntime: ProgramRuntime,
            }
    }
}
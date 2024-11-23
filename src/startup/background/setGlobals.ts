import ProgramRuntime from "../../41worker/ProgramRuntime"
import AsmRuntime from "../../Assembly/AsmRuntime";
import {ProcessManager} from "../../41worker/ProcessManager";
import {Drive} from "../../fs/drivers";

export function fn() {
    if (process.env.NODE_ENV === "development") {
        try {
            window.PlatformUtility = {
                Drive,
                _boot: undefined, //@TODO fix this
                ProgramRuntime: ProgramRuntime,
                AsmRuntime,
                ProcessManager,
            }
        } catch (e) {
            console.error(e)
        }
    }
}
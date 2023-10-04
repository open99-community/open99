import { fn as load } from "./tasks/loadFS.js";
import type { BootEntryWriteMethod } from "../gui.ts"

export async function fn({write}: { write: BootEntryWriteMethod}) {
    await load({write})
}
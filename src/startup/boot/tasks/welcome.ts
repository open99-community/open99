import type { BootEntryWriteMethod } from "../../gui"

// https://github.com/Microsoft/TypeScript/issues/29526
// this type gave me a lot of trouble. look at gui.ts for more info
export async function fn({write}: { write: BootEntryWriteMethod}) {
    write(`🌌 <span class=\"rainbow-text\">Pluto</span> v${$SYSVER} by ${$SYSAUT} booting on ${navigator.userAgent} at ${new Date()}...`)
}
// COFFEESCRIPT SERVICE

// @ts-ignore
import { compile } from "./bundled/__coffeescript-parse.js"
/* argument[0] = shell? argument[1] = cscript argument[2] = filename */

declare global {
    const sys41: {
        fs: {
            getFile: (path: string) => Promise<string>
        }
    }
    const __process: any
}

let content
try {
    content = await sys41.fs.getFile(__process.argv[2])
} catch(e) {
    console.error(e)
    await __process.respond(e)
}

let compiled
try {
    compiled = compile(content)
} catch (e) {
    await __process.respond(e)
}

await __process.respond(compiled)
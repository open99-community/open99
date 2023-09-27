import * as fs from "fs/promises"
import minifyHtml from "@minify-html/node"

export async function build() {
    await fs.writeFile("./dist/index.html", minifyHtml.minify(await fs.readFile("./dist/index.html", ), {
        do_not_minify_doctype: true,
        keep_spaces_between_attributes: true,
    }))
}
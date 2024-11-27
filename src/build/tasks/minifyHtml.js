import minify from "@node-minify/core";
import minifyHTMLMinifier from "@node-minify/html-minifier";

export async function build() {
    if (process.env.NODE_ENV !== "development") {

        await minify({
            compressor: minifyHTMLMinifier,
            input: "../public/index.html",
            output: "../dist/index.html",
            options: {
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: false,
                minifyCSS: true
            }
        })

    }
}
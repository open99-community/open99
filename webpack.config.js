import path from "path"
import * as dotenv from "dotenv"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const mode = process.env.NODE_ENV || "production"

console.log(`Building in mode: ${mode}`)
export default {
    entry: "./src/index.js",
    output: {
        publicPath: "", //for some reason this needs to be set to an empty string: https://stackoverflow.com/questions/64294706/webpack5-automatic-publicpath-is-not-supported-in-this-browser
        path: path.resolve(__dirname, "public"),
        filename: "sys41.min.js"
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: "raw-loader"
            }
        ]
    },
    experiments: {
        topLevelAwait: true
    },
    devtool: "source-map",
    mode: process.env.NODE_ENV || "production"
}
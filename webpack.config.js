import path from "path"
import * as dotenv from "dotenv"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()

export default {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "public/system/scripts"),
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
    mode: process.env.NODE_ENV
}
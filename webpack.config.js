import path from "path"
import { webpack } from "webpack"

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
    }
}
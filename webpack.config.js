import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
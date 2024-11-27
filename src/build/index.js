import tasks from "./tasks/index.js"
import { serve } from "./serve.js"
import {handle} from "./meta/versionhandler.js"
const value = await handle()
import { config } from "dotenv"
config({path: "../.env"})
if (process.argv["--env"]) {
    process.env.NODE_ENV = process.argv["--env"]
}

const kernelWatch = process.argv["--kernel"] && !process.argv["--program"]
const programWatch = process.argv["--program"] && !process.argv["--kernel"]

const args = {
    isWatchMode: process.argv.includes("--watch"),
    NODE_ENV: process.env.NODE_ENV,
    realVersion: value,
}
for (const task of tasks) {
    await task(args)
}
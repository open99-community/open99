import tasks from "./tasks/index.js"
import { LogSession } from "portalog"
import { serve } from "./serve.js"
import {handle} from "./meta/versionhandler.js"
const value = await handle()
import { config } from "dotenv"
config()
if (process.argv["--env"]) {
    process.env.NODE_ENV = process.argv["--env"]
}

const session = new LogSession
const logger = session.addItem(`----------\n🌌 PLUTO\n----------\nbuilding on ${new Date()}\n- Mode: ${process.env.NODE_ENV}\n- Watch mode: ${process.argv.includes("--watch") ? "on" : "off"}\n- Version: ${value}`, "info")
const args = {
    session: logger,
    isWatchMode: process.argv.includes("--watch"),
    NODE_ENV: process.env.NODE_ENV,
    realVersion: value
}
for (const task of tasks) {
    await task(args)
}
session.addItem("Build complete!", "info")

if (process.argv.includes("--watch")) {
    session.addItem("Starting server...", "info");
    (async () => {
        await serve({session})
    })()
}
import tasks from "./tasks/index.js"
import { LogSession } from "portalog"
import {handle} from "./meta/versionhandler.js"
const value = await handle()
import { config } from "dotenv"
config()
//@TODO make this less redundant yet still compact
process.env.NODE_ENV = process.argv.includes("--devmode") ? "development" : process.env.NODE_ENV || "production"
process.env.NODE_ENV = process.argv.includes("--prodmode") ? "production" : process.env.NODE_ENV || "production"

const session = new LogSession
const logger = session.addItem(`🌌 PLUTO OS building on ${new Date()}\n- Mode: ${process.env.NODE_ENV}\n- Watch mode: ${process.argv.includes("--watch") ? "on" : "off"}\n- Version: ${value}`, "info")
const args = {
    session: logger,
    isWatchMode: process.argv.includes("--watch"),
    NODE_ENV: process.env.NODE_ENV,
}
for (const task of tasks) {
    await task(args)
}
session.addItem("🌌 Build complete!", "info")
import tasks from "./tasks/index.js"
import { LogSession } from "portalog"
import { config } from "dotenv"
config()
process.env.NODE_ENV = process.argv.includes("--devmode") ? "development" : process.env.NODE_ENV || "production"
process.env.NODE_ENV = process.argv.includes("--prodmode") ? "production" : process.env.NODE_ENV || "production"

const session = new LogSession
const logger = session.addItem(`PLUTO OS building on ${new Date()}\nin ${process.env.NODE_ENV} mode. Watch mode is ${process.argv.includes("--watch") ? "on" : "off"}`, "🌌")
const args = {
    session: logger,
    isWatchMode: process.argv.includes("--watch"),
    NODE_ENV: process.env.NODE_ENV,
}
for (const task of tasks) {
    await task(args)
}
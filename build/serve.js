import handler from "serve-handler"
import http from "http"
import open from "open"
import { config } from "dotenv"
config()
let isFirstBuild = true

export async function serve({session}) {
    http.createServer((req, res) => {
        return handler(req, res, {
            public: "./dist",
            cleanUrls: true,
        })
    }).listen(process.env.DEV_SERVER_PORT, async () => {
        const url = `http://localhost:${process.env.DEV_SERVER_PORT}`

        session.addItem(`Server running at ${url}`, "success")
        if (isFirstBuild) {
            await open(url)
            isFirstBuild = false
        }
    })
}
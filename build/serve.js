import handler from "serve-handler"
import http from "http"
import { config } from "dotenv"
config()

export async function serve({session}) {
    http.createServer((req, res) => {
        return handler(req, res, {
            public: "./dist",
            cleanUrls: true,
        })
    }).listen(process.env.DEV_SERVER_PORT ?? 8000, async () => {
        const url = `http://localhost:${process.env.DEV_SERVER_PORT ?? 8000}`
        session.addItem(`Server running at ${url}`, "success")
    });
}
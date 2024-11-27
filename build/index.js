import handler from "serve-handler"
import http from "http"

console.log("build part 2")
if (process.argv.includes("--watch")) {
    console.log("Starting server...", "info");
    (async () => {
        http.createServer((req, res) => {
            return handler(req, res, {
                public: "./dist",
                cleanUrls: true,
            })
        }).listen(process.env.DEV_SERVER_PORT ?? 8000, async () => {
            const url = `http://localhost:${process.env.DEV_SERVER_PORT ?? 8000}`
            console.log(`Server running at ${url}`, "success")
        });
    })()
}
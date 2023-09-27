import { DevToolsDetector } from "devtool-blocker"
export const monitorDevtools = () => {
    if (process.env.NODE_ENV !== "development") {
        const blocker = new DevToolsDetector()
        blocker.config.onDetectOpen = () => {
            alert("Do not use devtools.")
        }
    } else {
        console.log("devtools is not monitored in development mode")
    }
}
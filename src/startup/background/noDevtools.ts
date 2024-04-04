import { DevToolsDetector } from "devtool-blocker"
export const monitorDevtools = () => {
    if (process.env.NODE_ENV !== "development") {
        const blocker = new DevToolsDetector()
        blocker.config.onDetectOpen = () => {
            alert("Do not use devtools.")
        }
    } else {
        // devtools isn't blocked in development
    }
}
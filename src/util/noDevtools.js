import { DevtoolBlocker} from "devtool-blocker"
export const monitorDevtools = () => {
    if (process.env.NODE_ENV !== "development") {
        const blocker = new DevtoolBlocker()
        blocker.config.onDetectOpen = () => {
            alert("Do not use devtools.")
        }
    } else {
        console.log("devtools is not monitored in development mode")
    }
}
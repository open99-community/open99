import { Manager } from "browser-detect-devtools"
export const monitorDevtools = () => {
    if (/*process.env.NODE_ENV !== "development"*/ false) { //there are bugs with this library
        Manager.alwaysConsoleClear(true)
        Manager.freezeWhenDevToolsOpened(true)

        Manager.startDevToolMonitoring()
    } else {
        console.log("devtools is not monitored in development mode")
    }
}
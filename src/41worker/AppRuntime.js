import exposedapis from "./exposeapis.js"
import sysApis from "./sysApis.js"

/** Class representing 41worker runtime */
class AppRuntime {
    /**
     * Run the application
     * @param {string} code Code to be executed in 41worker runtime
     * @param {{title: string, id: string}} appInfo Application metadata. Accessible within runtime
     */
    constructor(code, appInfo) {
        this.code = code
        this.appInfo = appInfo
        this.execCode = exposedapis + sysApis({appInfo: appInfo}) + code
        this.blob = new Blob([this.execCode], {type: "application/javascript"})
        this.url = URL.createObjectURL(this.blob)
        this.worker = new Worker(url, {type: "classic"})
    }
    /**
     * 
     * @param {string} reason 
     * @returns {this}
     */
    terminate(reason){
        this.worker.terminate()
        return this
    }
    /**
     * handles the received message
     * @param {string} msg Message to communicate to main thread
     * @returns {string} Message to communicate to runtime
     */
    handleReceivedMessage(msg){
        //here is where we put a super long switch statement to determine what to return
        switch (msg) {
            
        }
    }
}

export default AppRuntime
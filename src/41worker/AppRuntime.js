import exposedapis from "./exposeapis"

class AppRuntime {
    constructor({
        code,
        appInfo
    }) {
        this.code = code
        this.execCode = exposedapis + code
        this.blob = new Blob([this.execCode], {type: "application/javascript"})
        this.url = URL.createObjectURL(this.blob)
        this.worker = new Worker(url, {type: "classic"})
    }
    terminate(reason){
        this.worker.terminate()
    }
    handleReceivedMessage(msg){
        //here is where we put a super long switch statement to determine what to return
        switch (msg) {
            
        }
    }
}

export default AppRuntime
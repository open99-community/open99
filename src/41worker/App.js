class AppRuntime {
    constructor({
        codeFile
    }) {
        this.codeFile = codeFile
        this.blob = codeFile.toBlob()
        this.url = URL.createObjectURL(blob)
        this.worker = new Worker(url)
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
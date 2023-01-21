import tasksys from "../tasks"

const fsTask = function(){

    let openRequest = window.indexedDB.open("open99", 1)
    openRequest.onerror = e => {
        return new Error("Error when attempting to open database")
    }
    let db
    openRequest.onsuccess = e => {
        db = openRequest.result
    }

}

tasksys.register("fs", fsTask)
export default fsTask
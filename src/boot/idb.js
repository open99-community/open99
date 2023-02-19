const fsTask = async () => {

    let openRequest = window.indexedDB.open("open99", 1)
    openRequest.onerror = e => {
        console.log("Error when attempting to open database: " + e)
    }
    let DATABASE
    openRequest.onsuccess = e => {
        DATABASE = openRequest.result || e.target.result
        //and then we need to return this fsTask function 
        //which is two levels deep and i have no clue how to do
    }
}

export default fsTask
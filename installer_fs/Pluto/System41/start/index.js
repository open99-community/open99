import {Pluto} from "@use-pluto/satellite"

//const res = await Pluto._core.sendRequest({op: 10})
//const res2 = await Pluto._core.sendRequest({op: 70})
//console.log(res)
//console.log(res2)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("sleeping for 5 seconds")
await sleep(5000)
console.log("done sleeping")

const comms = Pluto._core.CommsHandler.getInstance();

await comms.call("fs.createFile");
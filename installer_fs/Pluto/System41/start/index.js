import {Pluto} from "@use-pluto/satellite"

//const res = await Pluto._core.sendRequest({op: 10})
//const res2 = await Pluto._core.sendRequest({op: 70})
//console.log(res)
//console.log(res2)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log("test program")
const comms = Pluto._core.CommsHandler.getInstance();

const body = await comms.call(70);

console.log(body);
import {Pluto} from "@use-pluto/satellite"

const res = await Pluto._core.sendRequest({op: 10})

//console.log("it responded", res)
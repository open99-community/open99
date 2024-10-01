import {Pluto} from "@use-pluto/satellite"

const res = await Pluto._core.sendRequest({op: 10})
const res2 = await Pluto._core.sendRequest({op: 70})

console.log(res2)
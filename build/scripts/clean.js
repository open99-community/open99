import {buil1} from "../tasks/clean.js";

//this is for `npm run clean`

const session_fix = {
    addItem: (...args) => {return session_fix}
}

await buil1({session: session_fix, noPrepare: true})
console.log("Cleaned up")
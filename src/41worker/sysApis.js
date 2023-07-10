/**
 * system apis such as sys41.*, __app, worker, etc
 * @param {{appInfo: {name: string, id: string}}} context  
 * @returns {string}
 */
let sysApis = (context) => {
    // noinspection UnnecessaryLocalVariableJS
    let returnValue =  `
const sys41 = {
    fs: {}
}
const __app = ${JSON.stringify(context.appInfo)}
const worker = {
    send: function(op, args) {
        self.postMessage({op: op, args: args})
    }
}
`
    return returnValue
}

export default sysApis
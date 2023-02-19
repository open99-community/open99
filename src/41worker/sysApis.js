/**
 * system apis such as sys41.*, __app, etc
 * @param {{appInfo: {name: string, id: string}}} context  
 * @returns {string}
 */
let sysApis = (context) => {
    let returnValue =  `
globalThis.sys41 = {}
let __app = ${JSON.stringify(context.appInfo)};
`
    return returnValue
}

export default sysApis
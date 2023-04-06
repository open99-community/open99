/**
 * Custom setInterval function used in 41worker
 * @returns {number}
 * @param {() => void} handler Handler function
 * @param {number} interval How often (in ms) handler fires off
 */
export default (handler, interval) => {
    /* eslint-disable no-undef */
    if (globalThis.sys41.inApp){
        // Good! (functionality coming soon)
    } else {
        throw new Error("Not in 41worker environment")
    }
}
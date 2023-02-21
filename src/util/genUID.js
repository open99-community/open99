/**
 * @param {string} prefix - Random id prefix
 * @param {string} suffix - Random id suffix
 */
export default (prefix = "", suffix = "") => {
    return prefix + Math.random().toString(16).slice(2) + suffix // thanks: https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript/3231532#3231532
}
export default (prefix:string = "", suffix: string = "") => {
    return prefix + Math.random().toString(16).slice(2) + suffix // thanks: https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript/3231532#3231532
}
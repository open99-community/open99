// @TODO lets obfuscate the valid domains so that it's harder to find them
const validDomains = [
    "https://pluto.pablogracia.net/",
]

export function noPiracy() {
    if (process.env.NODE_ENV !== "development") {
        if (!validDomains.includes(window.location.origin)) {
            //window.location.href = "https://pablogracia.net/piracy";
        }
    }
}
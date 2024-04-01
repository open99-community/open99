import {config} from "dotenv"
config() //THIS SHOULDN'T BE NECESSARY SINCE YOU SHOULD NOT BE SETTING THESE VALUES MANUALLY
import {readFile} from "fs/promises"
const {version} = JSON.parse( //this should be major.minor
    await readFile("./package.json", "utf-8")
);

export async function handle() {
    const date = Date.now() //milliseconds since UNIX epoch in UTC
    let buildNum = "00000"
    let branch = process.env.CF_PAGES_BRANCH || "LOCAL"
    let commit = process.env.CF_PAGES_COMMIT_SHA || "0000000"
    if (process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_COMMIT_SHA) {// if deploying in cloudflare pages
        branch = "FAILED" // default to 'failed' instead of 'LOCAL'
        try {
            const res = await fetch(`https://${branch}.${process.env.VERSION_HANDLER_ROOT}/index.js`, {
                method: "GET",
                headers: {
                    "CF-Access-Client-ID": process.env.ACCESS_CLIENT_ID,
                    "CF-Access-Client-Secret": process.env.ACCESS_SERVICE_TOKEN
                }
            })
            const content = await res.text()
            const lines = content.split("\n")
            const match = lines[2].match(/\*\s+VERSION\s+(.*)/)[1] //third line, version string

            // remember: version is current, match is previous
            const previousBuild = {
                majorMinor: `${match.split(".")[0]}.${match.split(".")[1]}`,
                build: match.split(".")[2],
            }
            if (version === previousBuild.majorMinor) { //if major.minor is the same
                // increment build number by converting to int, adding 1, then converting back to string and padding with 0s
                buildNum = (parseInt(previousBuild.build) + 1).toString().padStart(5, "0")
            }
            return `${version}.${buildNum}.${branch}-${commit.substring(0,7)}.${date}`
        } catch (e) {
            console.error(e)
            return `${version}.${buildNum}.${branch}-${commit.substring(0,7)}.${date}`
        }

    } else {
        return `${version}.${buildNum}.LOCAL-0000000.${date}`
    }
}
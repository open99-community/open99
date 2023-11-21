import {config} from "dotenv"
config() //THIS SHOULDNT BE NECESSARY SINCE YOU SHOULD NOT BE SETTING THESE VALUES MANUALLY
import {readFile} from "fs/promises"
const {version} = JSON.parse( //this should be major.minor
    await readFile("./package.json", "utf-8")
);

export async function handle() {
    const date = Date.now() //milliseconds since UNIX epoch in UTC
    if (process.env.GLOBAL_BUILD) { //see README, this is set to true when building on cloudflare
        return `${version}.00000.${process.env.CF_PAGES_BRANCH}-${process.env.CF_PAGES_COMMIT_SHA.substring(0,7)}.${date}`
    } else {
        return `${version}.00000.LOCAL-0000000.${date}`
    }
}
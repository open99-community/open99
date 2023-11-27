import {config} from "dotenv"
config() //THIS SHOULDNT BE NECESSARY SINCE YOU SHOULD NOT BE SETTING THESE VALUES MANUALLY
import {readFile} from "fs/promises"
const {version} = JSON.parse( //this should be major.minor
    await readFile("./package.json", "utf-8")
);
import { Octokit } from "octokit"

export async function handle() {
    const date = Date.now() //milliseconds since UNIX epoch in UTC
    if (process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_COMMIT_SHA) { //if we are on cloudflare pages
        //@TODO: build number functionality
        const branch = process.env.CF_PAGES_BRANCH
        const commit = process.env.CF_PAGES_COMMIT_SHA

        const octokit = new Octokit({auth: process.env.GITHUB_TOKEN})

        const getPackageJsonVersion = async (repo, owner, commit) => {
            const { data: fileData } = await octokit.repos.getContent({
                owner,
                repo,
                path: 'package.json',
                ref: commit,
            });

            const fileContents = Buffer.from(fileData.content, 'base64').toString();
            const packageJsonContent = JSON.parse(fileContents);

            return packageJsonContent.version;
        };

        const {data: commits} = await octokit.repos.listCommits({
            repo: "pluto",
            owner: "use-pluto",
            sha: branch,
            per_page: 2,
        });

        const previousVersion = await getPackageJsonVersion("pluto", "use-pluto", commits[1].sha);
        const currentVersion = await getPackageJsonVersion("pluto", "use-pluto", commits[0].sha);



        return `${version}.00000.${branch}-${commit.substring(0,7)}.${date}`
    } else {
        return `${version}.00000.LOCAL-0000000.${date}`
    }
}
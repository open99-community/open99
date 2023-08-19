export type Permissions = "dummy1" | "dummy2" | "network"

/**
 * An App object
 */
export default interface App {
    /**
     * Friendly name of the app
     */
    name: string,
    /**
     * The ID of the app. Should be unique throughout the Pluto; we recommend the format "author.name".
     */
    id: string,
    /**
     * The version of the app. We recommend following Semantic Versioning (https://semver.org/).
     */
    version: string,
    /**
     * A description of the app. Currently unused.
     */
    description: string,
    /**
     * The permissions the app requires.
     */
    permissions: Permissions[],
    /**
     * Executes the app.
     */
    execute: (...args : string[]) => this
    /**
     * Executes the app asynchronously.
     * @param args
     */
    executeAsync: (...args : string[]) => Promise<this>
    /**
     * Uninstalls the app.
     */
    uninstall: () => void
}
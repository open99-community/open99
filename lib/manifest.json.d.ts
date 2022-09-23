type License = Array<"MIT", "GPL", "GNU">
type Categories = Array<"AudioVideo", "Audio", "Video", "Development", "Education", "Game", "Graphics", "Network", "Office", "Science", "Settings", "System", "Utility">
export type packageJSON = {
    /**
     * name of repository
     */
    "name": string,
    /**
     * author of repository. can be multiple people
     */
    "author": string,
    /**
     * Repo ID, must be unique among the repos installed on the system. cannot be open99.
     */
    "id": string,
    /**
     * Repository description. SUPPORTS MARKDOWN
     */
    "description": string,
    /**
     * Default license for all apps inside the repository. You can set this individually for each app if you'd like.
     */
    "license": License,
    /**
     * Array containing apps
     */
    "apps": {
            /**
             * Unique ID for app. Cannot include spaces or any alphanumeric characters except for the period, dash, and underscore.
             */
            "id": string,
            /**
             * Readable app name. Can include any characters
             */
            "name": string,
            /**
             * App description. Supports markdown
             */
            "description": string,
            /**
             * Categories for your app. Taken from https://specifications.freedesktop.org/menu-spec/latest/apa.html
             */
            "categories": Categories,
            /**
             * An array of unique aliases. These are like alternative IDs. They must be unique.
             */
            "alias": Array<string>,
            /**
             * Version number for app
             */
            "version": string,
            /**
             * Dependencies for your app. Should be formatted as repo/package
             * @beta
             */
            "depends": null, //Coming soon
            /**
             * Icon for your app. Different sizes coming soon
             */
            "icon": string,
            /**
             * Individual app license. Overrides repo license.
             */
            "license": License,
        }[]
    
}
/**
 * A user object. Users are stored in the local machine.
 */
export interface User {
    /**
     * The name of the user. Can contain spaces, etc.
     */
    name: string,
    /**
     * The ID of the user. Must be unique across the system.
     */
    id: string,
    /**
     * The home directory of the user.
     */
    home: string,
    /**
     * The icon of the user. Must be a valid path.
     */
    icon: string,
}

/**
 * An online user object. Online users are logged in with open99 cloud.
 */
export interface OnlineUser extends User {
    /**
     * The email of the authenticated user.
     */
    email: string,
    /**
     * The session token of the authenticated user.
     */
    session: string,
}
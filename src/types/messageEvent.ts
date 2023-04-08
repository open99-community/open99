/**
 * Represents a message being sent through the MessageChannel from the worker to the mainthread.
 */
export default interface MessageEvent {
    /**
     * Operation ID
     */
    op: string,
    /**
     * Arguments
     */
    args: {}[]
}
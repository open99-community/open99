/**
 * Represents a message being sent through the MessageChannel from the worker to the mainthread.
 */
export interface MessageData {
    /**
     * Operation ID
     */
    op: string,
    /**
     * Arguments
     */
    args: {}[]
}
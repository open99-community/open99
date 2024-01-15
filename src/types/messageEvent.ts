/**
 * Represents a message being sent through the MessageChannel from the worker to the mainthread.
 */
export interface MessageData {
    /**
     * Operation ID.
     * Some obfuscated ones are system app-only and are numbers
     */
    op: `${"fs" | "gui" | "REG"}.${string}` | "run" | number,
    /**
     * Arguments
     */
    args: any[]
}
export class KernelError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class FileNotFoundError extends Error {
    constructor(message: string) {
        super(message)
    }
}
export const ArgsAndEnv = (args: string[], env: { [key: string]: string }) => {
    return `const PLUTO_ARGS = ${JSON.stringify(args)};const PLUTO_ENV = ${JSON.stringify(env)};${process.env.NODE_ENV === "development" ? "/*APPLICATION EXECUTION CODE BEGINS WITHIN ASYNC*/" : ""}`
}
export const ArgsAndEnv = (args: string[], env: { [key: string]: string }) => {
    return `const PLUTO_ARGS = ${JSON.stringify(args)};const PLUTO_ENV = ${JSON.stringify(env)};`
}
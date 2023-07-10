export default interface AppInfo{
    name: string,
    version: string,
    description: string,
    permissions: {
        [key: string]: boolean
    }
}
const sys41 : {
    user: {
        apps: {
            short_name: string,
            name: string,
            action: (text:string, title:string) => void,
            categories: string[],
            system: boolean,
            permissions: string[],
            removeable: boolean,
        }[],
    },
    fs: {
        async get: (key) => string | Error
        async set: (key, value) => string | Error
        async delete: (key) => void | Error
        utils: {
            async config: () => string
            defaultDrive: RegExp
        }
    },
    dom: {
        boot: HTMLDivElement,
        desktop: HTMLDivElement,
        taskbar: HTMLDivElement
    },
    system: {
        boot: {}
    },
    settings: {},
    ui: {},
    Window: null
}
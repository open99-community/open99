export class BootEntry {
    el: HTMLParagraphElement
    constructor(public content: {text: string, features?: string[]}, bootscreen: HTMLElement) {
        const el = document.createElement("p")
        //console.log(content.text, ft)
        content.features?.forEach((feature) => {
            el.classList.add(feature)
        })

        el.innerHTML = content.text
        bootscreen.appendChild(el)
        this.el = el
    }

    update(text: string, features?: string[]) {
        try {
            this.el.innerHTML = text
            this.content.text = text
            this.content.features = features
            features?.forEach((feature) => {
                this.el.className = "" //clear features first
                this.el.classList.add(feature)
            })
        } catch (e) {
            throw new Error("Could not change boot entry content")
        }
        return this
    }

    // noinspection JSUnusedGlobalSymbols
    remove() {
        this.el.remove()
    }
}

export class Bootscreen {
    constructor(public el: HTMLElement) {}

    write(text: string, features?: string[]) {
        return new BootEntry({text, features}, this.el)
    }

    error(text: string) {
        const element = document.getElementById("bootscreen")
        if (!element) throw new Error("No bootscreen")
        return new BootEntry({text: text}, element)
    }
}

export type BootEntryWriteMethod = (text: string, features?: string[]) => BootEntry
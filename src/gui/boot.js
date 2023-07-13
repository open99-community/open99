class BootEntry {
    /**
     *
     * @param {{text: string, features: string[]}} content
     * @param {HTMLElement} bootscreen The Bootscreen instance this BootEntry should be appended to
     */
    constructor(content, bootscreen) {
        this.content = content
        let el = document.createElement("p")
        //console.log(content.text, ft)
        content.features?.forEach((feature) => {
            el.classList.add(feature)
        })

        el.innerHTML = content.text
        bootscreen.appendChild(el)
        this.el = el
    }

    update(content) {
        try {
            this.el.innerHTML = content.text
        } catch (e) {
            throw new Error("Could not change boot entry content")
        }
        return this
    }

    remove() {
        this.el.remove()
    }
}

export default class Bootscreen {
    constructor(el) {
        this.el = el
    }

    write(text, features) {
        return new BootEntry({text, features}, this.el)
    }

    error(text) {
        return new BootEntry({text: text})
    }
}
class BootEntry {
    /**
     * 
     * @param {{text: string, features: {error: boolean, color: string, success: boolean, warning: boolean}}} content 
     * @param {HTMLElement} bootscreen The Bootscreen instance this BootEntry should be appended to
     */
    constructor(content, bootscreen) {
        this.content = content
        let el = document.createElement("p")
        const ft = content.features
        //hacky but I don't want a bunch of if statements
        if (ft) {
            switch (true) {
                case ft.color:
                    el.style.color = ft.color
                    break
                case ft.error:
                    el.classList.add("error")
                    break
                case ft.success:
                    el.classList.add("success")
                    break
                case ft.warning:
                    el.classList.add("warning")
                    break
                case ft.blink:
                    el.classList.add("blink")
            }
        }

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
    write(content) {
        return new BootEntry(content, this.el)
    }
    error(text) {
        return new BootEntry({ text: text })
    }
}
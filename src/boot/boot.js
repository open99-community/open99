class BootEntry {
    constructor(content, bootscreen){
        let el = document.createElement("p")
        if(content.features.color){
            el.style.color = content.features.color
        }
        el.innerHTML = content.text
        bootscreen.appendChild(el)
    }
}

export default class Bootscreen {
    constructor(el){
        this.el = el
    }
    async write(content){
        return new BootEntry(content, this.el)
    }
}
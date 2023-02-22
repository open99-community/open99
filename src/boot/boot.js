class BootEntry {
    constructor(content, bootscreen){
        this.content = content
        let el = document.createElement("p")
        if(content.features.color){
            el.style.color = content.features.color
        }
        el.innerHTML = content.text
        bootscreen.appendChild(el)
        this.el = el
    }
    update(content){
        try{
            this.el.innerHTML = content.text
        } catch(e) {
            throw new Error("Could not change boot entry content")
        }
        return this
    }
    remove(){
        this.el.remove()
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
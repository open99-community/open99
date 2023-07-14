import {Component} from "../Component"

/**
 * A text component.
 */
export class Text extends Component {
    element: HTMLSpanElement
    parent: Component
    constructor(protected _text: string, component: Component) {
        const el = document.createElement("span")
        super(el)
        this.parent = component
        this.parent.element.appendChild(el)
        this.element = el
    }
    set text(value: string) {
        this._text = value
    }
    get text() {
        return this._text
    }
}
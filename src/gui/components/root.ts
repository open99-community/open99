import {Component} from "../Component"

/**
 * A root component.
 */
export class Root extends Component {
    element: HTMLDivElement
    constructor() {
        const el = document.createElement("div")
        const parent = document.body
        super(el)
        parent.appendChild(el)
        this.element = el
    }
}
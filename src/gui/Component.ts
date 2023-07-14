export class Component {
    constructor(element, attributes, subcomponents: Component[]) {
        this.element = element
        this.attributes = attributes
        this.subcomponents = subcomponents
    }
    update() {
        throw new Error("Not implemented")
    }
}
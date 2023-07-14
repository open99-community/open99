export class Component {
    constructor(public element: HTMLElement, public subcomponents?: Component[]) {}
    update() {
        throw new Error("Not implemented")
    }
}
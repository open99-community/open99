export function pointerlock() {
    document.addEventListener("click", () => {
        document.body.requestPointerLock()
    })
}
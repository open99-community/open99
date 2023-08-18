export async function pointerLock(): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            document.addEventListener("click", async () => {
                await document.body.requestPointerLock()
                resolve()
            })
        } catch(e) {
            reject(e)
        }
    })
}
export function* PIDBroker(): Generator<number> {
    for (let i = 1; ; i++) {
        yield i
    }
} //use with PIDBroker.next().value
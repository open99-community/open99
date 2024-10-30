export const ArgsAndEnv = (args: string[], env: { [key: string]: string }) => {
    return `const PLUTO_ARGS = ${JSON.stringify(args)};const PLUTO_ENV = ${JSON.stringify(env)};
    // Keep track of active intervals for cleanup
    self._activeIntervals = new Set();
    
    const originalSetInterval = self.setInterval;
    self.setInterval = function(...args) {
        const id = originalSetInterval.apply(this, args);
        self._activeIntervals.add(id);
        return id;
    };

    const originalClearInterval = self.clearInterval;
    self.clearInterval = function(id) {
        self._activeIntervals.delete(id);
        return originalClearInterval.call(this, id);  // Fixed: use call() and pass id as argument
    };`
}
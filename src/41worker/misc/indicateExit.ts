export function indicateExit() {
    return `
    // Check if there are any active timers or intervals
    const hasActiveTimers = () => {
        // Get the highest timeout/interval ID
        // This works because setTimeout/setInterval IDs are sequential integers
        const lastId = setTimeout(() => {}, 0);
        clearTimeout(lastId);
        
        // Check all IDs up to the last one
        for (let i = 1; i < lastId; i++) {
            if (typeof global !== 'undefined') {
                // Node.js environment
                if (global._active && global._active[i]) return true;
            } else {
                // Browser environment - clear and check if it existed
                if (clearTimeout(i)) return true;
                if (clearInterval(i)) return true;
            }
        }
        return false;
    };

    // Check if there are any registered event listeners
    const hasEventListeners = () => {
        // Since we can't directly check event listeners in a worker,
        // we'll use a flag that gets set when registering listeners
        return typeof self._hasEventListeners !== 'undefined' && self._hasEventListeners;
    };

    // Modify the worker's addEventListener to set our flag
    const originalAddEventListener = self.addEventListener;
    self.addEventListener = function(...args) {
        self._hasEventListeners = true;
        return originalAddEventListener.apply(this, args);
    };

    // Only indicate exit if we have no active timers or listeners
    if (!hasActiveTimers() && !hasEventListeners()) {
        postMessage([{op: 20}]);
    }`;
}
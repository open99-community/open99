// noinspection JSUnusedGlobalSymbols

class DevToolsDetector {
    config: {
    pollingIntervalSeconds: number;
    maxMillisBeforeAckWhenClosed: number;
    moreAnnoyingDebuggerStatements: number;
    onDetectOpen: ((isOpen?: boolean) => void) | undefined;
    onDetectClose: ((isOpen?: boolean) => void) | undefined;
    startup: "manual" | "asap" | "domContentLoaded";
    onCheckOpennessWhilePaused: "returnStaleValue" | "throw";
} = {
        pollingIntervalSeconds: 0.25,
        maxMillisBeforeAckWhenClosed: 100,
        moreAnnoyingDebuggerStatements: 1,
        onDetectOpen: undefined,
        onDetectClose: undefined,
        startup: "asap",
        onCheckOpennessWhilePaused: "returnStaleValue",
    }
    _isDevtoolsOpen = false;
    _isDetectorPaused = true;
    _resolveVerdict: ((verdict: boolean | null) => void) | undefined = undefined;
    nextPulse$: number | typeof NaN | ReturnType<typeof setTimeout> = NaN;
    heart = new Worker(URL.createObjectURL(new Blob([
        `"use strict";
onmessage = (ev) => { postMessage({isOpenBeat:true});
	debugger; for (let i = 0; i < ev.data.moreDebugs; i++) { debugger; }
	postMessage({isOpenBeat:false});
};`
    ], { type: "text/javascript" })));

    constructor() {
        // Seal config object
        Object.seal(this.config);

        switch (this.config.startup) {
            case "manual": break;
            case "asap": this.paused = false; break;
            case "domContentLoaded": {
                if (document.readyState !== "loading") {
                    this.paused = false;
                } else {
                    document.addEventListener("DOMContentLoaded", () => {
                        this.paused = false;
                    }, { once: true });
                }
                break;
            }
        }
    }

    onHeartMsg = (msg: {data: {isOpenBeat: boolean}}) => {
        if (msg.data.isOpenBeat) {
            let p = new Promise((_resolveVerdict) => {
                this._resolveVerdict = _resolveVerdict;
                let wait$: typeof NaN | ReturnType<typeof setTimeout> = setTimeout(
                    () => {
                                wait$ = NaN;
                                if (this._resolveVerdict) {
                                    this._resolveVerdict(true);
                                }
                            },
                    this.config.maxMillisBeforeAckWhenClosed + 1,
                );
            });
            p.then((verdict) => {
                if (verdict === null) return;
                if (verdict !== this._isDevtoolsOpen) {
                    this._isDevtoolsOpen = !!verdict;
                    const cb = { true: this.config.onDetectOpen, false: this.config.onDetectClose }[verdict + ""];
                    if (cb) cb();
                }
                this.nextPulse$ = setTimeout(
                    () => { this.nextPulse$ = NaN; this.doOnePulse(); },
                    this.config.pollingIntervalSeconds * 1000,
                );
            });
        } else {
            if (this._resolveVerdict) {
                this._resolveVerdict(false);
            }
        }
    }

    doOnePulse = () => {
        this.heart.postMessage({ moreDebugs: this.config.moreAnnoyingDebuggerStatements });
    }

    get isOpen() {
        if (this._isDetectorPaused && this.config.onCheckOpennessWhilePaused === "throw") {
            throw new Error("`onCheckOpennessWhilePaused` is set to `\"throw\"`.")
        }
        return this._isDevtoolsOpen;
    }

    get paused() { return this._isDetectorPaused; }

    set paused(pause) {
        if (this._isDetectorPaused === pause) { return; }
        this._isDetectorPaused = pause;
        if (pause) {
            this.heart.removeEventListener("message", this.onHeartMsg);
            clearTimeout(this.nextPulse$); this.nextPulse$ = NaN;
            if (this._resolveVerdict) {
                this._resolveVerdict(null);
            }
        } else {
            this.heart.addEventListener("message", this.onHeartMsg);
            this.doOnePulse();
        }
    }
}

export const monitorDevtools = () => {
    if (process.env.NODE_ENV !== "development") {
        const blocker = new DevToolsDetector()
        blocker.config.onDetectOpen = () => {
            alert("Do not use devtools.")
        }
    } else {
        // devtools isn't blocked in development
    }
}
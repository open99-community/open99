import ProgramRuntime from "./ProgramRuntime"
import {PIDBroker} from "./misc/PIDBroker";

const pidBroker = PIDBroker();

export class ProcessManager {
    private processes: Map<number, ProgramRuntime>;
    private static instance: ProcessManager;

    constructor() {
        this.processes = new Map();
    }

    public static getInstance(): ProcessManager {
        if (!ProcessManager.instance) {
            ProcessManager.instance = new ProcessManager()
        }
        return ProcessManager.instance
    }

    async createProcess(path: string, cmdLine: string, env: { [key: string]: string }) {
        const pid = pidBroker.next().value;
        const process = new ProgramRuntime(path, cmdLine, env);
        this.processes.set(pid, process);

        this.addStreamEventListener(pid, 20, () => {
            //console.log("SO HMMM PROCESS MANAGER JUST SAW THAT PROCESS ENDED")
            this.processes.delete(pid)
        })

        try {
            await process.exec();

            process.worker!.onerror = e => {
                console.error("[41worker:main] Worker error:", e)
                this.terminateProcess(pid)
            }

            return process;
        } catch (e) {
            this.terminateProcess(pid);
            throw e;
        }
    }

    getProcess(pid: number) {
        return this.processes.get(pid);
    }

    terminateProcess(pid: number): boolean {
        const process = this.processes.get(pid);
        if (!process) return false;

        process.terminate();
        return this.processes.delete(pid); //will almost always return true
    }

    getAllProcesses() {
        return Array.from(this.processes.values());
    }

    getProcessCount(): number {
        return this.processes.size;
    }

    async sendMessageToProcess(pid: number, message: any): Promise<any> {
        const process = this.processes.get(pid);
        if (!process) {
            throw new Error(`No process found with PID: ${pid}`);
        }
        return process.postMessage(message);
    }

    addStreamEventListener(pid: number, eventName: string | number, callback: (data: any) => void): void {
        const process = this.processes.get(pid);
        if (!process) {
            throw new Error(`No process found with PID: ${pid}`);
        }
        process.addStreamEventListener(eventName, callback);
    }

    removeStreamEventListener(pid: number, eventName: string | number, callback: (data: any) => void): void {
        const process = this.processes.get(pid);
        if (!process) {
            throw new Error(`No process found with PID: ${pid}`);
        }
        process.removeStreamEventListener(eventName, callback);
    }
}
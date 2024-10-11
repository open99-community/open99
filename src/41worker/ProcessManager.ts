import ProgramRuntime from "./ProgramRuntime"
import {PIDBroker} from "./misc/PIDBroker";

const pidBroker = PIDBroker();

export class ProcessManager {
    private processes: Map<number, ProgramRuntime>;

    constructor() {
        this.processes = new Map();
    }

    async createProcess(path: string, cmdLine: string, env: { [key: string]: string }) {
        const pid = pidBroker.next().value;
        const process = new ProgramRuntime(path, cmdLine, env);
        this.processes.set(pid, process);

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
        return process.postMessageToWorker(message);
    }

    addStreamEventListener(pid: number, eventName: string, callback: (data: any) => void): void {
        const process = this.processes.get(pid);
        if (!process) {
            throw new Error(`No process found with PID: ${pid}`);
        }
        process.addStreamEventListener(eventName, callback);
    }

    removeStreamEventListener(pid: number, eventName: string, callback: (data: any) => void): void {
        const process = this.processes.get(pid);
        if (!process) {
            throw new Error(`No process found with PID: ${pid}`);
        }
        process.removeStreamEventListener(eventName, callback);
    }
}
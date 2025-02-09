import { RAMDriver } from "./drivers/ram";
import { IDBDriver } from "./drivers/idb";
import { DriveLetters, driveLetter, FileContentTypes, FileMetadataType } from "../types/fs";

export let drives: Drive[] = [];

export class Drive {
    UUID: string;
    driver: string;
    driverInstance: RAMDriver | IDBDriver | undefined;
    driveLetter: string & driveLetter;

    constructor(driver: string) {
        this.UUID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.driver = driver;
        this.driveLetter = this.assignDriveLetter();
        if (this.checkValidity() === 1) {
            throw new Error("Invalid drive letter");
        }
    }

    static getByDriveLetter(driveLetter: driveLetter): Drive | undefined {
        return drives.find(drive => drive.driveLetter.toUpperCase() === driveLetter);
    }

    static getByID(id: string): Drive | undefined {
        return drives.find(drive => drive.UUID === id);
    }

    async mount(): Promise<this> {
        if (this.checkValidity() === 1) {
            throw new Error("Invalid drive letter");
        }

        let driverInstance;
        switch (this.driver.toLowerCase()) {
            case "ram":
                driverInstance = new RAMDriver();
                await driverInstance.init(this);
                break;
            case "idb":
                driverInstance = new IDBDriver();
                await driverInstance.init(this);
                break;
            default:
                throw new Error("Driver not found");
        }
        this.driverInstance = driverInstance;
        drives.push(this);
        return this;
    }

    async unmount(): Promise<void> {
        const index = drives.findIndex(drive => drive.UUID === this.UUID);
        if (index !== -1) {
            drives.splice(index, 1);
        }
    }

    assignDriveLetter(provided?: driveLetter): driveLetter {
        if (provided) {
            if (DriveLetters.includes(provided)) {
                this.driveLetter = provided;
                return provided;
            }
            throw new Error("Invalid drive letter");
        }
        for (const letter of DriveLetters) {
            if (!drives.some(drive => drive.driveLetter === letter)) {
                this.driveLetter = letter;
                return letter;
            }
        }
        throw new Error("No available drive letters");
    }

    checkValidity(): number {
        if (!DriveLetters.includes(this.driveLetter)) {
            return 1;
        }
        return 0;
    }
}

export interface FileMetadata {
    size: number;
    created: Date;
    modified: Date;
    attributes: {
        readOnly: boolean;
        hidden: boolean;
        system: boolean;
        archive: boolean;
    };
    permissions: {
        owner: string;
        group: string;
        others: string;
    };
}
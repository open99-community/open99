import {RAMDriver} from "./ram";
import {DriveLetters, driveLetter} from "../../types/fs";

export let drives: Drive[] = [];

export class Drive {
    driver: string;
    driverInstance: RAMDriver | undefined;
    driveLetter: string & driveLetter;
    constructor(driver: string, driveLetter: driveLetter) {
        this.driver = driver;
        this.driveLetter = driveLetter;
        if (this.checkValidity() === 1) {
            throw new Error("Invalid drive letter")
        }
    }
    static getByDriveLetter(driveLetter: driveLetter): Drive | undefined {
        return drives.find(drive => drive.driveLetter.toUpperCase() === driveLetter)
    }
    async mount(): Promise<this> {
        if (this.checkValidity() === 1) {
            throw new Error("Invalid drive letter")
        }

        let driverInstance;
        switch (this.driver.toLowerCase()) {
            case "ram":
                driverInstance = new RAMDriver()
                await driverInstance.init()
                break;
            default:
                throw new Error("Driver not found")
        }
        this.driverInstance = driverInstance
        drives.push(this)
        return this;
    }

    checkValidity(): number {
        if (!DriveLetters.includes(this.driveLetter)) {
            return 1
        }
        return 0
    }
}
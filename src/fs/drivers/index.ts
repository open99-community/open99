import {RAMDriver} from "./ram";

export let drives: Drive[] = [];

export class Drive {
    driver: string;
    driverInstance: RAMDriver | undefined;
    driveLetter: string;
    constructor(driver: string, driveLetter: string) {
        this.driver = driver;
        this.driveLetter = driveLetter;
    }
    static getByDriveLetter(driveLetter: string): Drive | undefined {
        return drives.find(drive => drive.driveLetter === driveLetter)
    }
    async mount(): Promise<this> {
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
}
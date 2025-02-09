import {rmSync} from 'fs';

console.log("Initiating build")
rmSync("../../dist", { recursive: true, force: true });
// noinspection JSUnusedGlobalSymbols
export const PathParser = (path: string): [string, string] => {
    //this parses something like "C:/Something/test.txt" into ["C", "\\Something\\test.txt"]
    //this parses something like "C:\Something\test.txt" into ["C", "\\Something\\test.txt"]

    // Split the path using a regular expression for forward slash (/) or backslash (\)
    const pathArray = path.split(/\\|\//g);

    // Extract the drive letter (assuming single character)
    const drive = pathArray[0].slice(0, 1);

    // Check if the drive has a colon at the end
    if (drive.endsWith(':')) {
        // Remove the colon from the drive
        const driveWithoutColon = drive.slice(0, -1);
        return [driveWithoutColon, pathArray.slice(1).join("\\")];
    } else {
        // No colon found, return with original drive
        return [drive, "\\" + pathArray.slice(1).join("\\")];
    }
}
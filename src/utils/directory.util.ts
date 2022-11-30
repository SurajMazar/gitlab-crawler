import fs from 'fs'
import path from 'path'

/**
 * MAKE DIRECTORY IF IT DOESNOT EXIST INSIDE CURRENT WORKING DIRECTORY FROM THE TERMINAL
 * @param directory 
 */
export const makeDir = (directory:string) => {
    const dir = path.join(process.cwd(),directory)
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    return dir
}
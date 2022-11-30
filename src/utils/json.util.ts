import { exitWithErrorMessage, successLog } from "./logger.util"
import fs from 'fs'

/**
 * PARSE JSON FILE
 * @param path 
 * @returns 
 */
export const parseJsonFile = (path:string) => {
    try{
        const fileContent = fs.readFileSync(path)
        return JSON.parse(fileContent.toString());
    }catch(exception){
        exitWithErrorMessage(JSON.stringify(exception))
    }
}


/**
 * SAVE FILE
 */
export const saveJsonFile =   (path:string,content:any) => {
    try{
       fs.writeFileSync(path,content)
       successLog('Config has been updated')
    }catch(exception){
        exitWithErrorMessage(JSON.stringify(exception))
    }
}
import path from "path"
import { availableCommands, configCommands } from "../constants/commands"
import flags from "../constants/flags"
import { APP_CONFIG_LOCATION } from "../constants/locations"
import { parseJsonFile } from "./json.util"
import { exitWithErrorMessage, successLog } from "./logger.util"


/**
 * CONFIG FILE PATH
 */
 const CONFILE_FILE_PATH =  path.join(__dirname,'../../', APP_CONFIG_LOCATION)


/**
 * GET COMMAND
 * @returns 
 */
export const formattedCommand = () => {
    const command = process.argv[2]
    
    if(command){
        return command.split(":")
    }

    successLog("helper text")
    process.exit(1)
}


/**
 * IS VALID COMMAND
 * @param command 
 * @returns 
 */
export const isValidCommand = () => {
    const command = formattedCommand();
    return availableCommands.includes(command[0])
}


/**
 * GET CONFIG VAIRABLES
 * @param key 
 * @returns 
 */
export const getConfig = (key:string) => {
    const config = parseJsonFile(CONFILE_FILE_PATH)
    return config[key]
}

/**
 * GET SEARCH TERM FROM PARAMETER
 * @returns 
 */
export const getSearch = () => {
    const args =  process.argv
    const search = args.find(arg => arg.includes(flags.search))
    if(search){

        const searchArgs = search.split('=')

        if(searchArgs[1]){
            return searchArgs[1]
        }else{
            exitWithErrorMessage("Enter a search term")
        }

    }
}
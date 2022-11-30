import path from "path"
import { configCommands } from "../constants/commands"
import { APP_CONFIG_LOCATION } from "../constants/locations"
import { formattedCommand } from "../utils/helper.util"
import { parseJsonFile, saveJsonFile } from "../utils/json.util"
import { exitWithErrorMessage, successLog } from "../utils/logger.util"


/**
 * CONFIG FILE PATH
 */
const CONFILE_FILE_PATH =  path.join(__dirname,'../../', APP_CONFIG_LOCATION)

/**
 * 
 * @returns 
 */
export const getConfigCommand = () => {
    const command = formattedCommand()
    
    if(command){
        const [config, configCommand] = command
        if((config === 'config') && configCommands.includes(configCommand)){
            return configCommand
        }
    }
    return false
}


/**
 * 
 */
const getConfigValue = () => {
    const value = process.argv[3]
    if(!value){
        exitWithErrorMessage('Enter a value for the config')
    }
    return value
}


/**
 * 
 * @param command 
 */
const setConfig = (command:string) => {
    const configJson = parseJsonFile(CONFILE_FILE_PATH)
    const value = getConfigValue()
    if(command === 'url'){
        configJson.GITLAB_HOST = value
    }else {
        configJson.PERSONAL_ACCESS_TOKEN = value
    }
    saveJsonFile(CONFILE_FILE_PATH,JSON.stringify(configJson))
}


/**
 * SHOW CONFIG VALUES
 */
const showCofig = () => {
    const config = parseJsonFile(CONFILE_FILE_PATH)
successLog(
`GITLAB_HOST : ${config.GITLAB_HOST}
 PERSONAL_ACCESS_TOKEN : ${config.PERSONAL_ACCESS_TOKEN} `)

}

/**
 * EXECUTE CONFIG COMMAND
 * @returns 
 */
export const runConfig = ()=>{
    const command = getConfigCommand()
    
    if(command){
        if(command !== 'show'){
            setConfig(command)
            return
        }

        showCofig()
        return
    }
    exitWithErrorMessage("Invalid config command")
}





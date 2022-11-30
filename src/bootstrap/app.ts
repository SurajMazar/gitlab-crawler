
import { getConfigCommand, runConfig } from "../command/config";
import { importProject } from "../command/import";
import { isValidCommand } from "../utils/helper.util";
import { get } from "../utils/http.util";
import { exitWithErrorMessage, successLog, warningLog } from "../utils/logger.util";

/**
 * APPLICATION BOOT
 */
export const app = async() => {
    if(isValidCommand()){
        if(getConfigCommand()){
            await runConfig()
            return
        }
    
        /**
         * IMPORT PROJECT FORM GITLAB
         */
        await importProject()
    }else{
        exitWithErrorMessage('Invalid Command')
    }
}

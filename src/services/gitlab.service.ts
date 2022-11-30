import { exec, execSync } from "child_process"
import { getSearch } from "../utils/helper.util"
import { download, get } from "../utils/http.util"
import { exitWithErrorMessage, successLog } from "../utils/logger.util"
const { createSpinner } = require("nanospinner")

/**
 * FETCH GITLAB PROJECTS
 * @returns 
 */
export const fetchProject = async () => {
    const spinner = createSpinner('Listing projects').start()
    try {
        const search = getSearch()
        
        let url = '/api/v4/projects?per_page=100';

        if(search){
            url = `/api/v4/projects?per_page=100&search=${search}`
        }

        const value = await get(url)
        return value as Array<any>
    } catch (exception) {
        exitWithErrorMessage(exception)
    } finally {
        spinner.success()
    }
}

/**
 * DOWNLOAD GIT PROJECT
 * @param projectDetail 
 */
export const downloadProject = async (projectDetail: {
    name: string,
    slug: string,
    projectId: string
}) => {
    const spinner = createSpinner('Cloning.... ').start()
    try{
        await execSync(`git clone ${projectDetail.projectId}`)
        successLog(`${projectDetail.name} has been cloned!`)
    }catch(e){
        exitWithErrorMessage(e)
    }finally{
        spinner.success()
    }
}

export const cloneProject = () => {

}



import { downloadProject, fetchProject } from "../services/gitlab.service"
import inquirer from 'inquirer'
import slug from 'slug'
import { successLog, warningLog } from "../utils/logger.util"

/**
 * IMPORT PROJECTS
 */
export const importProject = async () => {
    const projects = await fetchProject()
    /**
     * SELECT OPTIONS FOR INQUIRY
     */
    const selectOptions = prepareProjectData(projects)

    if(selectOptions.length == 0){
        warningLog('Sorry no projects found!')
        process.exit(1)
    }

    /**
     * ASK USER TO SELECT PROJECT TO CURL
     */
    const answer = await inquireProjects(selectOptions)

    /**
     * FORMAT PROJECT FOR CURL
     */
    const projectsTocurl = prepareSelectedProjectForCurl(answer)

    

    /**
     * CLONE ALLL PROJECT
     */
    for(let i = 0; i<projectsTocurl.length;i++){
        await downloadProject(projectsTocurl[i])
    }

    successLog("All projects has been cloned")
    process.exit(1)
}

/**
 * 
 * @param options 
 */
const inquireProjects = async (options) => {
    
       const question =  await inquirer.prompt([
            {
                type:"checkbox",
                name:'project_ids',
                message:"Select projects that you want to clone?",
                choices:options
            }
        ])

        return question.project_ids

}

/**
 * 
 * @param array 
 */
const prepareProjectData = (array) => {
    return array.map(item=>{
        const {name,ssh_url_to_repo} = item
        return ` ${name} pid:${ssh_url_to_repo}`
    })
}


/**
 * 
 * @param projectId 
 */
const prepareSelectedProjectForCurl = (projectIds:Array<string>) => {
    return projectIds.map(item=>{
        const projectDetail = item.split("pid:")
        return {
            name:projectDetail[0].trim(),
            slug:slug(projectDetail[0].trim()),
            projectId:projectDetail[1]
        }
    })
}
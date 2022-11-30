"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importProject = void 0;
const gitlab_service_1 = require("../services/gitlab.service");
const inquirer_1 = __importDefault(require("inquirer"));
const slug_1 = __importDefault(require("slug"));
const logger_util_1 = require("../utils/logger.util");
/**
 * IMPORT PROJECTS
 */
const importProject = async () => {
    const projects = await (0, gitlab_service_1.fetchProject)();
    /**
     * SELECT OPTIONS FOR INQUIRY
     */
    const selectOptions = prepareProjectData(projects);
    if (selectOptions.length == 0) {
        (0, logger_util_1.warningLog)('Sorry no projects found!');
        process.exit(1);
    }
    /**
     * ASK USER TO SELECT PROJECT TO CURL
     */
    const answer = await inquireProjects(selectOptions);
    /**
     * FORMAT PROJECT FOR CURL
     */
    const projectsTocurl = prepareSelectedProjectForCurl(answer);
    /**
     * CLONE ALLL PROJECT
     */
    for (let i = 0; i < projectsTocurl.length; i++) {
        await (0, gitlab_service_1.downloadProject)(projectsTocurl[i]);
    }
    (0, logger_util_1.successLog)("All projects has been cloned");
    process.exit(1);
};
exports.importProject = importProject;
/**
 *
 * @param options
 */
const inquireProjects = async (options) => {
    const question = await inquirer_1.default.prompt([
        {
            type: "checkbox",
            name: 'project_ids',
            message: "Select projects that you want to clone?",
            choices: options
        }
    ]);
    return question.project_ids;
};
/**
 *
 * @param array
 */
const prepareProjectData = (array) => {
    return array.map(item => {
        const { name, ssh_url_to_repo } = item;
        return ` ${name} pid:${ssh_url_to_repo}`;
    });
};
/**
 *
 * @param projectId
 */
const prepareSelectedProjectForCurl = (projectIds) => {
    return projectIds.map(item => {
        const projectDetail = item.split("pid:");
        return {
            name: projectDetail[0].trim(),
            slug: (0, slug_1.default)(projectDetail[0].trim()),
            projectId: projectDetail[1]
        };
    });
};

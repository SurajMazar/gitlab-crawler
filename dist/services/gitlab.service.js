"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneProject = exports.downloadProject = exports.fetchProject = void 0;
const child_process_1 = require("child_process");
const helper_util_1 = require("../utils/helper.util");
const http_util_1 = require("../utils/http.util");
const logger_util_1 = require("../utils/logger.util");
const { createSpinner } = require("nanospinner");
/**
 * FETCH GITLAB PROJECTS
 * @returns
 */
const fetchProject = async () => {
    const spinner = createSpinner('Listing projects').start();
    try {
        const search = (0, helper_util_1.getSearch)();
        let url = '/api/v4/projects?per_page=100';
        if (search) {
            url = `/api/v4/projects?per_page=100&search=${search}`;
        }
        const value = await (0, http_util_1.get)(url);
        return value;
    }
    catch (exception) {
        (0, logger_util_1.exitWithErrorMessage)(exception);
    }
    finally {
        spinner.success();
    }
};
exports.fetchProject = fetchProject;
/**
 * DOWNLOAD GIT PROJECT
 * @param projectDetail
 */
const downloadProject = async (projectDetail) => {
    const spinner = createSpinner('Cloning.... ').start();
    try {
        await (0, child_process_1.execSync)(`git clone ${projectDetail.projectId}`);
        (0, logger_util_1.successLog)(`${projectDetail.name} has been cloned!`);
    }
    catch (e) {
        (0, logger_util_1.exitWithErrorMessage)(e);
    }
    finally {
        spinner.success();
    }
};
exports.downloadProject = downloadProject;
const cloneProject = () => {
};
exports.cloneProject = cloneProject;

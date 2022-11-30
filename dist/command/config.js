"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runConfig = exports.getConfigCommand = void 0;
const path_1 = __importDefault(require("path"));
const commands_1 = require("../constants/commands");
const locations_1 = require("../constants/locations");
const helper_util_1 = require("../utils/helper.util");
const json_util_1 = require("../utils/json.util");
const logger_util_1 = require("../utils/logger.util");
/**
 * CONFIG FILE PATH
 */
const CONFILE_FILE_PATH = path_1.default.join(__dirname, '../../', locations_1.APP_CONFIG_LOCATION);
/**
 *
 * @returns
 */
const getConfigCommand = () => {
    const command = (0, helper_util_1.formattedCommand)();
    if (command) {
        const [config, configCommand] = command;
        if ((config === 'config') && commands_1.configCommands.includes(configCommand)) {
            return configCommand;
        }
    }
    return false;
};
exports.getConfigCommand = getConfigCommand;
/**
 *
 */
const getConfigValue = () => {
    const value = process.argv[3];
    if (!value) {
        (0, logger_util_1.exitWithErrorMessage)('Enter a value for the config');
    }
    return value;
};
/**
 *
 * @param command
 */
const setConfig = (command) => {
    const configJson = (0, json_util_1.parseJsonFile)(CONFILE_FILE_PATH);
    const value = getConfigValue();
    if (command === 'url') {
        configJson.GITLAB_HOST = value;
    }
    else {
        configJson.PERSONAL_ACCESS_TOKEN = value;
    }
    (0, json_util_1.saveJsonFile)(CONFILE_FILE_PATH, JSON.stringify(configJson));
};
/**
 * SHOW CONFIG VALUES
 */
const showCofig = () => {
    const config = (0, json_util_1.parseJsonFile)(CONFILE_FILE_PATH);
    (0, logger_util_1.successLog)(`GITLAB_HOST : ${config.GITLAB_HOST}
 PERSONAL_ACCESS_TOKEN : ${config.PERSONAL_ACCESS_TOKEN} `);
};
/**
 * EXECUTE CONFIG COMMAND
 * @returns
 */
const runConfig = () => {
    const command = (0, exports.getConfigCommand)();
    if (command) {
        if (command !== 'show') {
            setConfig(command);
            return;
        }
        showCofig();
        return;
    }
    (0, logger_util_1.exitWithErrorMessage)("Invalid config command");
};
exports.runConfig = runConfig;

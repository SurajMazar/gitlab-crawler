"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearch = exports.getConfig = exports.isValidCommand = exports.formattedCommand = void 0;
const path_1 = __importDefault(require("path"));
const commands_1 = require("../constants/commands");
const flags_1 = __importDefault(require("../constants/flags"));
const locations_1 = require("../constants/locations");
const json_util_1 = require("./json.util");
const logger_util_1 = require("./logger.util");
/**
 * CONFIG FILE PATH
 */
const CONFILE_FILE_PATH = path_1.default.join(__dirname, '../../', locations_1.APP_CONFIG_LOCATION);
/**
 * GET COMMAND
 * @returns
 */
const formattedCommand = () => {
    const command = process.argv[2];
    if (command) {
        return command.split(":");
    }
    (0, logger_util_1.successLog)("helper text");
    process.exit(1);
};
exports.formattedCommand = formattedCommand;
/**
 * IS VALID COMMAND
 * @param command
 * @returns
 */
const isValidCommand = () => {
    const command = (0, exports.formattedCommand)();
    return commands_1.availableCommands.includes(command[0]);
};
exports.isValidCommand = isValidCommand;
/**
 * GET CONFIG VAIRABLES
 * @param key
 * @returns
 */
const getConfig = (key) => {
    const config = (0, json_util_1.parseJsonFile)(CONFILE_FILE_PATH);
    return config[key];
};
exports.getConfig = getConfig;
/**
 * GET SEARCH TERM FROM PARAMETER
 * @returns
 */
const getSearch = () => {
    const args = process.argv;
    const search = args.find(arg => arg.includes(flags_1.default.search));
    if (search) {
        const searchArgs = search.split('=');
        if (searchArgs[1]) {
            return searchArgs[1];
        }
        else {
            (0, logger_util_1.exitWithErrorMessage)("Enter a search term");
        }
    }
};
exports.getSearch = getSearch;

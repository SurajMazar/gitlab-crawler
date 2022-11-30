"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveJsonFile = exports.parseJsonFile = void 0;
const logger_util_1 = require("./logger.util");
const fs_1 = __importDefault(require("fs"));
/**
 * PARSE JSON FILE
 * @param path
 * @returns
 */
const parseJsonFile = (path) => {
    try {
        const fileContent = fs_1.default.readFileSync(path);
        return JSON.parse(fileContent.toString());
    }
    catch (exception) {
        (0, logger_util_1.exitWithErrorMessage)(JSON.stringify(exception));
    }
};
exports.parseJsonFile = parseJsonFile;
/**
 * SAVE FILE
 */
const saveJsonFile = (path, content) => {
    try {
        fs_1.default.writeFileSync(path, content);
        (0, logger_util_1.successLog)('Config has been updated');
    }
    catch (exception) {
        (0, logger_util_1.exitWithErrorMessage)(JSON.stringify(exception));
    }
};
exports.saveJsonFile = saveJsonFile;

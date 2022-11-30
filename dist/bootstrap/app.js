"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const config_1 = require("../command/config");
const import_1 = require("../command/import");
const helper_util_1 = require("../utils/helper.util");
const logger_util_1 = require("../utils/logger.util");
/**
 * APPLICATION BOOT
 */
const app = async () => {
    if ((0, helper_util_1.isValidCommand)()) {
        if ((0, config_1.getConfigCommand)()) {
            await (0, config_1.runConfig)();
            return;
        }
        /**
         * IMPORT PROJECT FORM GITLAB
         */
        await (0, import_1.importProject)();
    }
    else {
        (0, logger_util_1.exitWithErrorMessage)('Invalid Command');
    }
};
exports.app = app;

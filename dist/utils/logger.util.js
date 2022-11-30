"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exitWithErrorMessage = exports.errorLog = exports.warningLog = exports.successLog = void 0;
/**
 * SUCCESS LOG
 * @param {*} message
 */
const successLog = (message) => {
    console.log('\x1b[32m', message);
};
exports.successLog = successLog;
/**
 * WARNING LOG
 * @param {*} message
 */
const warningLog = (message) => {
    console.log('\x1b[33m', message);
};
exports.warningLog = warningLog;
/**
 * ERROR LOG
 * @param {*} message
 */
const errorLog = (message) => {
    console.log('\x1b[31m', message);
};
exports.errorLog = errorLog;
/**
 * EXIT WITH MESSAGE
 * @param message
 */
const exitWithErrorMessage = (message) => {
    console.log('\x1b[31m', message);
    return process.exit(1);
};
exports.exitWithErrorMessage = exitWithErrorMessage;

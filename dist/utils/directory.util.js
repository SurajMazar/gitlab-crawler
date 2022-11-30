"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * MAKE DIRECTORY IF IT DOESNOT EXIST INSIDE CURRENT WORKING DIRECTORY FROM THE TERMINAL
 * @param directory
 */
const makeDir = (directory) => {
    const dir = path_1.default.join(process.cwd(), directory);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    return dir;
};
exports.makeDir = makeDir;

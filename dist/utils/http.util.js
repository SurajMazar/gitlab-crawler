"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.get = void 0;
const https_1 = __importDefault(require("https"));
const helper_util_1 = require("./helper.util");
const path_1 = __importDefault(require("path"));
const directory_util_1 = require("./directory.util");
const fs_1 = __importDefault(require("fs"));
/**
 * CURL GET REQUEST
 * @param url
 * @returns
 */
const get = async (url) => {
    return new Promise((resolve, reject) => {
        /**
         * REQUEST OPTIONS
         */
        const options = {
            host: (0, helper_util_1.getConfig)('GITLAB_HOST'),
            path: url,
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "PRIVATE-TOKEN": (0, helper_util_1.getConfig)('PERSONAL_ACCESS_TOKEN')
            }
        };
        const req = https_1.default.request(options, function (res) {
            const body = [];
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', function () {
                try {
                    resolve(JSON.parse(body.join('')));
                }
                catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', function (e) {
            reject(e.message);
        });
        // write data to request body
        req.write('data\n');
        req.write('data\n');
        req.end();
    });
};
exports.get = get;
/**
 *
 * @param url
 * @param directory
 * @param filename
 * @returns
 */
const download = async (url, directory, filename) => {
    return new Promise((resolve, reject) => {
        /** FILE PATH WHERE DATA IS TO BE SAVED */
        const filePath = path_1.default.join((0, directory_util_1.makeDir)(directory), filename);
        const file = fs_1.default.createWriteStream(filePath);
        https_1.default.request({
            host: (0, helper_util_1.getConfig)('GITLAB_HOST'),
            path: url,
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/gzip",
                "PRIVATE-TOKEN": (0, helper_util_1.getConfig)('PERSONAL_ACCESS_TOKEN')
            }
        }, function (response) {
            response.pipe(file);
            // after download completed close filestream
            file.on("finish", () => {
                file.close();
                resolve(filePath);
            });
        });
    });
};
exports.download = download;

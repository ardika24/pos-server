"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
const success = function (payload, message, res) {
    const datas = {
        success: true,
        statusCode: res.statusCode,
        message,
        payload,
    };
    res.json(datas);
    res.end();
};
exports.success = success;
const error = function (message, uri, statusCode, res) {
    const data = {
        success: false,
        statusCode: statusCode,
        error: {
            message,
            uri,
        },
    };
    res.json(data);
    res.end();
};
exports.error = error;

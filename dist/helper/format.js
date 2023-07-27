"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, code, message) => {
    return res.send({
        code,
        success: true,
        message,
        data,
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, errorMessage, code, error = {}) => {
    return res.status(code).json({
        code,
        errorMessage,
        error,
        data: null,
        success: false,
    });
};
exports.errorResponse = errorResponse;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidation = exports.addBlogValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const addBlogValidation = (data) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(3).max(200).trim(true).required(),
        content: joi_1.default.string().min(3).trim(true).required(),
        author: joi_1.default.string().trim(true).required(),
        tags: joi_1.default.string().default([])
    });
    return schema.validate(data);
};
exports.addBlogValidation = addBlogValidation;
const updateBlogValidation = (data) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(3).max(200).trim(true),
        content: joi_1.default.string().min(3).trim(true),
        author: joi_1.default.string().trim(true),
        tags: joi_1.default.string().default([])
    });
    return schema.validate(data);
};
exports.updateBlogValidation = updateBlogValidation;

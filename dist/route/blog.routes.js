"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_model_1 = __importDefault(require("../model/blog.model"));
const format_1 = require("../helper/format");
const imageUpload_1 = require("../helper/imageUpload");
const blog_validation_1 = require("../helper/blog.validation");
const router = express_1.default.Router();
// get all  blogs
router.get('/blogs', async (req, res) => {
    try {
        const blogs = await blog_model_1.default.find();
        return (0, format_1.successResponse)(res, blogs, 200, 'blogs fetched successfully');
    }
    catch (error) {
        console.log(error.message);
        return (0, format_1.errorResponse)(res, "something went wrong", 500, error.message);
    }
});
// get a single blog by ID
router.get('/blogs/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await blog_model_1.default.findById(id);
        if (!blog) {
            return (0, format_1.errorResponse)(res, "blog not found", 404);
        }
        else {
            return (0, format_1.successResponse)(res, blog, 200, 'blog fetched successfully');
        }
    }
    catch (error) {
        console.log(error.message);
        return (0, format_1.errorResponse)(res, "something went wrong", 500, error.message);
    }
});
// create a new blog
router.post('/blogs', imageUpload_1.upload.single('image'), async (req, res) => {
    var _a;
    const { error } = (0, blog_validation_1.addBlogValidation)(req.body);
    if (error) {
        return (0, format_1.errorResponse)(res, "input data in proper format", 406);
    }
    const { title, content, author, tags } = req.body;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    try {
        const newBlog = await blog_model_1.default.create({
            title,
            content,
            image,
            author,
            tags,
        });
        return (0, format_1.successResponse)(res, newBlog, 200, 'blog added successfully');
    }
    catch (error) {
        console.log(error.message);
        return (0, format_1.errorResponse)(res, "something went wrong", 500, error.message);
    }
});
// update a blog by ID
router.put('/blogs/:id', imageUpload_1.upload.single('image'), async (req, res) => {
    var _a;
    const { error } = (0, blog_validation_1.updateBlogValidation)(req.body);
    if (error) {
        return (0, format_1.errorResponse)(res, "data is not in proper format", 406);
    }
    const id = req.params.id;
    const { title, content, author, tags } = req.body;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    try {
        const updatedBlog = await blog_model_1.default.findByIdAndUpdate(id, {
            title,
            content,
            image,
            author,
            tags,
        }, { new: true });
        if (!updatedBlog) {
            return (0, format_1.errorResponse)(res, "blog not found", 404);
        }
        else {
            return (0, format_1.successResponse)(res, updatedBlog, 200, 'blog updated successfully');
        }
    }
    catch (error) {
        console.log(error.message);
        return (0, format_1.errorResponse)(res, "something went wrong", 500, error.message);
    }
});
// delete a blog by ID
router.delete('/blogs/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedBlog = await blog_model_1.default.findByIdAndDelete(id);
        if (!deletedBlog) {
            return (0, format_1.errorResponse)(res, "blog not found", 404);
        }
        else {
            return (0, format_1.successResponse)(res, deletedBlog, 200, 'blog deleted successfully');
        }
    }
    catch (error) {
        console.log(error.message);
        return (0, format_1.errorResponse)(res, "something went wrong", 500, error.message);
    }
});
exports.default = router;

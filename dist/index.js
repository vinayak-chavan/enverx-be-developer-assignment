"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDB_1 = require("./db/connectDB");
const blog_routes_1 = __importDefault(require("./route/blog.routes"));
const app = (0, express_1.default)();
const PORT = 3001;
(0, connectDB_1.connectDB)();
app.use(express_1.default.json());
app.use('/', blog_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

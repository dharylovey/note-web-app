"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgotPassword_1 = require("../controllers/auth/forgotPassword");
const login_1 = require("../controllers/auth/login");
const register_1 = require("../controllers/auth/register");
const express_1 = __importDefault(require("express"));
const authRoutes = express_1.default.Router();
authRoutes.post("/login", login_1.login);
authRoutes.post("/register", register_1.register);
authRoutes.post("/forgot-password", forgotPassword_1.forgotPassword);
exports.default = authRoutes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationCode = exports.resetPasswordTokenExpires = exports.generateCryptoToken = exports.generateTokenSetCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const generateTokenSetCookie = async (res, userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("note_web_app_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 1day
    });
    return token;
};
exports.generateTokenSetCookie = generateTokenSetCookie;
const generateCryptoToken = async () => crypto.randomUUID().toString();
exports.generateCryptoToken = generateCryptoToken;
const resetPasswordTokenExpires = async () => new Date(Date.now() + 1 * 60 * 60 * 1000);
exports.resetPasswordTokenExpires = resetPasswordTokenExpires;
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
exports.generateVerificationCode = generateVerificationCode;

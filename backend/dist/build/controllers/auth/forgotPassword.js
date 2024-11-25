"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const httpStatusCode_1 = require("../../constant/httpStatusCode");
const user_1 = require("../../lib/user");
const catchErrors_1 = __importDefault(require("../../utils/catchErrors"));
const token_1 = require("../../utils/token");
const authSchema_1 = require("../../zodSchema/authSchema");
exports.forgotPassword = (0, catchErrors_1.default)(async (req, res) => {
    const data = req.body;
    const validatedData = authSchema_1.forgotPasswordSchema.safeParse(data);
    if (!validatedData.success)
        return res.status(httpStatusCode_1.BAD_REQUEST).json({ success: false, message: "Invalid email or password" /* ErrorCode.InvalidEmailOrPassword */ });
    const { email } = validatedData.data;
    const user = await (0, user_1.getUserByEmail)(email);
    if (!user)
        return res.status(httpStatusCode_1.BAD_REQUEST).json({ success: false, message: "User not found" /* ErrorCode.UserNotFound */ });
    const resetToken = await (0, token_1.generateCryptoToken)();
    const resetTokenExpires = await (0, token_1.resetPasswordTokenExpires)();
    const updatedUser = await (0, user_1.updateEmailPassword)(user.id, resetToken, resetTokenExpires);
    return res.status(httpStatusCode_1.OK).json({ success: true, message: "Email sent successfully" /* SuccessCode.EmailSent */, data: updatedUser });
});

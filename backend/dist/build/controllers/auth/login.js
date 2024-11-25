"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const httpStatusCode_1 = require("../../constant/httpStatusCode");
const user_1 = require("../../lib/user");
const catchErrors_1 = __importDefault(require("../../utils/catchErrors"));
const hashPassword_1 = require("../../utils/hashPassword");
const token_1 = require("../../utils/token");
const authSchema_1 = require("../../zodSchema/authSchema");
exports.login = (0, catchErrors_1.default)(async (req, res) => {
    const data = req.body;
    const validatedData = authSchema_1.loginSchema.safeParse(data);
    if (!validatedData.success)
        return res
            .status(httpStatusCode_1.BAD_REQUEST)
            .json({ success: false, message: "Invalid email or password" /* ErrorCode.InvalidEmailOrPassword */ });
    const { email, password } = validatedData.data;
    const userExist = await (0, user_1.getUserByEmail)(email);
    if (!userExist || !userExist.password || !userExist.email)
        return res
            .status(httpStatusCode_1.BAD_REQUEST)
            .json({ success: false, message: "Invalid email or password" /* ErrorCode.InvalidEmailOrPassword */ });
    if (!userExist.isVerified)
        return res
            .status(httpStatusCode_1.BAD_REQUEST)
            .json({ success: false, message: "Please verify your email" /* ErrorCode.VerifyEmail */ });
    const user = await (0, hashPassword_1.comparePassword)(password, userExist.password);
    if (!user)
        return res
            .status(httpStatusCode_1.BAD_REQUEST)
            .json({ success: false, message: "Invalid email or password" /* ErrorCode.InvalidEmailOrPassword */ });
    await (0, token_1.generateTokenSetCookie)(res, userExist.id);
    const newUser = {
        userId: userExist.id,
        email: userExist.email,
        isVerified: userExist.isVerified
    };
    return res
        .status(httpStatusCode_1.OK)
        .json({ success: true, message: "Login successfully" /* SuccessCode.LoginSuccess */, data: newUser });
});

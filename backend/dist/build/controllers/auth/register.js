"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const httpStatusCode_1 = require("../../constant/httpStatusCode");
const user_1 = require("../../lib/user");
const catchErrors_1 = __importDefault(require("../../utils/catchErrors"));
const hashPassword_1 = require("../../utils/hashPassword");
const token_1 = require("../../utils/token");
const authSchema_1 = require("../../zodSchema/authSchema");
exports.register = (0, catchErrors_1.default)(async (req, res) => {
    const data = req.body;
    const validatedData = authSchema_1.registerSchema.safeParse(data);
    console.log(validatedData);
    if (!validatedData.success)
        return res
            .status(httpStatusCode_1.BAD_REQUEST)
            .json({ success: false, message: "Invalid email or password" /* ErrorCode.InvalidEmailOrPassword */ });
    const { name, email, password, confirmPassword } = validatedData.data;
    if (password !== confirmPassword)
        return res
            .status(httpStatusCode_1.BAD_REQUEST)
            .json({ success: false, message: "Password not match" /* ErrorCode.PasswordNotMatch */ });
    const userExist = await (0, user_1.getUserByEmail)(email);
    if (userExist)
        return res
            .status(httpStatusCode_1.BAD_REQUEST)
            .json({ success: false, message: "User already exist" /* ErrorCode.UserAlreadyExist */ });
    const hassPassword = await (0, hashPassword_1.hashPassword)(password);
    const verficationCode = (0, token_1.generateVerificationCode)();
    const user = await (0, user_1.createUser)(name, email, hassPassword, verficationCode);
    const newUser = {
        userId: user.id,
        name: user.name,
        email: user.email,
        verficationCode,
        verficationCodeExpires: user.resetPasswordExpires,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
    // todo send verification email
    return res
        .status(httpStatusCode_1.OK)
        .json({ success: true, message: "User created successfully" /* SuccessCode.UserCreated */, data: newUser });
});

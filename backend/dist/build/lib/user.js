"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmailPassword = exports.createUser = exports.checkExistsEmail = exports.getUserByEmail = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const getUserByEmail = async (email) => prisma_1.default.user.findUnique({ where: { email } });
exports.getUserByEmail = getUserByEmail;
const checkExistsEmail = async (email) => prisma_1.default.user.findUnique({
    where: { email },
    select: {
        id: true,
        email: true,
        password: true,
        createdAt: true,
        updatedAt: true
    }
});
exports.checkExistsEmail = checkExistsEmail;
const createUser = async (name, email, password, verificationCode) => prisma_1.default.user.create({ data: { name, email, password, verificationCode } });
exports.createUser = createUser;
const updateEmailPassword = async (id, resetPasswordToken, resetPasswordExpires) => {
    return prisma_1.default.user.update({
        where: { id },
        data: {
            resetPasswordToken,
            resetPasswordExpires
        },
        select: {
            id: true,
            email: true,
            resetPasswordToken: true,
            resetPasswordExpires: true,
            createdAt: true,
            updatedAt: true
        }
    });
};
exports.updateEmailPassword = updateEmailPassword;

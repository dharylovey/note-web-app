"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailSchema = exports.registerSchema = exports.loginSchema = exports.forgotPasswordSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.forgotPasswordSchema = zod_1.default.object({
    email: zod_1.default
        .string()
        .email({ message: "Email must be a valid email address" /* ZodSchemaError.MustBeValidEmail */ })
        .min(3, { message: "Email must be at least 3 characters long" /* ZodSchemaError.MinEmailLength */ })
        .regex(/^\S+@\S+$/i, { message: "Email must be a valid email address" /* ZodSchemaError.MustBeValidEmail */ })
});
exports.loginSchema = exports.forgotPasswordSchema.extend({
    password: zod_1.default
        .string()
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" /* ZodSchemaError.UpperCaseLetter */ })
        .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter" /* ZodSchemaError.LowerCaseLetter */
    })
        .regex(/[0-9]/, {
        message: "Password must contain at least one number" /* ZodSchemaError.MustContainNumber */
    })
        .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character" /* ZodSchemaError.SpecialCharacter */
    })
        .min(8, { message: "Password must be at least 8 characters long" /* ZodSchemaError.MinPasswordLength */ })
        .max(20, {
        message: "Password must be at most 30 characters long" /* ZodSchemaError.MaxPasswordLength */
    })
});
exports.registerSchema = exports.loginSchema
    .extend({
    name: zod_1.default.string(),
    confirmPassword: zod_1.default
        .string()
        .min(8, { message: "Password must be at least 8 characters long" /* ZodSchemaError.MinPasswordLength */ })
        .max(20, {
        message: "Password must be at most 30 characters long" /* ZodSchemaError.MaxPasswordLength */
    })
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match" /* ErrorCode.PasswordNotMatch */,
    path: ["confirmPassword"]
});
exports.verifyEmailSchema = zod_1.default.object({
    verificationCode: zod_1.default
        .string()
        .min(6, { message: "Verification code must be at least 6 characters long" /* ZodSchemaError.MinMaxVerificationCodeLength */ })
        .max(6, {
        message: "Verification code must be at least 6 characters long" /* ZodSchemaError.MinMaxVerificationCodeLength */
    })
});

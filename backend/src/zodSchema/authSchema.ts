import { ErrorCode, ZodSchemaError } from "@/constant/responseMessage";
import z from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: ZodSchemaError.MustBeValidEmail })
    .min(3, { message: ZodSchemaError.MinEmailLength })
    .regex(/^\S+@\S+$/i, { message: ZodSchemaError.MustBeValidEmail })
});

export const loginSchema = forgotPasswordSchema.extend({
  password: z
    .string()
    .regex(/[A-Z]/, { message: ZodSchemaError.UpperCaseLetter })
    .regex(/[a-z]/, {
      message: ZodSchemaError.LowerCaseLetter
    })
    .regex(/[0-9]/, {
      message: ZodSchemaError.MustContainNumber
    })
    .regex(/[^A-Za-z0-9]/, {
      message: ZodSchemaError.SpecialCharacter
    })
    .min(8, { message: ZodSchemaError.MinPasswordLength })
    .max(20, {
      message: ZodSchemaError.MaxPasswordLength
    })
});

export const registerSchema = loginSchema
  .extend({
    name: z.string(),
    confirmPassword: z
      .string()
      .min(8, { message: ZodSchemaError.MinPasswordLength })
      .max(20, {
        message: ZodSchemaError.MaxPasswordLength
      })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ErrorCode.PasswordNotMatch,
    path: ["confirmPassword"]
  });

export const verifyEmailSchema = z.object({
  verificationCode: z
    .string()
    .min(6, { message: ZodSchemaError.MinMaxVerificationCodeLength })
    .max(6, {
      message: ZodSchemaError.MinMaxVerificationCodeLength
    })
});

export type UserSchema =
  | z.infer<typeof registerSchema>
  | z.infer<typeof loginSchema>;

export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

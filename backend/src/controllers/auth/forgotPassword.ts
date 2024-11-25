import { BAD_REQUEST, OK } from "@/constant/httpStatusCode";
import { ErrorCode, SuccessCode } from "@/constant/responseMessage";
import { getUserByEmail, updateEmailPassword } from "@/lib/user";
import catchErrors from "@/utils/catchErrors";
import { generateCryptoToken, resetPasswordTokenExpires } from "@/utils/token";
import { forgotPasswordSchema, ForgotPasswordSchema } from "@/zodSchema/authSchema";
import { RequestHandler } from "express";

export const forgotPassword: RequestHandler = catchErrors(async (req, res) => {
  const data: ForgotPasswordSchema = req.body;
  const validatedData = forgotPasswordSchema.safeParse(data);

  if (!validatedData.success) return res.status(BAD_REQUEST).json({ success: false, message: ErrorCode.InvalidEmailOrPassword });

  const { email } = validatedData.data;
  const user = await getUserByEmail(email);

  if (!user) return res.status(BAD_REQUEST).json({ success: false, message: ErrorCode.UserNotFound });

  const resetToken = await generateCryptoToken();
  const resetTokenExpires = await resetPasswordTokenExpires();

  const updatedUser = await updateEmailPassword(user.id, resetToken, resetTokenExpires);

  return res.status(OK).json({ success: true, message: SuccessCode.EmailSent, data: updatedUser });
});

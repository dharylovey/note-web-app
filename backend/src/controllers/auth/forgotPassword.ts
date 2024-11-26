import { BAD_REQUEST, OK } from "@/constant/httpStatusCode";
import { ErrorCode, SuccessCode } from "@/constant/responseMessage";
import { getUserByEmail, updateEmailPassword } from "@/lib/user";
import catchErrors from "@/utils/catchErrors";
import { generateCryptoToken, resetPasswordTokenExpires } from "@/utils/token";
import { forgotPasswordSchema, ForgotPasswordSchema } from "@/zodSchema/authSchema";
import { RequestHandler } from "express";

export const forgotPassword: RequestHandler = catchErrors(async (req, res) => {
  const data: ForgotPasswordSchema = req.body;
  // Validate the request body
  const validatedData = forgotPasswordSchema.safeParse(data);

  // If the request body is not valid
  if (!validatedData.success)
    return res.status(BAD_REQUEST).json({ success: false, message: ErrorCode.InvalidEmailOrPassword });

  const { email } = validatedData.data;

  // Check if the user exists
  const user = await getUserByEmail(email);

  // If the user does not exist
  if (!user) return res.status(BAD_REQUEST).json({ success: false, message: ErrorCode.UserNotFound });

  // Generate the reset token and reset token expires
  const resetToken = await generateCryptoToken();
  const resetTokenExpires = await resetPasswordTokenExpires();

  // Update the user
  const updatedUser = await updateEmailPassword(user.id, resetToken, resetTokenExpires);

  return res.status(OK).json({ success: true, message: SuccessCode.EmailSent, data: updatedUser });
});

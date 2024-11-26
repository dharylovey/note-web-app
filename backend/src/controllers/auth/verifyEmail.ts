import { BAD_REQUEST, OK } from "@/constant/httpStatusCode";
import { ErrorCode, SuccessCode } from "@/constant/responseMessage";
import { getVerificationCode, updateVerificationCode } from "@/lib/user";
import catchErrors from "@/utils/catchErrors";
import { verifyEmailSchema, VerifyEmailSchema } from "@/zodSchema/authSchema";
import { RequestHandler } from "express";

export const verifyEmail: RequestHandler = catchErrors(async (req, res) => {
  const data: VerifyEmailSchema = req.body;

  // Validate the request body
  const validatedData = verifyEmailSchema.safeParse(data);

  // If the request body is not valid
  if (!validatedData.success)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.InvalidVerificationCode });

  // Destructure the validated data
  const { code } = validatedData.data;

  // Check if the user already exists
  const userCode = await getVerificationCode(code);

  // If the user already exists
  if (!userCode)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.InvalidVerificationCode });

  // Update the user
  const updatedUser = await updateVerificationCode(userCode.id);

  // Destructure the updated user
  const newUser = {
    id: updatedUser.id,
    email: updatedUser.email,
    isVerified: updatedUser.isVerified,
    verificationCode: updatedUser.verificationCode,
    verificationCodeExpires: updatedUser.verificationCodeExpires,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt
  };

  // Return the response
  return res
    .status(OK)
    .json({ success: true, message: SuccessCode.EmailVerified, data: newUser });
});

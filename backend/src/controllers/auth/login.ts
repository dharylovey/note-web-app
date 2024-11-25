import { BAD_REQUEST, OK } from "@/constant/httpStatusCode";
import { ErrorCode, SuccessCode } from "@/constant/responseMessage";
import { getUserByEmail } from "@/lib/user";
import catchErrors from "@/utils/catchErrors";
import { comparePassword } from "@/utils/hashPassword";
import { generateTokenSetCookie } from "@/utils/token";
import { loginSchema, UserSchema } from "@/zodSchema/authSchema";
import { RequestHandler } from "express";

export const login: RequestHandler = catchErrors(async (req, res) => {
  const data: UserSchema = req.body;
  const validatedData = loginSchema.safeParse(data);

  if (!validatedData.success)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.InvalidEmailOrPassword });

  const { email, password } = validatedData.data;

  const userExist = await getUserByEmail(email);

  if (!userExist || !userExist.password || !userExist.email)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.InvalidEmailOrPassword });

  if (!userExist.isVerified)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.VerifyEmail });

  const user = await comparePassword(password, userExist.password);

  if (!user)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.InvalidEmailOrPassword });

  await generateTokenSetCookie(res, userExist.id);

  const newUser = {
    userId: userExist.id,
    email: userExist.email,
    isVerified: userExist.isVerified
  };

  return res
    .status(OK)
    .json({ success: true, message: SuccessCode.LoginSuccess, data: newUser });
});

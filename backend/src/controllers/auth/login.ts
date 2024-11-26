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
  // Validate the request body
  const validatedData = loginSchema.safeParse(data);

  // If the request body is not valid
  if (!validatedData.success)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.InvalidEmailOrPassword });

  // Destructure the validated data
  const { email, password } = validatedData.data;

  // Check if the user already exists
  const userExist = await getUserByEmail(email);

  // If the user already exists
  if (!userExist || !userExist.password || !userExist.email)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.InvalidEmailOrPassword });

  // If the user is not verified
  if (!userExist.isVerified)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.VerifyEmail });

  // Compare the password
  const user = await comparePassword(password, userExist.password);

  // If the password is not correct
  if (!user)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.InvalidEmailOrPassword });

  // Generate the token and set the cookie
  await generateTokenSetCookie(res, userExist.id);

  const newUser = {
    userId: userExist.id,
    email: userExist.email,
    isVerified: userExist.isVerified
  };

  // Return the user
  return res
    .status(OK)
    .json({ success: true, message: SuccessCode.LoginSuccess, data: newUser });
});

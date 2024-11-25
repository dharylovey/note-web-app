import { BAD_REQUEST, OK } from "@/constant/httpStatusCode";
import { ErrorCode, SuccessCode } from "@/constant/responseMessage";
import { createUser, getUserByEmail } from "@/lib/user";
import catchErrors from "@/utils/catchErrors";
import { hashPassword } from "@/utils/hashPassword";
import { generateVerificationCode } from "@/utils/token";
import { registerSchema, UserSchema } from "@/zodSchema/authSchema";
import { RequestHandler } from "express";

export const register: RequestHandler = catchErrors(async (req, res) => {
  const data: UserSchema = req.body;
  const validatedData = registerSchema.safeParse(data);

  console.log(validatedData);
  if (!validatedData.success)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.InvalidEmailOrPassword });

  const { name, email, password, confirmPassword } = validatedData.data;

  if (password !== confirmPassword)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.PasswordNotMatch });

  const userExist = await getUserByEmail(email);

  if (userExist)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.UserAlreadyExist });

  const hassPassword = await hashPassword(password);

  const verficationCode = generateVerificationCode();

  const user = await createUser(name, email, hassPassword, verficationCode);

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
    .status(OK)
    .json({ success: true, message: SuccessCode.UserCreated, data: newUser });
});

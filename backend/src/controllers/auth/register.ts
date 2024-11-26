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
  // Validate the request body
  const validatedData = registerSchema.safeParse(data);

  // If the request body is not valid
  if (!validatedData.success)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.InvalidData });

  // Destructure the validated data
  const { name, email, password, confirmPassword } = validatedData.data;

  // If the password and confirm password do not match
  if (password !== confirmPassword)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.PasswordNotMatch });

  // Check if the user already exists
  const userExist = await getUserByEmail(email);

  // If the user already exists
  if (userExist)
    return res
      .status(BAD_REQUEST)
      .json({ success: false, message: ErrorCode.UserAlreadyExist });

  // Hash the password
  const hassPassword = await hashPassword(password);

  // Generate the verification code
  const verficationCode = generateVerificationCode();

  // Create the user
  const user = await createUser(name, email, hassPassword, verficationCode);

  // Return the user
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

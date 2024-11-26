import prisma from "./prisma";

export const getUserByEmail = async (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const checkExistsEmail = async (email: string) =>
  prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
      createdAt: true,
      updatedAt: true
    }
  });

export const createUser = async (
  name: string,
  email: string,
  password: string,
  verificationCode: string
) => prisma.user.create({ data: { name, email, password, verificationCode } });

export const updateEmailPassword = async (
  id: string,
  resetPasswordToken: string,
  resetPasswordExpires: Date
) =>
  await prisma.user.update({
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
export const getVerificationCode = async (code: string) =>
  await prisma.user.findFirst({
    where: { verificationCode: code },
    select: {
      id: true,
      verificationCode: true,
      verificationCodeExpires: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true
    }
  });

export const updateVerificationCode = async (id: string) =>
  await prisma.user.update({
    where: { id },
    data: {
      verificationCode: null,
      verificationCodeExpires: null,
      isVerified: true
    },
    select: {
      id: true,
      email: true,
      isVerified: true,
      verificationCode: true,
      verificationCodeExpires: true,
      createdAt: true,
      updatedAt: true
    }
  });

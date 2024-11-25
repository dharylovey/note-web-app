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
) => {
  return prisma.user.update({
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
};

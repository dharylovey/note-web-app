import { Response } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export const generateTokenSetCookie = async (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" })

  res.cookie("note_web_app_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 // 1day
  })
  return token
}

export const generateCryptoToken = async () => crypto.randomUUID().toString()

export const resetPasswordTokenExpires = async () => new Date(Date.now() + 1 * 60 * 60 * 1000)

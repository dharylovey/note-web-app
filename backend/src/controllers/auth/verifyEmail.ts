import { RequestHandler } from "express"

export const verifyEmail: RequestHandler = (req, res, next) => {
  res.status(200).json({
    message: "Email succesfully Verified!"
  })
  next()
}

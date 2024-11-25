import { RequestHandler } from "express"

export const forgotPassword: RequestHandler = (req, res, next) => {
  res.status(200).json({
    message: "Forgot password successful"
  })
  next()
}

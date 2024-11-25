import { RequestHandler } from "express"

export const logout: RequestHandler = (req, res, next) => {
  res.status(200).json({
    message: "Logout Successfully"
  })
  next()
}

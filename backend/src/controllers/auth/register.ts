import { RequestHandler } from "express"

export const register: RequestHandler = (req, res, next) => {
  res.status(200).json({
    message: "Register successful"
  })
  next()
}

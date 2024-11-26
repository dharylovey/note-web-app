import { RequestHandler } from "express";

export const requestLogger: RequestHandler = (req, res, next) => {
  try {
    console.log(req.headers);
    next();
  } catch (error) {
    next(error);
  }
};

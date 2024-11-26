import { BAD_REQUEST, SERVER_ERROR } from "@/constant/httpStatusCode";
import { ErrorCode } from "@/constant/responseMessage";
import { ErrorRequestHandler, Response } from "express";
import z from "zod";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
    path: err.path.join("."),
    message: err.message
  }));

  return res.status(BAD_REQUEST).json({
    errors,
    success: false,
    message: error.message
  });
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH ${req.path}`, err);
  if (!res.status) return;
  if (err instanceof Error)
    res.status(BAD_REQUEST).json({ success: false, message: err.message });

  if (err instanceof z.ZodError) handleZodError(res, err);

  res.status(SERVER_ERROR).json({
    success: false,
    message: ErrorCode.InternalServerError
  });

  next();
};

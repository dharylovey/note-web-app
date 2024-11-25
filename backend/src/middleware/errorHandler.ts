import { BAD_REQUEST } from "@/constant/httpStatusCode";
import { ErrorCode } from "@/constant/responseMessage";
import { ErrorRequestHandler, Response } from "express";
import z from "zod";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((issue) => ({
    path: issue.path[0],
    message: issue.message
  }));

  return res.status(BAD_REQUEST).json({ errors, success: false, message: error.message });
};

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.log(`Path ${req.path} Error: ${err.message}`);
  if (err instanceof Error) res.status(BAD_REQUEST).json({ success: false, message: err.message });
  if (err instanceof z.ZodError) handleZodError(res, err);
  res.status(BAD_REQUEST).json({ message: ErrorCode.InternalServerError });
};

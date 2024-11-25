import catchErrors from "@/utils/catchErrors";
import { RequestHandler } from "express";

export const verifyEmail: RequestHandler = catchErrors(async (req, res) => {
  res.status(200).json({
    message: "Email succesfully Verified!"
  });
});

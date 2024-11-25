import catchErrors from "@/utils/catchErrors";
import { RequestHandler } from "express";

export const forgotPassword: RequestHandler = catchErrors(async (req, res) => {
  res.status(200).json({
    message: "Forgot password successful"
  });
});

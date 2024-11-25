import catchErrors from "@/utils/catchErrors";
import { RequestHandler } from "express";

export const login: RequestHandler = catchErrors(async (req, res) => {
  res.status(200).json({
    message: "Login successful"
  });
});

import catchErrors from "@/utils/catchErrors";
import { RequestHandler } from "express";

export const logout: RequestHandler = catchErrors(async (req, res) => {
  res.status(200).json({
    message: "Logout Successfully"
  });
});

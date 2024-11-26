import catchErrors from "@/utils/catchErrors";
import { RequestHandler } from "express";

export const logout: RequestHandler = catchErrors(async (req, res) => {
  res.clearCookie("note_web_app_token");

  res.status(200).json({
    success: true,
    message: "Logout Successfully"
  });
});

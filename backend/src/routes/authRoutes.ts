import { forgotPassword } from "@/controllers/auth/forgotPassword"
import { login } from "@/controllers/auth/login"
import { register } from "@/controllers/auth/register"
import express from "express"

const authRoutes = express.Router()

authRoutes.post("/login", login)
authRoutes.post("/register", register)
authRoutes.post("/forgot-password", forgotPassword)

export default authRoutes

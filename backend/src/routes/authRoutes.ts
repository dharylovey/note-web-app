import { login } from "@/controllers/auth/login"
import express from "express"

const authRoutes = express.Router()

authRoutes.post("/login", login)

export default authRoutes

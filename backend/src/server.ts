import express, { Express } from "express"
import dotenv from "dotenv"

dotenv.config()
const app: Express = express()
const PORT = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Express + TypeScript Server",
    version: "1.0.0",
    health: true
  })
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})

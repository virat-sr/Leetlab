import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"

dotenv.config()
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello guuys welcome to leetlab🔥")
})

app.use("/api/v1/auth", authRoutes)



app.listen(8000, () => {
    console.log(" Server runing at port 8080.")
})
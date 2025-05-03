import express from "express"
import dotenv from "dotenv"

import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import problemRoutes from "./routes/problem.routes.js"
import ip from 'ip'
import executionRoute from "./routes/executeCode.routes.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("Hello guuys welcome to leetlab🔥")
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/problems", problemRoutes)
app.use("/api/v1/execute-code", executionRoute)



app.listen(8080, () => {
    console.log(" Server runing at port 8080.")
    console.log(ip.address())
})
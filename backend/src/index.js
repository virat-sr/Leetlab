import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()



app.listen(8000, () => {
    console.log(" Server runing at port 8080.")
})
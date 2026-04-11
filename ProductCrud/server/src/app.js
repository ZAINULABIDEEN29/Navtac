import dotenv from "dotenv"
dotenv.config()
import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import productsRouter from "./routes/products.routes.js"
import authRouter from "./routes/auth.routes.js"
import connectDB from "./db/db.js"

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

app.use("/api/v1/products",productsRouter)
app.use("/api/v1/auth",authRouter)

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server status ok"
    })
})
app.listen(process.env.PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`)
})
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import cors from "cors";
import productsRouter from "./routes/products.routes.js"
import authRouter from "./routes/auth.routes.js"
import connectDB from "./db/db.js"
import path from "path"

const app = express();
connectDB();

app.use(cors({
   origin: [
      process.env.FRONTEND_URL, 
      process.env.FRONTEND_URL?.replace(/\/$/, "")
   ],
   credentials: true,
}));
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use("/uploads",express.static(path.join(process.cwd(),"public/uploads")))
app.use(cookieParser())
app.use(morgan("dev"))


app.use("/api/v1/auth",authRouter)
app.use("/api/v1/products",productsRouter)


app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Server status ok"
    })
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
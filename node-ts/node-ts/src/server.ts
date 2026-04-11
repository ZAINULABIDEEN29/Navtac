import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";

const app = express();



const PORT = process.env.PORT ||  3000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use("/api/users", userRoutes);



app.get("/", (req,res)=>{
    res.send("Hello From Backened");
}) 

connectDB();
app.use(errorHandler);


app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

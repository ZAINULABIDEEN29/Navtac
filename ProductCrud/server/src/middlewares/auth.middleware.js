import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { asyncHandler } from "./asyncHandler.middleware.js";


const authMiddleware = asyncHandler(
    async (req,res,next)=>{

        const authToken = req.cookies.token

        if(!authToken){
            return res.status(401).json({
                success:false,
                message:"UnAuthorized please login first"
            })
        }
        const decodedToken = jwt.verify(authToken,process.env.JWT_SECRET)
        const user = await User.findById(decodedToken.id)
        
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }
        req.user = user
        next()
    }
)

export { 
    authMiddleware
}
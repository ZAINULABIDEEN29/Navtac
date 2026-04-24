import { asyncHandler } from "../middlewares/asyncHandler.middleware.js"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"


const registerUser = asyncHandler(
    async (req,res)=>{
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }
        const user = await User.create({
            username,
            email,
            password
        })

        return res.status(201).json({message:"User created successfully",user})
    }
)

const loginUser = asyncHandler(
    async (req,res)=>{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const user = await User.findOne({email}).select("+password")
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const isPasswordValid = await user.comparePassword(password)
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid password"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token",token)
        return res.status(200).json({message:"User logged in successfully",user,token})
    }
)

export {registerUser, loginUser}
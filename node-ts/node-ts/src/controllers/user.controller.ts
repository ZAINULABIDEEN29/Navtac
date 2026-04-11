import type { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const {name ,email, age}= req.body;
  const user = await User.create({
    name,
    email,
    age
  });
  res.json(
   new ApiResponse(201, user, "User created successfully")
  )
  // res.status(201).json({ success: true, user });
});

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json({ success: true, users });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const {id}= req.params;
  if(!id){
    return new ApiError(400,"Id is required")
  }
  const user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, user });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const {id} = req.params;
  if(!id){
    return new ApiError(400,"Id is required")
  }
  const {name,email,password} = req.body;
  const user = await User.findByIdAndUpdate(id,{name,email,password}
    , {
    new: true,
    runValidators: true,
  });
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, user });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const {id} = req.params;
  if(!id){
    return new ApiError(400,"Id is required")
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ApiError(404, "User not found");
  res.json({ success: true, message: "User deleted" });
});

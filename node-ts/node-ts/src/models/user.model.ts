import mongoose,{ Schema ,Document} from "mongoose";

export interface IUSER extends Document{
    name:string;
    email:string;
    age:number;
    createdAt:Date
}

const userSchema = new Schema<IUSER>(
    {
        name:{
            type:String,
            required:[true,"Name is required"],
            minlength:[2,"Name must be atleast 2 characters long"],
            maxlength:[40,"Name must be less than 40 characters long"],
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            match:[/^\S+@\S+\.\S+$/,"Invalid email address"]
            },
        age:{
            type:Number,
            required:true,
            min:[1,"Age must be positive"]
        
        },
      
    }
)

export const User = mongoose.model<IUSER>("User",userSchema);
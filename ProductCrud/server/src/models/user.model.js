import mongoose , {Schema} from "mongoose";
import bcrypt from "bcryptjs"


const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        trim:true,
        minLength:[2,"Atleast 2 characters required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        unique:true,
        lowercase:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true,
        minLength:[2,"Atleast 2 characters required"],
        select:false
    }
})

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
const User = mongoose.model("User",userSchema)

export default User;

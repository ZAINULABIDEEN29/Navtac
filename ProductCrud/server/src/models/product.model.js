import mongoose, {Schema} from "mongoose";


const productSchema = new Schema({
    title:{
        type:String,
        required:[true, "Title is required"],
        trim:true,
        minLength:[2,"Atleast 2 characters required"]
    },
    description:{
        type:String,
        required:[true, "Description is required"],
        trim:true,
        minLength:[2,"Atleast 2 characters required"]
    },
    category:{
        type:String,
        required:[true, "Category is required"],
        trim:true,
        enum:["Smartphones","Laptops","Fragrances","Skincare","Groceries","Home Decoration","Other"],
        default:"Other"
    },
    price:{
        type:Number,
        required:[true, "Price is required"],
        default:0
    },
    brand:{
        type:String,
        required:[true, "Brand is required"],
        trim:true,
        minLength:[2,"Atleast 2 characters required"]
    },
    sku:{
        type:String,
        required:[true,"Sku is required"],
        trim:true,
    },
    rating:{
        type:Number,
        required:[true, "Rating is required"],
        default:0
    },
    stock:{
        type:Number,
        required:[true, "Stock is required"],
        default:0
    },
    image:{
        type:String,
        required:[true, "Image is required"],
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Product = mongoose.model("Product",productSchema)

export default Product;
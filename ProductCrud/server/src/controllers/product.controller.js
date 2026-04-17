import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import Product from "../models/product.model.js";

// const products = [
//  { id: 1, name: "Product 1", price: 100 },
//  { id: 2, name: "Product 2", price: 200 },
//  { id: 3, name: "Product 3", price: 300 },
// ]

 const getAllProducts = asyncHandler( async  (req,res)=>{
   const { q } = req.query;
   let queryFilter = {};
   
   if (q) {
     queryFilter.title = { $regex: q, $options: "i" };
   }

   const products =  await Product.find(queryFilter);
   if(!products){
      return res.status(400).json({
         success:false,
         message:"Products not found"
      })
   }
   res.json({
    success:true,
    message:"All products",
    products:products
   })
})

 const getSingleProduct = asyncHandler( async  (req, res)=>{
   const {id} = req.params;

   if(!id){
   return res.status(400).json({
         success:false,
         message:"Please provide product id"
      })
   }
   const product = await Product.findById(id);
   if(!product){
      return res.status(400).json({
         success:false,
         message:"Product not found."
      })
   }
   // const product = products.find((product)=> product.id === Number(id))
   res.status(200).json({
      success:true,
      message:"Product found",
      data:product
   })
})

const createProduct = asyncHandler(async (req, res)=>{
   const {title, description,category,price,brand,sku,rating,stock} = req.body;
   const image = req.file ? req.file.filename : (req.body.image || req.body.thumbnail);

   if(!title || !description || !category || !price || !brand || !sku || !rating || !stock){
      return res.status(400).json({
         success:false,
         message:"Please provide all the fields"
      })
   }
   
   const product = new Product({
      title,
      description,
      category,
      price,
      brand,
      sku,
      rating,
      stock,
      image,
      owner: req.user ? req.user._id : undefined   
   })
   await product.save({validateBeforeSave:true})
   // const product = {
   //    id,
   //    name,
   //    price
   // }
   // products.push(product)

   
   res.status(201).json({
      success:true,
      message:"Product created successfully",
      data:product
   })
})

const updateProduct = asyncHandler(async  (req,res)=>{
   const {id} = req.params;
   const {title, description,category,price,brand,sku,rating,stock} = req.body;
   const image = req.file ? req.file.filename : (req.body.image || req.body.thumbnail);
   
   if(!id){
      return res.status(400).json({
         success:false,
         message:"Please provide product id"
      })
   }

   const updateData = {
      title, 
      description,
      category,
      price,
      brand,
      sku,
      rating,
      stock
   };
   
   if (image) {
      updateData.image = image;
   }

   const product = await Product.findByIdAndUpdate(id, updateData, {new:true,runValidators:true})
   // const product = products.find((product)=> product.id === Number(id))
   if(!product){
      return res.status(400).json({
         success:false,
         message:"Product don't exists"
      })
   }
   // product.name = name;
   // product.price = price;
   res.status(200).json({
      success:true,
      message:"Product updated successfully",
      data:product
   })
})

const deleteProduct = asyncHandler( async (req, res)=>{
   const {id} = req.params;
   if(!id){
      return res.status(400).json({
         success:false,
         message:"Please provide product id"
      })
   }

   const product = await Product.findByIdAndDelete(id)
   // const product = products.filter((product)=> product.id !== Number(id))
   if(!product){
      return res.status(400).json({
         success:false,
         message:"Product don't exists"
      })
   }
   res.status(200).json({
      success:true,
      message:"Product deleted successfully",
      products:product
   })
}) 

export {
   getAllProducts,
   getSingleProduct,
   createProduct,
   updateProduct,
   deleteProduct
}
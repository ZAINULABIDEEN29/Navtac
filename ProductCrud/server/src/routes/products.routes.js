import express from "express"
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/product.controller.js";
import { upload } from "../../utils/multer.js"
const router = express.Router();

router.route("/").
    get(getAllProducts)
router.route("/:id").
    get(getSingleProduct)
router.route("/").
    post(upload.single("image"),createProduct)
router.route("/:id").
    put(upload.single("image"),updateProduct)
router.route("/:id").
    delete(deleteProduct)

export default router
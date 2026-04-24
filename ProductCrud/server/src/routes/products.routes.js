import express from "express"
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controllers/product.controller.js";
import upload from "../utils/multer.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/").
    get(
        authMiddleware,
        getAllProducts
    )
router.route("/:id").
    get(
        authMiddleware,
        getSingleProduct
    )
router.route("/").
    post(
        authMiddleware,
        upload.single("image"),
        createProduct
    )
router.route("/:id").
    put(
        authMiddleware,
        upload.single("image"),
        updateProduct
    )
router.route("/:id").
    delete(
       authMiddleware,
        deleteProduct
    )

export default router
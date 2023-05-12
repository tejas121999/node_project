import express, { Request, Response } from "express"
const product_router = express.Router()
import { addProduct, addProductImg, getProductByID, getProduct, updateProduct, deleteProduct } from "../controller/Product"
import { upload } from '../middleware/image_uploade'

product_router.post('/addProduct', addProduct)
product_router.post('/prod_img/:id', upload.array("product_img"), addProductImg)
product_router.post('/getProductById', getProductByID)
product_router.post('/getAllProduct', getProduct)
product_router.post('/updateProduct', updateProduct)
product_router.post('/deleteProduct', deleteProduct)

export {
    product_router
}
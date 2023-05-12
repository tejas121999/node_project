import express, { Request, Response } from "express"
const Router = express.Router()
import { router } from "./Users"
import { product_router } from "./Product"


Router.use('/user', router)
Router.use('/product', product_router)

export { Router }


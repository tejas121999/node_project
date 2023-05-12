const { Product, Product_img, db } = require('../models')
import express, { Request, Response, RequestHandler } from "express"
import { QueryTypes } from "sequelize"

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findAndCountAll({
            where: {
                isDelete: false,
                isDisplay: true
            },
            limit: req.body.limit,
            offset: req.body.offset,
        })
        if (!product) {
            return res.status(404).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                product
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}


export const getProductByID = async (req: Request, res: Response) => {
    try {
        let { id } = req.body
        // const product = await db.sequelize.query(`SELECT * FROM shopping_app.product where id = ${id} and isDelete = false;`, { type: QueryTypes.SELECT })
        // const product_img = await db.sequelize.query(`select product_img from shopping_app.product_img where product_id =${id}`, { type: QueryTypes.SELECT })

        const product: any = await Product.findOne({
            where: {
                id: id,
                isDelete: false
            },

        })
        const product_img: any = await Product_img.findAll({
            where: {
                product_id: id,
                isDeleted: false
            }

        })
        if (!product && product_img) {
            return res.status(404).json({
                message: " not found"
            })
        } else {
            return res.status(200).json({
                product,
                product_img
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

export const addProduct = async (req: Request, res: Response) => {
    try {
        let { product } = req.body
        var add_product = Product.create(product)
        if (!add_product) {
            return res.status(404).json({
                message: "failed to create"
            })
        } else {
            return res.status(200).json({
                message: "created",
                add_product
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}



export const addProductImg = async (req: Request, res: Response) => {
    try {
        let id: any = req.params.id
        let product: any = req.files
        let product_img: any = []
        product?.forEach((fileNAme: any) => {
            var temp = {
                "product_id": id,
                "product_img": fileNAme.filename
            }

            product_img.push(temp)
        })
        console.log(product_img)
        if (product_img.length !== 0) {
            var add_img = await Product_img.bulkCreate(product_img)
            if (!add_img) {
                return res.status(404).json({
                    message: "failed to create"
                })
            } else {
                return res.status(200).json({
                    message: "created",
                    add_img
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        let { product, delete_images } = req.body
        const data = await Product.findOne({ where: { id: product.id } })
        if (!data) {
            return res.status(404).json({
                message: "data not found"
            })
        } else {
            var update_product = await Product.update(product, {
                where: {
                    id: product.id
                }
            }).then(async () => {
                if (delete_images) {
                    let delete_img = delete_images.map((ele: any) => ele);
                    Product_img.update(
                        {
                            isDeleted: true
                        },
                        {
                            where: {
                                id: delete_img
                            }
                        }
                    )
                }


                res.status(200).send({
                    message: "Updated Successfully",
                    update_product
                })
            })
        }
    } catch (error) {
        res.status(500).send("Server Error")
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { prod_id } = req.body
        const data = await Product.findOne({ where: { id: prod_id } })
        if (!data) {
            return res.status(404).json({
                message: "post not found"
            })
        } else {
            Product.update({
                isDelete: true
            }, {
                where: {
                    id: prod_id
                }
            }).then(() => {
                res.status(200).send({
                    message: "Delete",
                    // data
                })
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        })
    }
}




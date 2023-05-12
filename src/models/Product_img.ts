// const { Model } = require('sequelize');
import { Model } from "sequelize"

module.exports = (sequelize: any, DataTypes: any) => {
    class Product_img extends Model {

    }

    Product_img.init({
        product_id: {
            type: DataTypes.STRING,
            field: 'product_id'
        },
        product_img: {
            type: DataTypes.STRING,
            field: 'product_img'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            field: 'isDeleted',
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        }
    }, {
        sequelize,
        tableName: 'product_img',
        modelName: 'Product_img',
        timestamps: true
    })
    return Product_img
}
import { Model } from "sequelize"

module.exports = (sequelize: any, DataTypes: any) => {
    class Product extends Model {

    }

    Product.init({
        product_name: {
            type: DataTypes.STRING,
            field: 'product_name'
        },
        product_price: {
            type: DataTypes.STRING,
            field: 'product_price'
        },
        product_description: {
            type: DataTypes.STRING,
            field: 'product_description'
        },
        currency: {
            type: DataTypes.STRING,
            field: 'currency'
        },
        isDisplay: {
            type: DataTypes.BOOLEAN,
            field: 'isDisplay',
            defaultValue: false,
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
            field: 'isDelete',
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
        tableName: 'product',
        modelName: 'Product',
        timestamps: true
    })
    return Product
}
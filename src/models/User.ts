// const { Model } = require('sequelize');
import { Model } from "sequelize"

module.exports = (sequelize: any, DataTypes: any) => {
    class Users extends Model {

    }

    Users.init({
        user_name: {
            type: DataTypes.STRING,
            field: 'user_name'
        },
        email: {
            type: DataTypes.STRING,
            field: 'email'
        },
        password: {
            type: DataTypes.STRING,
            field: 'password'
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
        tableName: 'users',
        modelName: 'Users',
        timestamps: true
    })
    return Users
}
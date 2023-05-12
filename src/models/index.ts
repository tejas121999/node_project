import fs from "fs"
import path from "path"
const Sequelize = require('sequelize');
const basename: any = path.basename(__filename);
const db: any = {};

let sequelize: any = new Sequelize({
    database: "shopping_app",
    username: "root",
    host: "localhost",
    dialect: "mysql",
    port: "3306",
    password: "root",
});

if (sequelize) {
    console.log("connection with db")
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    })

    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    // console.log(db, modelName)
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
module.exports = db;
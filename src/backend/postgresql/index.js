const Sequelize = require("sequelize");
const pg = require("pg");
const models = require('./models');
require('dotenv').config()

const sequelize = new Sequelize("postgres", process.env.POSTGRES_USERNAME, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    dialectModule: pg,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = models.UserModel(sequelize, Sequelize);
db.Project = models.ProjectModel(sequelize, Sequelize);
db.Commit = models.CommitModel(sequelize, Sequelize);
db.Change = models.ChangeModel(sequelize, Sequelize);

module.exports = {
    db
}
const { Sequelize } = require("sequelize");

const NODE_ENV = process.env.NODE_ENV;
const database = (NODE_ENV === 'test') ? process.env.MYSQL_DATABASE_TEST : process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASS;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect: 'mysql'
    }
);

const dbConnectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log('MYSQL Conexion Correcta');
    } catch (e) {
        console.log('MYSQL_ERROR_CONNECTION', e);
    }
}

module.exports = { sequelize, dbConnectMySQL };
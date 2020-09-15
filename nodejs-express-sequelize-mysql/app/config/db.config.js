const DBUSER = process.env.NODE_USER;
const DBPASS = process.env.NODE_PASS;

module.exports = {
    HOST: 'localhost',
    USER: DBUSER,
    PASSWORD: DBPASS,
    DB: "localdb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
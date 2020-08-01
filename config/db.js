const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host : "localhost", 
    user : "root",
    password : "root",
    database : "tuto",
    connectionLimit : 5
});

module.exports = pool;
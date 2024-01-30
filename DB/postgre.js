const pg = require('pg');
require('dotenv').config();

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "dataworld",
    password: "arnab@1616",
    port: 5432,
});
// db.connect();
module.exports = db;
const pg = require('pg');
require('dotenv').config();

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "secrets",
    password: "arnab@1616",
    port: 5432,
});

module.exports = db;
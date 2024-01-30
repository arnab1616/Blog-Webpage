const express = require('express');
const post_api = require('./post_api');
const task_api = require('./task_api');
const db = require('../DB/postgre');
const server = express();
const port = 4200;

db.connect();
server.use(post_api);
server.use(task_api);

server.listen(port, ()=>{
    console.log(`API server running on ->> ${port}`)
})
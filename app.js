const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

// import routers
const messeges = require('./routers/messeges');
const home = require('./routers/Components/home');
const history = require('./routers/history');
const uploadItems = require('./routers/uploadPost');
const weather = require('./routers/Components/weather');
const getWeather = require('./API/getWeather');
const editPost = require('./routers/Components/editPost');
const viewPost = require('./routers/Components/viewPost');
const updatePost = require('./routers/updatePost');
const deletePost = require('./routers/deletePost')
const logger = require('./Logger/Authentication');

const app = express();
const port = process.env.PORT || 5000;


app.use('/file', express.static('API/upload/images'));
app.use('/screenshot', express.static('API/upload/screenshot'));
app.use(express.static("public"));  //for use static file in pages
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


// route handalling
app.use(home);
app.use(messeges);
app.use(history);
app.use('/api/upload/posts', uploadItems);
app.use('/weather', weather);
app.use('/search', getWeather);
app.use(viewPost)
app.use(editPost);
app.use('/api/update/posts', updatePost);
app.use('/post/delete', deletePost);
app.use(logger);

app.listen(port, ()=>{
    console.log(`Server running on port ->> ${port}`);
})
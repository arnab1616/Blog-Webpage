const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

// import routers
const about = require('./routers/about');
const messeges = require('./routers/messeges');
const profile = require('./routers/profile');
const uploading = require('./routers/upload');
const home = require('./routers/home');
const history = require('./routers/history');
const uploadItems = require('./routers/uploadPost');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));  //for use static file in pages
app.use(bodyParser.urlencoded({ extended: true }));

// route handalling
app.use('/', home);
app.use('/about', about);
app.use('/messeges', messeges);
app.use('/profile', profile);
app.use('/upload', uploading);
app.use('/history', history);
app.use('/submit',uploadItems);

app.listen(port, ()=>{
    console.log(`Server running on port ->> ${port}`);
})
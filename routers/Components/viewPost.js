const  express = require('express');
const passport = require("passport");
const session = require("express-session");
require('dotenv').config();
const axios = require('axios');

const router = express.Router();
const API_URL = 'http://localhost:4200';

router.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      },
  }));
  
router.use(passport.initialize());
router.use(passport.session());

router.get('/post/view/:id', async (req,res)=>{
    try{
        const response = await axios.get(`${API_URL}/view/${req.params.id}`);
        console.log(response.data);
        if(req.isAuthenticated()){
            res.render('view.ejs', {view: response.data, logger: req.user.pic_url});
        } 
        else
        {res.render('view.ejs', {view: response.data});}
    } catch(err){
        console.error(err.message);
    }
});
router.get('/view/task/:id',async (req,res)=>{
    const response = await axios.get(`${API_URL}/view/task/${req.params.id}`)
    if(req.isAuthenticated()){
        res.render('view.ejs',{task: response.data, logger: req.user.pic_url});
    }
    else{
        res.render('view.ejs',{task: response.data});
    }
    console.log(response.data);
});


module.exports = router;
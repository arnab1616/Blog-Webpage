const  express = require('express');
const axios = require('axios');
const router = express.Router();
const passport = require("passport");
const session = require("express-session");
require('dotenv').config();

const API_URL = 'http://localhost:4200'

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

router.get('/', async (req,res)=>{
    try{
        const resp = await axios.get(`${API_URL}/posts`);
        if(req.isAuthenticated()){
            res.render('index.ejs', {posts: resp.data, logger: req.user.pic_url});
        }
        else{
            res.render('index.ejs', {posts: resp.data});
        }
    } catch(err){
        console.error(err.message);
    }
});
router.get('/upload',(req,res)=>{
    if(req.isAuthenticated()){
      res.render('upload.ejs');
    }
    else{ res.redirect('/login'); }
})
router.get("/about",(req,res)=>{
    if(req.isAuthenticated()){
        res.render('about.ejs',{logger: req.user.pic_url});
      }
      else{
        res.render('about.ejs')
    }
})
router.get("/profile",(req,res)=>{
    console.log(req.user);
    if(req.isAuthenticated()){
        res.render('profile.ejs',{user: req.user, logger: req.user.pic_url});
    }
    else{res.redirect('/login')};
})

module.exports = router;
const  express = require('express');
const passport = require("passport");
const session = require("express-session");
// const {isAuthenticated} = require('../passportConfig');
const router = express.Router();
require('dotenv').config();

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

router.get('/messeges',(req,res)=>{
  console.log(req.user);
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()){
    res.render('messeges.ejs',{logger: req.user.pic_url});
  }
  else{res.redirect('/login')};
})


module.exports = router;
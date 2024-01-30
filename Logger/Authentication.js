const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
const db = require("../DB/postgre");
const { initializingPassport} = require("./passportConfig");
const { initializigGooglePassport } = require("./google-OAuth-Config");
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

db.connect();

router.get("/login", (req, res) => {
  res.render("login.ejs");
});
router.get("/resister", (req, res) => {
  res.render("signup.ejs");
});
router.get('/logout',(req,res)=>{
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
})
router.get("/auth/google",
  passport.authenticate("google", { 
    scope: ["profile","email"],
    }
));

router.get(
  "/auth/google/secrets",
    passport.authenticate("google", {
      failureRedirect: "/login",
      successRedirect: "/"
    })
);
router.post("/resister", async (req, res) => {
  const fname = req.body.Name;
  const lname = req.body.Lastname;
  const email = req.body.email;
  const username = req.body.username;
  const phonenumber = req.body.phoneNumber;
  const password = req.body.Password;
  const cPassword = req.body.cPassword;
  try {
    const checkResult = await db.query(
      "SELECT * FROM users WHERE email = $1 ",
      [email]
    );
    if (checkResult.rows.length > 0) {
      res.status(404).send("Email already exists !!");
    } else {
      if (password === cPassword) {
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            console.error("Error hashing password:", err);
          } else {
            console.log("Hashed Password:", hash);
            const result = await db.query(
              "INSERT INTO users (email, password,fname,lname,userid,phonenumber,pic_url) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *",
              [email, hash, fname, lname, username, phonenumber,`http://localhost:8000/images/3135715.png`]
            );
            const user = result.rows[0];
            req.login(user, (err) => {
              if (err) throw err;
              res.redirect("/login");
            })
          }
        });
      } else {
        console.log(`New password: ${password}, Confirm password: ${cPassword}`);
        res.render("signup.ejs", { error: "Password dosn't match !! " });
      }
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/login",
  passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login"
    })
);
  
initializingPassport(passport);
initializigGooglePassport(passport);

module.exports = router;

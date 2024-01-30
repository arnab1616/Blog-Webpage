const GoogleStrategy = require("passport-google-oauth2").Strategy;
const db = require("../DB/postgre");
require('dotenv').config();

exports.initializigGooglePassport = (passport) =>{
    passport.use("google",
        new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:8000/auth/google/secrets"
        },
        async (accessToken, refreshToken, profile, cb) => {
            try{
                // console.log(profile);
                const userDetail = profile._json
                const result = await db.query("SELECT * FROM  users WHERE email = $1", [profile.email]);
                if(result.rows.length === 0){
                    await db.query(
                        "INSERT INTO users (email, password,fname,lname,userid,pic_url) VALUES ($1,$2,$3,$4,$5,$6)",
                        [profile.email, profile.id,userDetail.given_name,userDetail.family_name,userDetail.name,userDetail.picture]
                    );
                    const newUser = await db.query("SELECT * FROM users WHERE email = $1",[profile.email])
                    console.log(newUser.rows[0]);
                    return cb(null, newUser.rows[0]);
                } else {
                    console.log(result.rows[0]);
                    return cb(null,result.rows[0]);
                }
            } catch(err){
                return cb(err);
            }
        })
    )
};
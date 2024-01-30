const bcrypt = require("bcryptjs");
const {Strategy} = require("passport-local");
const db = require('../DB/postgre');

exports.initializingPassport = (passport) =>{
    passport.use("local",
        new Strategy(async function verify(username, password, cb){
          try{
              const result = await db.query('SELECT * FROM users WHERE email = $1',
              [username]);
              if(result.rows.length > 0){
                  const user = result.rows[0];
                  const storedHashedPassword = user.password;
                  bcrypt.compare(password,storedHashedPassword, (err,valid)=>{
      
                      if (err) {
                          //Error with password check
                          console.error("Error comparing passwords:", err);
                          return cb(err);
                        } else {
                          if (valid) {
                            //Passed password check
                            return cb(null, user);
                          } else {
                            //Did not pass password check
                            return cb(null, false);
                          }
                        }
                  });
      
              } 
              else{ return cb("User not foud"); }
          } 
          catch(err){
              console.log(err);
          }
      }));
      passport.serializeUser((user, cb) => {
          cb(null, user);
      });
      passport.deserializeUser((user, cb) => {
          cb(null, user);
      });
};

exports.isAuthenticated = (req,res,next) =>{
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

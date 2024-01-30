const  express = require('express');
const axios = require('axios');
const db = require('..//../DB/postgre')
const {uploadImages} = require('..//../middleware')
const router = express.Router();
const API_URL = 'http://localhost:4200';

router.get("/post/edit/:id",async (req,res)=>{
    try{
        if(req.isAuthenticated()){
            const response = await axios.get(`${API_URL}/view/${req.params.id}`);
            console.log(response.data);
            res.render('upload.ejs', {post: response.data})
        } else{
            res.redirect('/login');
        }
    } catch(err){
        console.error(err.message);
    }
})
router.post("/edit/user/profile",uploadImages, async (req,res)=>{
    try{
        if(req.isAuthenticated()){
            try{
                const response = await db.query('UPDATE users SET userid = ($1), pic_url = ($2) WHERE email = ($3)',[
                    req.body.username,
                    `http://localhost:8000/file/${req.file.filename}`,
                    req.user.email
                ])
                console.log(req.user)
                res.redirect("/profile");
            } catch(err){
                console.error(err);
            }
        } else{
            res.redirect('/login');
        }
    } catch(err){
        console.error(err.message);
    }
})

module.exports = router;
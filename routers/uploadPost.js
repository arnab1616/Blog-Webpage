const  express = require('express');
const {upload} = require('../middleware');
const axios = require('axios');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const API_URL = 'http://localhost:4200'

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        console.log(file);
        cb(null, 'API/upload/images');
    },
    filename: (req, file, cb)=>{
        console.log(file);
        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const uploadImages = multer({
    storage: storage,
}).single('file');
router.route('/').post(uploadImages, async (req,res)=>{
    try{
        if(req.body.Password === req.body.cPassword){
            await axios.post(`${API_URL}/upload/posts?image=${req.file.filename}`, req.body);
            res.redirect('/');  
        } 
        else if(req.body.Password !== req.body.cPassword){
            const resp = await axios.get('https://http.dog/403.json');
            console.log(resp.data.image.jpg)
            res.send(`
                <div style=" text-align:center; margin-top:20px;">
                    <img src="${resp.data.image.jpg}" alt="dog error image" style=" width:500px;">
                </div>`)
        }
    } catch(err){
        console.error(err.message)
        res.status(404).json({error : err.message})
    }
})

module.exports =  router;

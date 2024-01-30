const  express = require('express');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const API_URL = 'http://localhost:4200';

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        console.log(file);
        cb(null, 'API/upload/screenshot');
    },
    filename: (req, file, cb)=>{
        console.log(file);
        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const uploadImages = multer({
    storage: storage,
}).single('screenshot');

router.get('/history', async (req,res)=>{
    const response = await axios.get(`${API_URL}/task/all`)
    // console.log(response.data)
    if(req.isAuthenticated()){
        console.log(req.isAuthenticated())
        res.render('history.ejs',{task: response.data, logger: req.user.pic_url});
    } else{
        res.render('history.ejs',{task: response.data});
    }
    // res.json(response.data)
})
router.post('/add/task',uploadImages, async (req,res)=>{
    if(req.isAuthenticated()){
        console.log(req.isAuthenticated());
        const response = await axios.post(`${API_URL}/add/task?screenshot=${req.file.filename}&user_email=${req.user.email}`, req.body)
        res.redirect('/history');
        console.log(response.data);
    } else{
        res.redirect('/login');
    }

})

module.exports = router;
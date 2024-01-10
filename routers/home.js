const  express = require('express');
const fs = require('fs');
const router = express.Router();

let uploadDetail = '';
router.route('/').get((req,res)=>{
    fs.readFile("./uploads/items.html",'utf-8',(err,data) => {
        if (err){
            res.render('index.ejs');
        }
        else{
            uploadDetail ={
                html: data
            };
            res.render('index.ejs',{uploadDetail});
        }
    });
})

module.exports = router;
const  express = require('express');
const path = require('path');
const multer = require('multer');
// const bodyParser = require('body-parser');

const app = express();
const port = 7000;

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        console.log(file);
        cb(null, 'API/upload/images');
    },
    filename: (req,file,cb)=>{
        console.log(file);
        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
module.exports =  uploadImages = multer({
    storage: storage
})
// app.post('/upload/image', uploadImages.single('profile'), (req,res)=>{
//     res.json({img_url: `http://localhost:8000/file/${req.file.filename}`})
//     console.log(req.file.filename);
// })

// app.listen(port, ()=>{
//     console.log("Image run on ->> ",port)
// })
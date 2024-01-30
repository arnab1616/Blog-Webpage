const path = require('path');
const multer = require('multer');

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
exports.uploadImages = multer({
    storage: storage,
}).single('file');

// const axios = require("axios");
// const fs = require("fs");

// const upload = async (req,res,next) =>{
//     if(req.body.Password !== req.body.cPassword){
//         try{
//             const resp = await axios.get('https://http.dog/403.json');
//             console.log(resp.data.image.jpg)
//             res.send(`
//                 <div style=" text-align:center; margin-top:20px;">
//                     <img src="${resp.data.image.jpg}" alt="dog error image" style=" width:500px;">
//                 </div>`)
//         } catch(err){
//             console.error(err.message);
//         }
//     }   
//     next();
// }
// module.exports = {upload}
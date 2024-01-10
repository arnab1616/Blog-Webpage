const fs = require('fs');

const  elm = (req) =>{
    let html = 
    `<div class="myCard">
        <strong>${req.fName} ${req.lName} (${req.username})</strong> 
        <p>Email : ${req.email}</p>
        <p>Phone no. - ${req.phoneNumber}</p>
        <p>" ${req.bio} "</p>
        <a href="">View</a>
    </div>`

    return html;
}
let uploadDetail = '' ;
const elemnts = (req,res,next) =>{
        if(req.body.Password === req.body.cPassword){
        let html = elm(req.body)
        uploadDetail = {
            html : html
        }
        fs.appendFile("./uploads/items.html",html,(err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
       next();
    }
}
const postUploads = (req,res)=>{
    fs.readFile("./uploads/items.html",'utf-8',(err,data) => {
        if (err){res.render('index.ejs')}
        else{
            uploadDetail.html = data;
            res.render('index.ejs',{uploadDetail});
        }
    });
}
module.exports = {postUploads, elemnts};
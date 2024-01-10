
const upload = (req,res,next) =>{
    if(req.body.Password !== req.body.cPassword){
        res.status(404).send("<h1>You entered two different password </h1>")
    }   
    next();
}
module.exports = {upload}
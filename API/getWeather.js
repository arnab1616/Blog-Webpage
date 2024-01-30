const  express = require('express');
const axios = require('axios')
const router = express.Router();

const api = {
    key: "2fa73590fd8b5a4c6e68098ad5625395",
    base: "https://api.openweathermap.org/data/2.5/"
};

router.route('/').post(async (req,res)=>{
    const query = req.body.search;
     try{
        const result = await axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        const weatherDetails  = result.data;
        console.log(weatherDetails)
        if(req.isAuthenticated()){
            res.render('weather.ejs',{weatherDetails,logger: req.user.pic_url});
          }
          else{
            res.render('weather.ejs',{weatherDetails})
        }
        // res.json(weatherDetails);
        
    } catch(err){
        console.error(err.message);
    }
});

module.exports = router;
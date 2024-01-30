const  express = require('express');
const axios = require('axios');

const router = express.Router();
const API_URL = 'http://localhost:4200';

router.route('/:id').get(async (req,res)=>{
    try{
        console.log(req.isAuthenticated())
        if(req.isAuthenticated()){
            const response = await axios.delete(`${API_URL}/post/delete/${req.params.id}`);
            console.log(response.data);
            res.redirect('/');
        } else{
            res.redirect('/login');
        }
    } catch(err){
        const resp = await axios.get('https://http.dog/404.json');
        console.log(resp.data.image.jpg)
        res.send(`
            <div style=" text-align:center; margin-top:20px;">
                <img src="${resp.data.image.jpg}" alt="dog error image" style=" width:500px;">
            </div>`)
        console.error(err.message);
    }
})

module.exports = router;
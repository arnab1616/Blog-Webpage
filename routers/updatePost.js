const  express = require('express');
const {upload} = require('../middleware')
const axios = require('axios');

const router = express.Router();
const API_URL = 'http://localhost:4200';

router.route('/:id').post(async (req,res)=>{
    try{
            console.log(req.body);
            const response = await axios.patch(`${API_URL}/edit/${req.params.id}`, req.body);
            res.redirect('/');
    } catch(err){
        console.error(err.message);
    }
});

module.exports = router;
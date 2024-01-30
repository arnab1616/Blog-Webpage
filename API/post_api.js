const express = require('express');
const db = require('../DB/postgre');
const router = express.Router();

router.use(express.json());
function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Augst",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  }
//Get All posts
router.get('/posts', async (req,res)=>{
    const  response = await db.query('SELECT * FROM postcard');
    const postsCard = response.rows;
    res.status(200).json(postsCard);
})
//Get Specific post by id
router.get('/view/:id', async (req,res)=>{
    const id = parseInt(req.params.id)
    const  response = await db.query('SELECT * FROM postcard WHERE id = ($1)', [id]);
    const postView = response.rows[0];
    if(!postView){
        return res.json({error: "Post not found"});
    }
    console.log(postView)
    res.status(200).json(postView);
});
// router.get('/view/post', (req,res)=>{
//     const username = postsCard.find((post)=> post.username === toString(req.query.username));
//     const email = postsCard.find((post)=> post.email === toString(req.query.email));
//     console.log(username)
//     if(!username && !email){
//         return res.status(404).json({error: "Post not found"});
//     }
//     res.status(200).json(username);
// });

//Upload new Post
router.post('/upload/posts', async (req,res)=>{
    try{
        await db.query('INSERT INTO postcard (fname,lname,username,email,phonenumber,bio,img_url,date,password,cpassword) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',[
            req.body.fName,
            req.body.lName,
            req.body.username,
            req.body.email,
            req.body.phoneNumber,
            req.body.bio,
            `http://localhost:8000/file/${req.query.image}`,
            dateBuilder(new Date()),
            req.body.Password,
            req.body.cPassword,
        ]);
        res.status(201).json({massege: "Post Upload successfull !! "});
    } catch(err){
        console.log(err.massege);
    }
})

router.patch('/edit/:id',async (req,res)=>{
    const id = parseInt(req.params.id)
    try{
        await db.query('UPDATE postcard SET fname = ($1),lname= ($2),username= ($3),email= ($4),phonenumber = ($5),bio= ($6),date= ($7) WHERE id = ($8)', [
            req.body.fName,
            req.body.lName,
            req.body.username,
            req.body.email,
            req.body.phoneNumber,
            req.body.bio,
            dateBuilder(new Date()),
            id
        ]);
        res.status(201).json({massege: "Update Successful !! "});
    } catch(err){
        console.error(err.massege);
    }
});
router.delete('/post/delete/:id', async (req,res)=>{
    const id = parseInt(req.params.id);
    await db.query('DELETE FROM postcard WHERE id = ($1)',[id]);
    res.status(200).json({massege: "Post deleted !!"});
});

module.exports = router;
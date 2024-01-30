const express = require('express');
const db = require('../DB/postgre');
const router = express.Router();

// const tasksCard = [
//     {
//         id: 1,
//         projectname: "Blog webApp",
//         description: "Short Description Of Project. Just Acouple Sentences Will Do.",
//         reposetry_url: 'http://localhost:8000/history',
//         file: `http://localhost:8000/images/free-react-1-282599.webp`,
//         date: dateBuilder(new Date()),
//         time: time(new Date()),
//         houre: hour(new Date()),
//         min : min(new Date()),
//     },
//     {
//         id: 2,
//         projectname: "Youtube Clone",
//         description: "Short Description Of Project. Just Acouple Sentences Will Do.",
//         reposetry_url: 'http://localhost:8000/history',
//         file: `http://localhost:8000/images/free-react-1-282599.webp`,
//         date: dateBuilder(new Date()),
//         time: time(new Date()),
//         houre: hour(new Date()),
//         min : min(new Date()),
//     },
//     {
//         id: 3,
//         projectname: "Weather App",
//         description: "Short Description Of Project. Just Acouple Sentences Will Do.",
//         reposetry_url: 'http://localhost:8000/history',
//         file: `http://localhost:8000/images/free-react-1-282599.webp`,
//         date: dateBuilder(new Date()),
//         time: time(new Date()),
//         houre: hour(new Date()),
//         min : min(new Date()),
//     },
//     {
//         id: 4,
//         projectname: "Tictac Toe",
//         description: "Short Description Of Project. Just Acouple Sentences Will Do.",
//         reposetry_url: 'http://localhost:8000/history',
//         file: `http://localhost:8000/images/free-react-1-282599.webp`,
//         date: dateBuilder(new Date()),
//         time: time(new Date()),
//         houre: hour(new Date()),
//         min : min(new Date()),
//     },
// ];
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
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    // let time = d.getTime();
    return `${date}-${month}-${year}`;
  }
  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
function time(d){
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let s = addZero(d.getSeconds());
  let time = h + ":" + m;
  return time;
}
function hour(d){
  let h = addZero(d.getHours());
  return h;
}
function min(d){
  let m = addZero(d.getMinutes());
  return m;
}
router.use(express.json());

router.get('/task/all', async (req,res)=>{
  const response = await db.query('SELECT taskcard.id,taskcard.projectname,taskcard.description,taskcard.reposetry_url,taskcard.file,taskcard.date,taskcard.houre,taskcard.min,users.email,users.userid,users.pic_url FROM taskcard JOIN users ON taskcard.email=users.email')
  const tasksCard = response.rows;
  res.json(tasksCard);
})
router.post('/add/task', async (req,res)=>{
  try{
    await db.query('INSERT INTO taskcard (projectname,description,reposetry_url,file,date,time,houre,min,email) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',[
     req.body.projectname,
     req.body.description,
     req.body.projecturl,
     `http://localhost:8000/screenshot/${req.query.screenshot}`,
     req.body.projectdate,
     time(new Date()),
     hour(new Date()),
     min(new Date()),
     req.query.user_email,
    ]);
    res.status(201).json({massege: "Task add succesfully "});
  } catch(err){
    console.log(err.message);
  }
});

router.get('/view/task/:id',async (req, res)=>{
  const id = parseInt(req.params.id)
  console.log(id)
  const  response = await db.query('SELECT * FROM taskcard WHERE id = ($1)', [id]);
  const task = response.rows[0];
  console.log(task);
  res.status(200).json(task)
})

module.exports = router;
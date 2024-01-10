const  express = require('express');
const {upload} = require('../middleware');
const {postUploads, elemnts} = require('../controllers/elements')

const router = express.Router();

router.route('/').post(upload,elemnts,postUploads)

module.exports = router;
const express = require('express');
const router = express.Router();
const control = require('../controller/TaskController');



router.post('/AssignTask/:id',control.AssignTask );
router.get('/TakeTask/:id',control.TakeTask );


module.exports = router;
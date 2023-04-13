const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const router = express.Router();


const control = require('../controller/DataController');
const { updateMany } = require('../models/Datadb');




router.post('/InsertQuestion/:id', control.upload.single('image'),control.InsertQuestion );

router.post('/TakeQuestion/:id', control.TakeQuestion);

router.get('/RetryQuestion/:id',control.FSEretryQuestion);
router.patch('/FSEupdateQuesttion/:id',control.FSEupdateQuesttion);
router.delete('/FSEdeleteQuesttion/:id',control.FSEdeleteQuesttion);
router.post('/feedback',control.FSEPOSTQuestionsFeedback);
router.get('/feedback/:child_id',control.FSEGETQuestionsFeedback);
module.exports = router;

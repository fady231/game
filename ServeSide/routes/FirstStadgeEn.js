const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const router = express.Router();


const control = require('../controller/FirstStadgeEnConrtoller');
const { updateMany } = require('../models/FirstStadgeEndb');




router.post('/FSEinsertQuestion/:id', control.upload.single('image'),control.FSEinsertQuestion );

router.post('/FSEtakeQuestion/:id', control.FSEtakeQuestion);

router.get('/FSEretryQuestion/:id',control.FSEretryQuestion);
router.patch('/FSEupdateQuesttion/:id',control.FSEupdateQuesttion);
router.delete('/FSEdeleteQuesttion/:id',control.FSEdeleteQuesttion);
router.post('/feedback', control.FSEQuestionFeedback);
module.exports = router;

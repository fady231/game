const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const router = express.Router();


const control = require('../controller/FirstStadgeEnConrtoller');
const { updateMany } = require('../models/FirstStadgeEndb');




router.post('/FSEinsertQuestion/:id', control.upload.single('thing'),control.FSEinsertQuestion );

router.get('/FSEtakeQuestion/:id', control.FSEtakeQuestion);
router.get('/FSEretryQuestion/:id',control.FSEretryQuestion);
router.patch('/FSEupdateQuesttion/:id',control.FSEupdateQuesttion);
router.delete('/FSEdeleteQuesttion/:id',control.FSEdeleteQuesttion);

module.exports = router;
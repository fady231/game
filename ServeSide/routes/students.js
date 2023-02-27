const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const router = express.Router();

const control = require('../controller/studentController');
const { updateMany } = require('../models/studentdb');





router.post('/AddChild/:id', control.AddChild );

router.post('/StudentLogIn', control.StudenSignIn);

router.patch('/StudenUpdateInfo/:id', control.upload.single('image'),control.StudenUpdateInfo);
router.patch('/StudenUpdatePic/:id', control.upload.single('image'),control.StudenUpdatePic);
router.patch('/StudentUpdatePassword/:id',control.UpdatePassword);

router.delete('/SdeleteAccount/:id',control.deleteAccount);




module.exports = router;
const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const router = express.Router();

const control = require('../controller/parentController');
const { updateMany } = require('../models/parentdb');





router.post('/create', control.SignUp );

router.post('/login', control.SignIn);
router.patch('/ParentUpdateInfo/:id', control.upload.single('image'),control.ParentUpdateInfo);
router.patch('/ParentUpdatePic/:id', control.upload.single('image'),control.ParentUpdatePic);

router.patch('/ParentUpdatePassword/:id',control.UpdatePassword);

router.delete('/deleteAccount/:id',control.deleteAccount);




module.exports = router;
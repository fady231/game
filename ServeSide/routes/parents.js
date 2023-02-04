const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const router = express.Router();

const control = require('../controller/parentController');
const { updateMany } = require('../models/parentdb');





router.post('/create', control.SignUp );

router.post('/login', control.SignIn);


router.patch('/UpdatePassword/:id',control.UpdatePassword);

router.delete('/deleteAccount/:id',control.deleteAccount);




module.exports = router;
const express = require("express");
const router = express.Router();
const dataController = require("../controller/dataController");


router.get('/', dataController.getData);
router.post('/', dataController.sendData);


module.exports = router
const express = require('express');
const router = express.Router();
const feedbackController = require('../controller/feedbackController');

router.post('/:studentID/:taskID/:gameName', feedbackController.postFeedback);
router.get('/:studentID', feedbackController.getAllFeedback);

module.exports = router;
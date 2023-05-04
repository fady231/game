const Feedback = require("../models/Feedback");
const feedback = require("../models/Feedback");

// get all feedbacks for a particular student
exports.getAllFeedback = async (req, res) => {
  const { studentID } = req.params;
  try {
    const feedback = await Feedback.find({ studentID });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a particular feedback for a particular student and task
// exports.getFeedbackById = async (req,res) => {
//     const {feedbackID, studentID, taskID} = req.params;
//     try {
//         const feedback = await Feedback.findById()
//     }
// }

// create a feedback
exports.postFeedback = async (req, res) => {
  try {
    const {
      studentID,
      taskID,
      gameID,
      data1Attempts,
      data2Attempts,
      data3Attempts,
      data4Attempts,
      data5Attempts,
      data6Attempts,
    } = req.body;
    const feedback = new Feedback({
      studentID,
      taskID,
      gameID,
      data1Attempts,
      data2Attempts,
      data3Attempts,
      data4Attempts,
      data5Attempts,
      data6Attempts,
    });
    const newFeedback = await feedback.save();
    console.log(newFeedback);
    res.status(200).json({
      status: "Feedback added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      status: "Error adding feedback!",
      error: err,
    });
  }
};

const Feedback = require('../models/Feedback');
const feedback = require('../models/Feedback');
const Task = require('../models/Taskdb');

// get all feedbacks for a particular student
exports.getAllFeedback = async (req, res) => {
    const { studentID } = req.params;
    try {
        const feedback = await Feedback.find({ studentID });
        res.json(feedback);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

// get a particular feedback for a particular student and task
// exports.getFeedbackById = async (req,res) => {
//     const {feedbackID, studentID, taskID} = req.params;
//     try {
//         const feedback = await Feedback.findById()
//     }
// }


// create a feedback
exports.postFeedback = async (req, res) => {
    const { data1Attempts, data2Attempts, data3Attempts, data4Attempts, data5Attempts, data6Attempts } = req.body;
    const { studentID, taskID, gameName } = req.params;

    try {
        const feedback = new Feedback({
            studentID,
            taskID,
            gameName,
            data1Attempts,
            data2Attempts,
            data3Attempts,
            data4Attempts,
            data5Attempts,
            data6Attempts,
        });

        const task = await Task.findById( taskID );
        if (!task) {
            return res.status(404).json({
                message: "Task not found!"
            });
        }
        if (task.done[gameIndex]) {
            return res.status(400).json({
                message: "Task already marked as done!"
            });
        }

        // console.log(task);
        
        const gameIndex = task.gameName.indexOf(gameName);
        if (gameIndex === -1){
            throw new Error(`Game name ${gameName} not found in task ${taskID}`);
        }

        task.done[gameIndex] = true;
        await task.save();
        
        const newFeedback = await feedback.save();

        // console.log(newFeedback)

        res.status(200).json({
            status: 'Feedback added successfully!'
        });
    } catch (err) {
        res.status(500).json({
            status: "Error adding feedback!",
            error: err
        });
    }
}
const { default: mongoose } = require("mongoose");
const Feedback = require("../models/Feedback");
const Task = require("../models/Taskdb");
const Student = require("../models/studentdb");

// get all feedbacks for a particular student
exports.getAllFeedback = async (req, res) => {
  const { studentID } = req.params;

  // Validate if studentID exists in the database
  try {
    const student = await Student.findById(studentID);
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: "This student cannot be found!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  // Retrieve feedbacks associated with the studentID
  try {
    const feedbacks = await Feedback.find({ studentID });
    // Check if there is feedback for this student in database
    if (feedbacks.length === 0)
      return res
        .status(404)
        .json({ message: "NO feedback found for this student." });

    const tasksIDs = feedbacks.map((feedback) => feedback.taskID.toString());

    const newTasksIDs = tasksIDs.filter((id, i) => id !== tasksIDs[i - 1]);

    // const data = [];
    const returnedData = [];

    let counter = 0;

    const find = async (id) => {
      const task = await Task.findById(id).select(
        "_id Subject taskNumber gameName"
      );
      //   data.push(task);
      counter += 1;
      return { counter, data: task };
    };

    newTasksIDs.map((task, i) => {
      find(task, i).then(({ counter, data }) => {
        const feedID = feedbacks.find(
          (feed) => feed.taskID.toString() === data._id.toString()
        );
        returnedData.push({
          id: feedID._id,
          taskID: data._id,
          taskNumber: data.taskNumber,
          subject: data.Subject,
          gameName: data.gameName,
        });

        if (counter === newTasksIDs.length) {
          return res.status(200).json(returnedData);
        }
      });
    });

    // res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// create a feedback
exports.postFeedback = async (req, res) => {
  const {
    data1Attempts,
    data2Attempts,
    data3Attempts,
    data4Attempts,
    data5Attempts,
    data6Attempts,
  } = req.body;
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

    const task = await Task.findById(taskID);
    if (!task) {
      return res.status(404).json({
        message: "Task not found!",
      });
    }
    const gameIndex = task.gameName.indexOf(gameName);
    if (task.done[gameIndex]) {
      return res.status(400).json({
        message: "Task already marked as done!",
      });
    }

    // console.log(task);

    if (gameIndex === -1) {
      throw new Error(`Game name ${gameName} not found in task ${taskID}`);
    }

    task.done[gameIndex] = true;
    await task.save();

    const newFeedback = await feedback.save();

    // console.log(newFeedback)

    res.status(200).json({
      status: "Feedback added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      status: "Error adding feedback!",
      error: err.message,
    });
  }
};

//get feedback for student with taskID and gameName

exports.getFeedback = async (req, res) => {
  const { studentID, taskID, gameName } = req.params;

  try {
    const task = await Task.findOne({ taskID, gameName }).populate(
      "data1ID data2ID data3ID data4ID data5ID data6ID"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not foundt." });
    }

    const feedback = await Feedback.findOne({ studentID, taskID, gameName });
    // console.log(feedback);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback doesn't exist yet." });
    }

    const data = {
      subject: task.Subject,
      taskNumber: task.taskNumber,
      type: task.type,
      data1: {
        data: task.data1ID,
        attempts: feedback.data1Attempts,
      },
      data2: {
        data: task.data2ID,
        attempts: feedback.data2Attempts,
      },
      data3: {
        data: task.data3ID,
        attempts: feedback.data3Attempts,
      },
      data4: {
        data: task.data4ID,
        attempts: feedback.data4Attempts,
      },
      data5: {
        data: task.data5ID,
        attempts: feedback.data5Attempts,
      },
      data6: {
        data: task.data6ID,
        attempts: feedback.data6Attempts,
      },
    };

    // console.log(data);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Error sending feedback!",
      error: err.message,
    });
  }
};

exports.getAllFeedbackWithData = async (req, res) => {
  const { studentID } = req.params;

  // Validate if studentID exists in the database
  try {
    const student = await Student.findById(studentID);
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: "This student cannot be found!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  try {
    const feedbacks = await Feedback.find({ studentID }).populate({
      path: "taskID",
      populate: [
        { path: "data1ID", model: "Data" },
        { path: "data2ID", model: "Data" },
        { path: "data3ID", model: "Data" },
        { path: "data4ID", model: "Data" },
        { path: "data5ID", model: "Data" },
        { path: "data6ID", model: "Data" },
      ],
    });

    const modifiedFeedback = feedbacks.map((feedback) => {
      const modifiedData = {
        subject: feedback.taskID.Subject,
        taskNumber: feedback.taskID.taskNumber,
        gameName: feedback.gameName,
        data: [
          {
            ...getModifiedData(feedback.taskID.data1ID),
            attempts: feedback.data1Attempts,
          },
          {
            ...getModifiedData(feedback.taskID.data2ID),
            attempts: feedback.data2Attempts,
          },
          {
            ...getModifiedData(feedback.taskID.data3ID),
            attempts: feedback.data3Attempts,
          },
          {
            ...getModifiedData(feedback.taskID.data4ID),
            attempts: feedback.data4Attempts,
          },
          {
            ...getModifiedData(feedback.taskID.data5ID),
            attempts: feedback.data5Attempts,
          },
          {
            ...getModifiedData(feedback.taskID.data6ID),
            attempts: feedback.data6Attempts,
          },
        ],
      };
      return modifiedData;
    });
    // console.log(modifiedFeedback);
    res.json(modifiedFeedback);
  } catch (err) {
    res.status(500).json({
      message: "Error sending feedback!",
      error: err.message,
    });
  }
};

// helper function to manilpualte the data returned
function getModifiedData(data) {
  const { definitionInEn, numbers, sentence } = data;

  if (data.subjectName === ("english" || "en")) {
    if (!sentence) {
      return { word: definitionInEn };
    } else if (!definitionInEn) {
      return { sentence: sentence };
    } else {
      return {
        word: definitionInEn,
        sentence,
      };
    }
  } else if (data.subjectName === "math") {
    return numbers;
  }
}

exports.getFeedbackByTaskId = async (req, res) => {
  const { studentID, taskID } = req.params;

  // Validate if studentID exists in the database
  try {
    const student = await Student.findById(studentID);
    if (!student) {
      return res.status(404).json({ message: "This student cannot be found!" });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
  try {
    const task = await Task.findOne({ _id: taskID, studentID }).populate(
      "data1ID data2ID data3ID data4ID data5ID data6ID"
    );
    const feedbacks = await Feedback.find({ studentID, taskID });
    console.log(task);
    if (!feedbacks) {
      return res.status(404).json({ message: "Feedback doesn't exist yet." });
    }
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    const modifiedFeedback = feedbacks.map((feedback) => {
      const data = {
        // subject: task.Subject,
        // taskNumber: task.taskNumber,
        gameName: feedback.gameName,
        data: [
          {
            ...getModifiedData(task.data1ID),
            attempts: feedback.data1Attempts,
          },
          {
            ...getModifiedData(task.data2ID),
            attempts: feedback.data2Attempts,
          },
          {
            ...getModifiedData(task.data3ID),
            attempts: feedback.data3Attempts,
          },
          {
            ...getModifiedData(task.data4ID),
            attempts: feedback.data4Attempts,
          },
          {
            ...getModifiedData(task.data5ID),
            attempts: feedback.data5Attempts,
          },
          {
            ...getModifiedData(task.data6ID),
            attempts: feedback.data6Attempts,
          },
        ],
      };
      return data;
    });

    res.json(modifiedFeedback);
  } catch (err) {
    res.status(500).json({
      message: "Error sending feedback!",
      error: err.message,
    });
  }
};

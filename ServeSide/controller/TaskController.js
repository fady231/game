const Data = require("../models/Datadb");
const Task = require("../models/Taskdb");
const Student = require("../models/studentdb");

exports.AssignTask = async function (req, res, next) {
  try {
    const { taskno, subject, gamename, id1, id2, id3, id4, id5, id6 } =
      req.body;

    const done = [];
    gamename.forEach(() => done.push(false));

    // Check if all required fields are present in the request body
    if (
      !taskno ||
      !subject ||
      !gamename ||
      !id1 ||
      !id2 ||
      !id3 ||
      !id4 ||
      !id5 ||
      !id6
    ) {
      return res.status(400).json({
        status: "Missing required fields",
      });
    }
   
    // Check if a task with the same taskNumber already exists for the same studentID
    // Find all tasks for the given student ID
    const existingTasks = await Task.find({
      studentID: req.params.id,
    });

    // Filter tasks to find only the one with the matching task number
    const existingTask = existingTasks.filter(
      (task) => task.taskNumber === taskno
    )[0];

    if (existingTask) {
      res.status(400).json({
        status: "taskNumber already exists for the same studentID",
      });
    } else {
      // Update the taskCounter field using the $inc operator
      const result = await Student.updateOne(
        { _id: studentId },
        { $inc: { taskCounter: 1 } }
      ); // Update the taskCounter field using the $inc operator
      // Either task number or student ID not found, there is no data

      const task = new Task({
        studentID: req.params.id,
        taskNumber: taskno,
        gameName: gamename,
        Subject: subject,
        done,
        data1ID: id1,
        data2ID: id2,
        data3ID: id3,
        data4ID: id4,
        data5ID: id5,
        data6ID: id6,
      });

      await task.save();

      res.status(200).json({
        status: "Task assigned successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Error assigning task",
      error: err,
    });
  }
};

exports.TakeTask = function (req, res, next) {
  Task.find({
    studentID: req.params.id,
  })
    .then((tasks) => {
      if (tasks.length < 1) {
        return res.status(404).json({
          status: "No tasks found for this student ID.",
        });
      }

      const numTasks = req.body.numTasks; // Get the number of tasks requested from the request body
      const tasksToReturn =
        numTasks && numTasks <= tasks.length ? numTasks : tasks.length; // Determine the number of tasks to return

      // Create an empty array to store the task and data objects
      const taskDataArray = [];

      // Use Promise.all() to wait for all data retrieval promises to resolve before sending response
      Promise.all(
        tasks.slice(0, tasksToReturn).map((task, index) => {
          // Use .slice() to limit the number of tasks returned
          const dataIds = [
            task.data1ID,
            task.data2ID,
            task.data3ID,
            task.data4ID,
            task.data5ID,
            task.data6ID,
          ];

          // Return the promise returned by Data.find() to be included in Promise.all()
          return Data.find(
            {
              _id: { $in: dataIds },
            },
            { createdAt: 0, updatedAt: 0, __v: 0 }
          ) // Use projection to exclude fields
            .then((data) => {
              // Create an object that contains the task number, game name, and data objects
              const taskDataObject = {
                taskId: task._id,
                taskNumber: task.taskNumber,
                Subject: task.Subject,
                gameName: task.gameName,
                done: task.done,
                data: data.map((da) => ({
                  dataId: da._doc._id, // Add the data ID to each object in the data array
                  ...da._doc,
                  _id: undefined,
                })),
              };

              // Add the taskDataObject to the array
              taskDataArray.push(taskDataObject);

              // Check if all the requested tasks have been processed
              if (taskDataArray.length === tasksToReturn) {
                // Send the taskDataArray as the response
                res.status(200).json(taskDataArray);
              }
            })
            .catch((err) => {
              // Include error message in the taskDataArray if data retrieval fails
              const taskDataObject = {
                taskNumber: task.taskNumber,
                gameName: task.gameName,
                done: task.done,
                data: [],
                error: err.message,
              };

              // Add the taskDataObject to the array
              taskDataArray.push(taskDataObject);

              // Check if all the requested tasks have been processed
              if (taskDataArray.length === tasksToReturn) {
                // Send the taskDataArray as the response
                res.status(200).json(taskDataArray);
              }
            });
        })
      ).catch((err) => {
        res.status(404).json({
          status: "Error retrieving data objects.",
          error: err,
        });
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: "Error retrieving tasks.",
        error: err,
      });
    });
};

exports.updateTask = async function (req, res, next) {
  try {
    const { taskno, gamename, id1, id2, id3, id4, id5, id6 } = req.body;

    // Check if all required fields are present in the request body
    if (!taskno || !gamename || !id1 || !id2 || !id3 || !id4 || !id5 || !id6) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const updatedTask = await Task.findOneAndUpdate(
      {
        studentID: req.params.id,
        taskNumber: taskno,
      },
      {
        gameName: gamename,
        data1ID: id1,
        data2ID: id2,
        data3ID: id3,
        data4ID: id4,
        data5ID: id5,
        data6ID: id6,
      },
      {
        new: true,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating task",
      error: err,
    });
  }
};

exports.DeleteTask = async function (req, res, next) {
  try {
    const taskId = req.params.taskId;

    const result = await Task.deleteOne({ _id: taskId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting task",
      error: err,
    });
  }
};


exports.getTasksByStudentId = async (req, res) => {
  const { studentID } = req.params;
  try {
    const tasks = await Task.find({studentID}).populate('data1ID data2ID data3ID data4ID data5ID data6ID');
    if (tasks.length === 0) {
      return res.status(404).json({ message: 'There is no tasks for this student.' });
    }

    console.log(tasks);

    res.status(200).json(tasks);

  } catch (err) {
    res.status(500).json({
      message: 'Error sending task!',
      error: err.message
    });
  }
}

// get task by its id and student id
exports.getTaskById = async (req, res) => {
  const { taskID } = req.params;
  try {
    const task = await Task.findOne({ taskID });
    if (!task) {
      res.status(404).json({ message:"This task isn't available" });
    }

    res.json(task);
  } catch(err) {
    res.status(500).json({
      message: "Error sending task",
      error: err.message
    })
  }
}
// module.exports = {
//   AssignTask: AssignTask,
//   TakeTask: TakeTask,
//   getTasksByStudentId: this.getTasksByStudentId,
// };

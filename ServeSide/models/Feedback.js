const { string } = require('joi');
const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema({
    studentID: {
      type: String,
        ref: 'Student',
        required: true
    },
    taskID: {
      type: String,
        ref: 'Task',
        required: true,
      },
      data1Attempts: {
        type: Number,
        default: 0,
      },
      data2Attempts: {
        type: Number,
        default: 0,
      },
      data3Attempts: {
        type: Number,
        default: 0,
      },
      data4Attempts: {
        type: Number,
        default: 0,
      },
      data5Attempts: {
        type: Number,
        default: 0,
      },
      data6Attempts: {
        type: Number,
        default: 0,
      },
    }, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
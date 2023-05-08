const mongoose = require("mongoose");
const Data = require('./Datadb')
const taskSchema = new mongoose.Schema(
  {
    studentID: {
      type: String,
      ref: "Student",
      required: true,
    },
    Subject: {
      type: String,
      required: true,
    },
    taskNumber: {
      type: Number,
      required: true,
    },
    gameName: {
      type: [String],
      required: true,
    },
    done: {
      type: Array,
      required: true,
    },
    data1ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data", // Reference to the data document
      required: true,
    },
    data2ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data", // Reference to the data document
      required: true,
    },
    data3ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data", // Reference to the data document
      required: true,
    },
    data4ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data", // Reference to the data document
      required: true,
    },
    data5ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data", // Reference to the data document
      required: true,
    },
    data6ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data", // Reference to the data document
      required: true,
    },
    taskCounter: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);

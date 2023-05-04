const mongoose = require("mongoose");

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
      type: String,
      ref: "Data1",
      required: true,
    },
    data2ID: {
      type: String,
      ref: "Data2",
      required: true,
    },
    data3ID: {
      type: String,
      ref: "Data3",
      required: true,
    },
    data4ID: {
      type: String,
      ref: "Data4",
      required: true,
    },
    data5ID: {
      type: String,
      ref: "Data5",
      required: true,
    },
    data6ID: {
      type: String,
      ref: "Data6",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  taskNumber: {
    type: Number,
    required: true,
    unique: true
  },
  gameName: {
    type: [String],
    required: true
  },
  done: {
    type: Boolean,
    required: true
  },
  data1ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Data1",
    required: true
  },
  data2ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Data2",
    required: true
  },
  data3ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Data3",
    required: true
  },
  data4ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Data4",
    required: true
  },
  data5ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Data5",
    required: true
  },
  data6ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Data6",
    required: true
  },
}, {timestamps: true});

// Create a unique index on TaskNumber for each StudentID
taskSchema.index({ StudentID: 1, TaskNumber: 1 }, { unique: true });




module.exports = mongoose.model("Task", taskSchema);

const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentUserName: {
    type: String,
    required: true,
  },
  studentPassword: {
    type: String,
    required: true,
  },
  studentAge: {
    type: Number,
    min: 1,
    max: 99,
    required: false,
  },
  studentstage: {
    type: Number,
    required: true,
  },
  studentRank: {
    type: Number,
    min: 11,
    required: false,
  },
  studentParent: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("students", StudentSchema);

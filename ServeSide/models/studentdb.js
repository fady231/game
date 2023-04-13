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
  }, studentPic: {
    type: String,
  
    required: false,
  },
  studentGrade: {
    type: Number,
    required: true,
  },
  studentRank: {
    type: Number,
    min: 11,
    required: false,
  },
  studentParent: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
StudentSchema.index({ studentUserName: 1, studentParent: 1 }, { unique: true });
module.exports = mongoose.model("students", StudentSchema);

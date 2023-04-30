const Student = require("../models/studentdb");
const User = require("../models/parentdb");
const bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, call) {
    call(null, "./StudentProfilePic/");
  },
  filename: function (req, file, call) {
    if (req.body.worden) {
      call(null, req.body.worden.replace(/\.[^/.]+$/, "") + "_" + Date.now() + ".png");
    } 
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 8,
  },
});

AddChild = function (req, res, next) {
  User.findById(req.params.id)
    .then((parent) => {
      if (!parent) {
        return res.status(404).json({
          message: "Parent not found",
        });
      }

      Student.findOne({ studentUserName: req.body.username })
        .then((existingStudent) => {
          if (existingStudent) {
            return res.status(409).json({
              student: {
                status: "Username already exists",
              },
            });
          }

          bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
              const student = new Student({
                studentUserName: req.body.username,
                studentName: req.body.name,
                studentPassword: req.body.password,
                studentGrade: req.body.grade,
                studentAge: req.body.age,
                studentParent: parent._id,
                studentPic: "Profile/default.png",
              });

              student
                .save()
                .then((result) => {
                  res.status(200).json({
                    student: {
                      status: "Child was added successfully",
                      _id: result._id,
                      studentName: result.studentName,
                      studentUserName: result.studentUserName,
                      studentPassword: result.studentPassword,
                      studentGrade: result.studentGrade,
                    },
                  });
                })
                .catch((error) => {
                  res.status(500).json({
                    message: "Internal server error",
                    error: error,
                  });
                });
            })
            .catch((error) => {
              res.status(500).json({
                message: "Internal server error",
                error: error,
              });
            });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Internal server error",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    });
};

const studentSignIn = async (req, res, next) => {
  try {
    const student = await Student.findOne({ studentUserName: req.body.username }).select("_id studentName studentPassword studentAge studentPic studentGrade studentParent");
    
    if (!student) {
      return res.status(404).json({
        student: {
          status: "Wrong username",
        },
      });
    }

    // Compare the plain text password with the stored password
    if (req.body.password === student.studentPassword) {
      return res.status(200).json({
        student: {
          status: "Correct password",
          studentID: student._id,
          ParentID: student.studentParent,
          studentName: student.studentName,
          studentUserName: student.studentUserName,
          studentAge: student.studentAge,
          studentPic: student.studentPic,
          studentGrade: student.studentGrade,
        },
      });
    } else {
      return res.status(404).json({
        student: {
          status: "Wrong password",
        },
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

StudentUpdateInfo = function (req, res, next) {
  Student.findOne({ _id: req.params.id })
    .then((student) => {
      Student.findOne({ studentUserName: req.body.newusername })
        .then((result) => {
          if (result && result._id != req.params.id) {
            res.status(404).json({
              message: "Username already exists",
            });
          } else {
            const studentInfo = {
              studentUserName: req.body.newusername,
              studentName: req.body.newname,
              studentstage: req.body.newstage,
              studentPic: req.file.path,
            };

            Student.updateOne({ _id: req.params.id }, studentInfo)
              .then(() => {
                res.status(202).json({
                  message: "Updated successfully",
                });
              })
              .catch((err) => {
                res.status(404).json({
                  message: err,
                });
              });
          }
        })
        .catch((err) => {
          res.status(404).json({
            message: "Error finding username",
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Error finding student ID",
      });
    });
};

UpdatePassword = function (req, res, next) {
  Student.findById(req.params.id)
    .then((student) => {
      if (!student) {
        return res.status(404).json({
          massage: "error in student id",
        });
      }
      bcrypt
        .hash(req.body.newpassword, 10)
        .then((hash) => {
          student.studentPassword = hash;
          student
            .save()
            .then(() => {
              res.status(202).json({
                message: "password updated successfully",
              });
            })
            .catch((err) => {
              res.status(404).json({
                message: err,
              });
            });
        })
        .catch((err) => {
          res.status(404).json({
            message: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: "error in student id",
      });
    });
};

deleteAccount = function (req, res, next) {
  Student.findOneAndDelete({ _id: req.params.id })
    .then((resualt) => {
      res.status(202).json({
        massage: "account sucssufully deleted",
      });
    })
    .catch((err) => {
      res.status(404).json({
        massage: err,
      });
    });
};

module.exports = {
  StudentSignIn: StudentSignIn,
  AddChild: AddChild,
  StudentUpdateInfo: StudentUpdateInfo,
  UpdatePassword: UpdatePassword,
  deleteAccount: deleteAccount,
  upload: upload,
};

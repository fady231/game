const Student = require("../models/studentdb");
const User = require("../models/parentdb");
const bcrypt = require("bcrypt");
const multer = require("multer");



const storage = multer.diskStorage({
  destination: function (req, file, call) {
    call(null, "./StudentProfilePic/");
  },
  filename: function (req, file, call) {
    call(null, `${(file.originalname + new Date().toDateString())}.png`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 8,
  },
});






AddChild = function (req, res, next) {
  User.find({ _id: req.params.id })
    .then((resualt) => {

      Student.find({ studentUserName: req.body.username })
        .then((resualt) => {
          if (resualt.length < 1) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                res.status(404).json({
                  massage: err,
                });
              } else {
                const student = new Student({
                  studentUserName: req.body.username,
                  studentName: req.body.name,
                  studentPassword: hash,
                  studentstage: req.body.stage,
                  studentParent: req.params.id,
                  studentPic: 'Profile/defualt.png'
                });
                student
                  .save()
                  .then((resualt) => {
                    res.status(200).json({
                      massage: "account successfully created",
                      student: resualt
                    });
                  })
                  .catch((err) => {
                    res.status(404).json({
                      massage: err,
                    });
                  });
              }
            });
          } else {
            res.status(404).json({
              massage: "this user name is already registered",

            });
          }
        })
        .catch((err) => {
          res.status(404).json({
            massage: err,
          });
        });
    }
    )
    .catch((err) => {
      res.status(404).json({
        massage: "error in parent id ",
      });
    });
};

StudenSignIn = function (req, res, next) {
  Student.find({ studentUserName: req.body.username })
    .then((student) => {
      if (student.length >= 1) {
        bcrypt
          .compare(req.body.password, student[0].studentPassword)
          .then((resualt) => {
            if (resualt) {
              res.status(200).json({
                massage: "correct password",
                student: student[0]
              });
            } else {
              res.status(404).json({
                massage: "wrong password",
              });
            }
          })
          .catch((err) => {
            res.status(404).json({
              massage: err,
            });
          });
      } else {
        res.status(404).json({
          massage: "wrong user name",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        massage: err,
      });
    });
};

StudenUpdateInfo = function (req, res, next) {
  Student.find({ _id: req.params.id })
    .then((student) => {
      Student.find({ studentUserName: req.body.newusername })
        .then((resualt) => {
          if (resualt.length < 1) {
            const student = {
              studentUserName: req.body.newusername,
              studentName: req.body.newname,
              studentstage: req.body.newstage,
            };
            Student.updateOne({ $set: student })
              .then((resualt) => {
                res.status(202).json({
                  massage: "updated sucssfully",
                });
              })
              .catch((err) => {
                res.status(404).json({
                  massage: err,
                });
              });
          }
          else {
            res.status(404).json({
              massage: "user name already exists",
            });
          }
        })
    })
    .catch((err) => {
      res.status(404).json({
        massage: "error in student id ",
      });
    });
}


StudenUpdatePic = function (req, res, next) {
  Student.find({ _id: req.params.id })
    .then((resualt) => {
      const student = {
   
        studentPic: req.file.path
      };
      Student.updateOne({ $set: student })
        .then((resualt) => {
          res.status(202).json({
            massage: "updated sucssfully",
          });
        })
        .catch((err) => {
          res.status(404).json({
            massage: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
      massage: "error in student id ",
      });
    });
}


UpdatePassword = function (req, res, next) {
  Student.find({ _id: req.params.id })
    .then((student) => {
      bcrypt
        .hash(req.body.newpassword, 10)
        .then((hash) => {
          const student = {
            studentPassword: hash,
          };
          Student.updateOne({ $set: student })
            .then((resualt) => {
              res.status(202).json({
                massage: "password updated sucssfully",
              });
            })
            .catch((err) => {
              res.status(404).json({
                massage: err,
              });
            });
        })
        .catch((err) => {
          res.status(404).json({
            massage: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        massage: "error in student id ",
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
  StudenSignIn: StudenSignIn,
  AddChild: AddChild,
  StudenUpdateInfo: StudenUpdateInfo,
  StudenUpdatePic: StudenUpdatePic,
  UpdatePassword: UpdatePassword,
  deleteAccount: deleteAccount,
  upload: upload
};

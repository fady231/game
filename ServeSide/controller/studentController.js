const Student = require("../models/studentdb");
const User = require("../models/parentdb");
const bcrypt = require("bcrypt");

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
                  });
                  student
                    .save()
                    .then((resualt) => {
                      console.log(student);
                      res.status(200).json({
                        massage: "account successfully created",
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
                massage: "this mail is already registered",
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
                info:student
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

UpdatePassword = function (req, res, next) {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const student = {
        studentName: req.body.name,
        studentPassword: hash,
      };
      Student.updateOne({ _id: req.params.id }, { $set: student })
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
  UpdatePassword: UpdatePassword,
  deleteAccount: deleteAccount,
};

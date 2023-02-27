const User = require("../models/parentdb");
const Student = require("../models/studentdb");
const bcrypt = require("bcrypt");
const multer = require("multer");



const storage = multer.diskStorage({
  destination: function (req, file, call) {
    call(null, "./ParentProfilePic/");
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


SignUp = function (req, res, next) {
  User.find({ parentMail: req.body.mail })
    .then((resualt) => {
      if (resualt.length < 1) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(404).json({
              massage: err,
            });
          } else {
            const user = new User({
              parentAge: req.body.age,
              parentMail: req.body.mail,
              parentName: req.body.name,
              parentPassword: hash,
              parentPhoneNumber: req.body.phone,
              parentPic: 'Profile/defualt.png'
            });
            user
              .save()
              .then((resualt) => {

                res.status(200).json({
                  massage: "account successfully created",
                  parent: resualt

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
};



SignIn = function (req, res, next) {
  User.find({ parentMail: req.body.mail })
    .then((user) => {

      if (user.length >= 1) {
        bcrypt
          .compare(req.body.password, user[0].parentPassword)
          .then((resualt) => {
            if (resualt) {
              Student.find({ studentParent: user[0]._id }).then((children) => {

                res.status(200).json({
                  massage: "correct password",
                  parent: user[0], children
                });
              }).catch((err) => {
                res.status(200).json({
                  massage: "correct password",
                  info: { parent: user }
                });
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
          massage: "wrong mail",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        massage: err,
      });
    });
};

ParentUpdateInfo = function (req, res, next) {
  User.find({ _id: req.params.id })
    .then((student) => {
      User.find({ parentMail: req.body.newmail })
        .then((resualt) => {
          if (resualt.length < 1) {
            const student = {
              parentMail: req.body.newmail,
              parentName: req.body.newname,
              parentAge: req.body.newage,
              parentPhoneNumber:req.body.newphonenumber,
            };
            User.updateOne({ $set: student })
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
              massage: "mail already exists",
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


ParentUpdatePic = function (req, res, next) {
  User.find({ _id: req.params.id })
    .then((resualt) => {
      const parent = {
 
        parentPic: req.file.path
      };
      User.updateOne({ $set: parent })
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
      massage: "error in parent id ",
      });
    });
}


UpdatePassword = function (req, res, next) {
  User.find({ _id: req.params.id })
    .then((resualt) => {
      bcrypt
        .hash(req.body.newpassword, 10)
        .then((hash) => {
          const parent = {
            parentPassword: hash,
          };
          User.updateOne({ $set: parent })
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
        massage: "error in parent id ",
      });
    });
};


deleteAccount = function (req, res, next) {
  User.findOneAndDelete({ _id: req.params.id })
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
  SignIn: SignIn,
  SignUp: SignUp,
  ParentUpdateInfo: ParentUpdateInfo,
  ParentUpdatePic:ParentUpdatePic,
  UpdatePassword: UpdatePassword,
  deleteAccount: deleteAccount,
  upload: upload
};

const User = require("../models/parentdb");
const bcrypt = require("bcrypt");

SignUp = function (req, res, next) {
  User.find({ userMail: req.body.mail })
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
              
            });
            user
              .save()
              .then((resualt) => {
                console.log(user);
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
};




SignIn = function (req, res, next) {
  User.find({ parentMail: req.body.mail })
    .then((user) => {
      if (user.length >= 1) {
        bcrypt
          .compare(req.body.password, user[0].parentPassword)
          .then((resualt) => {
            if (resualt) {

              res.status(200).json({
                massage: "correct password",
                info:  user
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

UpdatePassword = function (req, res, next) {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        userName: req.body.name,
        userPassword: hash,
      };
      User.updateOne({ _id: req.params.id }, { $set: user })
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
  UpdatePassword:UpdatePassword,
  deleteAccount:deleteAccount,
};

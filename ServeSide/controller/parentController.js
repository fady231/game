const User = require("../models/parentdb");
const Student = require("../models/studentdb");
const bcrypt = require("bcrypt");
const multer = require("multer");
const nodemailer = require('nodemailer');
const crypto = require('crypto');




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./ParentProfilePic/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}_${new Date().getTime()}.png`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 8,
  },
});

SignUp = function (req, res, next) {
  User.findOne({ parentMail: req.body.mail })
    .select('parentName parentMail _id parentPhoneNumber parentAge')
    .then((result) => {
      if (!result) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(404).json({
              message: err,
            });
          } else {
            const user = new User({
              parentAge: req.body.age,
              parentMail: req.body.mail,
              parentName: req.body.name,
              parentPassword: hash,
              parentPhoneNumber: req.body.phone,
              profilePictureUrl: "Profile/default.png",
            });
            user
              .save()
              .then((result) => {
                res.status(200).json({
                  
                  parent: {
                    status: "account successfully created",
                    _id: result._id,
                    parentName: result.parentName,
                    parentMail: result.parentMail,
                    parentPhoneNumber: result.parentPhoneNumber,
                    parentAge: result.parentAge,
                  },
                });
              })
              .catch((err) => {
                res.status(404).json({
                  message: err,
                });
              });
          }
        });
      } else {
        res.status(409).json({
          parent: {
            status: "this mail is already registered",
          },
          
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};



const SignIn = function (req, res, next) {
  

  User.findOne({ parentMail: req.body.mail })
    .select('parentName parentPassword parentMail profilePictureUrl _id parentPhoneNumber parentAge')
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          parent: {
            status: "wrong mail",
          }
        });
      }

      bcrypt.compare(req.body.password, user.parentPassword)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(404).json({
              parent: {
                status: "wrong password",
              }
            });
          }

          Student.find({ studentParent: user._id })
            .select('_id studentName studentUserName studentAge studentPic studentGrade studentPassword taskCounter')
            .then((children) => {
              const responseData = {
                parent: {
                  status: "correct password",
                  _id: user._id,
                  parentName: user.parentName,
                  parentMail: user.parentMail,
                  parentPhoneNumber: user.parentPhoneNumber,
                  parentAge: user.parentAge,
                  parentProfilePic: user.profilePictureUrl,
                },
                children: children.map((child) => ({
                  _id: child._doc._id,
                  studentName: child._doc.studentName,
                  studentUserName: child._doc.studentUserName,
                  studentAge: child._doc.studentAge,
                  studentPic: child._doc.studentPic,
                  studentGrade: child._doc.studentGrade,
                  studentPassword: child._doc.studentPassword,
                  taskCounter: child._doc.taskCounter,
                })),
              };

              res.status(200).json(responseData);
            })
            .catch((err) => {
              res.status(404).json({
                massage: err,
              });
            });
        })
        .catch((err) => {
          res.status(404).json({
            massage: "err",
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        massage: err,
      });
    });
};








ParentUpdate = function (req, res, next) {
  User.find({ _id: req.params.id })
    .then((user) => {
      User.find({ parentMail: req.body.newmail })
        .then((result) => {
          if (result.length < 1 || (result.length === 1 && result[0]._id.equals(req.params.id))) {
            const parent = {
              parentMail: req.body.newmail,
              parentName: req.body.newname,
              parentAge: req.body.newage,
              parentPhoneNumber: req.body.newphonenumber,
            };
            if (req.file) {
              parent.parentPic = req.file.path;
            }
            User.updateOne({ $set: parent })
              .then((result) => {
                res.status(202).json({
                  massage: "updated successfully",
                });
              })
              .catch((err) => {
                res.status(404).json({
                  massage: err,
                });
              });
          } else {
            res.status(404).json({
              massage: "mail already exists",
            });
          }
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



/*

const updatePassword = async (req, res, next) => {
  try {
    // Find the user by their email
    const user = await User.findOne({ parentMail: req.body.email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a random token
    const token = crypto.randomBytes(20).toString('hex');

    // Update the user's reset token and expiration date
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // Token will expire in 1 hour

    // Save the user's updated data
    await user.save();

    // Send an email to the user with a link to reset their password
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your_email_address@gmail.com',
        pass: 'your_email_password',
      },
    });

    const mailOptions = {
      from: 'your_email_address@gmail.com',
      to: user.parentMail,
      subject: 'Password Reset Request',
      html: `
        <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
        <p>Please click on the following link, or paste it into your browser to complete the process:</p>
        <a href="http://${req.headers.host}/reset/${token}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Return a success message
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    // Return an error message
    res.status(500).json({ message: error.message });
  }
};
*/


deleteAccount = function (req, res, next) {
  User.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      res.status(202).json({
        message: "account successfully deleted",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
};



module.exports = {
  SignIn: SignIn,
  SignUp: SignUp,
  ParentUpdate: ParentUpdate,
  //UpdatePassword: UpdatePassword,
  deleteAccount: deleteAccount,
  upload: upload
};

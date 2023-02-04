const FSEquestion = require("../models/FirstStadgeEndb");
const Student = require("../models/studentdb");
const multer = require("multer");
const fs = require("file-system");
/*
const fileFilter = function(req,file,call){
  if(file.mimetype==='image/png')
  {
    call(null,true)
  }
  else{
    call(new Error('please upload png file'),false)
  }

}*/
const storage = multer.diskStorage({
  destination: function (req, file, call) {
    call(null, "./FSEimage/");
  },
  filename: function (req, file, call) {
    call(null, `FSE${new Date().toDateString()}.png`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

FSEinsertQuestion = function (req, res, next) {
  const question = FSEquestion({
    Student: req.params.id,
    Unit: req.body.unit,
    Lesson: req.body.lesson,
    DefintioninAc: req.body.defintionac,
    DefintioninEn: req.body.defintionen,

    Image: fs.readFileSync("FSEimage/" + req.file.filename),
  });

  question
    .save()
    .then((inserting) => {
      res.status(200).json({
        massage: "inserting question succssufully",
      });
    })
    .catch((err) => {
      res.status(404).json({
        massage: "error",
      });
    });
};

FSEtakeQuestion = function (req, res, next) {
  FSEquestion.find({
    Parent: req.params.id,
    Lesson: req.body.lesson,
    Unit: req.body.unit,
  })
    .limit(6)
    .then((resualt) => {
      if (resualt.length < 1) {
        res.status(404).json({
          question: "sorry no inserting question till yet ",
        });
      } else {
        res.status(200).json({
          question: resualt,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        massage: err,
      });
    });
};

FSEretryQuestion = function (req, res, next) {
  FSEquestion.find({
    _id: {
      $in: [
        req.body.id1,
        req.body.id2,
        req.body.id3,
        req.body.id4,
        req.body.id5,
        req.body.id6,
      ],
    },
  })

    .then((resualt) => {
      if (resualt.length < 1) {
        res.status(404).json({
          question: "sorry no inserting question till yet ",
        });
      } else {
        res.status(200).json({
          question: resualt,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        massage: err,
      });
    });
};

FSEupdateQuesttion = function (req, res, next) {};

FSEdeleteQuesttion = function (req, res, next) {};

module.exports = {
  FSEinsertQuestion: FSEinsertQuestion,
  FSEtakeQuestion: FSEtakeQuestion,
  FSEupdateQuesttion: FSEupdateQuesttion,
  FSEdeleteQuesttion: FSEdeleteQuesttion,
  upload: upload,
  FSEretryQuestion: FSEretryQuestion,
};

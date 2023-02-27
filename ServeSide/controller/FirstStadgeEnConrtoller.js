const FSEquestion = require("../models/FirstStadgeEndb");
const FBQuestion = require ("../models/Feedback")
const Student = require("../models/studentdb");
const multer = require("multer");

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
    call(null, `FSE_${req.body.defintionen+new Date().toDateString()}.png`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
});

FSEinsertQuestion = function (req, res, next) {
  const question = FSEquestion({
    Parent: req.params.id,
    Unit: req.body.unit,
    Lesson: req.body.lesson,
    Stadge:req.body.stadge,
    DefintioninAc: req.body.defintionac,
    DefintioninEn: req.body.defintionen,
    Image:req.file.path
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
        massage: err,
      });
    });
};



FSEtakeQuestion = function (req, res, next) {
  FSEquestion.find({
    Stadge:req.body.stadge,
    Parent: req.params.id,
    Lesson: req.body.lesson,
    Unit: req.body.unit,
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

FSEPOSTQuestionsFeedback = function (req, res, next) {
  const FbQuestion = new FBQuestion(req.body);
  console.log("🚀 ~ file: FirstStadgeEnConrtoller.js:124 ~ FbQuestion", FbQuestion)
  
  FbQuestion.save((err) =>{
    if (err){
      res.status(500).send(err);
    } else{
      res.status(200).send('Feedback inserted successfully!');
    }
  }); 
};

FSEGETQuestionsFeedback = function(req, res, next){
  const child_id = req.params.child_id;
  FBQuestion.find({child_id},function(err, doc){
    if(err) {
      return next(err);
    }

    if(!doc){
      return res.status(404).send({error: "Questions feedback not found!"});
    }

    console.log(doc);
    // Send the questions array as the response
    res.status(200).json(doc);
  });
};

module.exports = {
  FSEinsertQuestion: FSEinsertQuestion,
  FSEtakeQuestion: FSEtakeQuestion,
  FSEupdateQuesttion: FSEupdateQuesttion,
  FSEdeleteQuesttion: FSEdeleteQuesttion,
  upload: upload,
  FSEretryQuestion: FSEretryQuestion,
  FSEPOSTQuestionsFeedback: FSEPOSTQuestionsFeedback,
  FSEGETQuestionsFeedback: FSEGETQuestionsFeedback,
};

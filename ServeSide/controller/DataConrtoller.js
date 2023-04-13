const Data = require("../models/DaTadb");
const FBQuestion = require("../models/Feedback")
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, call) {
    call(null, "./FSEimage/");
  },
  filename: function (req, file, call) {
    call(null, req.body.worden.replace(/\.[^/.]+$/, "") + "_" + Date.now() + ".png");
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
});

// Combined endpoint for inserting data with or without picture
InsertData = function (req, res, next) {
  let dataObj = {
    parentId: req.params.id,
    gradeNo: req.body.grade,
    subjectName: req.body.subject,
    definitionInAc: req.body.wordar,
    definitionInEn: req.body.worden,
    sentence: req.body.sentence,
    numbers: req.body.number
  };

  // If there is a file in the request, add the imageUrl to the data object
  if (req.file) {
    dataObj.imageUrl = req.file.path;
  }

  const data = Data(dataObj);

  data
    .save()
    .then((inserting) => {
      res.status(200).json({
        status: "inserting question succssufully",
      });
    })
    .catch((err) => {
      res.status(404).json({
        massage: err,
      });
    });
};




TakeData = async function (req, res, next) {
  try {
    const { grade, subject } = req.body;

    // Validate inputs
    if (!grade || typeof grade !== "number" || !subject || typeof subject !== "string") {
      return res.status(400).json({
        message: "Invalid input format",
      });
    }

    const data = await Data.find({
      gradeNo: grade,
      parentID: req.params.id,
      subjectName: subject,
    }).select('-__v'); // exclude createdAt and updatedAt fields

    if (data.length < 1) {
      return res.status(404).json({
        status: "No matching documents found",
      });
    }

    res.status(200).json({
      data: data.map(da => ({ dataId: da._doc._id, ...da._doc, _id: undefined }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Error fetching data",
      error: err.message,
    });
  }
};


















UpdateData = function (req, res, next) {
  const dataObj = {
    parentID: req.params.id,
    gradeNo: req.body.grade,
    subjectName: req.body.subject,
    definitionInAc: req.body.wordar,
    definitionInEn: req.body.worden,
    sentence: req.body.sentence,
    numbers: req.body.number
  };

  // If there is a file in the request, add the imageUrl to the data object
  if (req.file) {
    dataObj.imageUrl = req.file.path;
  }

  const updateData = { $set: dataObj };

  Data.findByIdAndUpdate(req.params.dataId, updateData, { new: true })
    .then((updatedData) => {
      res.status(200).json({
        message: 'Data updated successfully',
        updatedData: updatedData
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: 'Error updating data',
        error: err
      });
    });
};


DeleteData = function (req, res, next) {
  Data.findByIdAndDelete(req.params.dataId)
    .then((deletedData) => {
      if (deletedData) {
        res.status(200).json({
          message: 'Data deleted successfully',
          deletedData: deletedData
        });
      } else {
        res.status(404).json({
          message: 'Data not found'
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: 'Error deleting data',
        error: err
      });
    });
};


FSEPOSTQuestionsFeedback = function (req, res, next) {
  const FbQuestion = new FBQuestion(req.body);
  console.log("🚀 ~ file: FirstStadgeEnConrtoller.js:124 ~ FbQuestion", FbQuestion)

  FbQuestion.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Feedback inserted successfully!');
    }
  });
};

FSEGETQuestionsFeedback = function (req, res, next) {
  const child_id = req.params.child_id;
  FBQuestion.find({ child_id }, function (err, doc) {
    if (err) {
      return next(err);
    }

    if (!doc) {
      return res.status(404).send({ error: "Questions feedback not found!" });
    }

    console.log(doc);
    // Send the questions array as the response
    res.status(200).json(doc);
  });
};

module.exports = {
  InsertData: InsertData,
  TakeData: TakeData,
  UpdateData: UpdateData,
  DeleteData: DeleteData,
  upload: upload,
  FSEPOSTQuestionsFeedback: FSEPOSTQuestionsFeedback,
  FSEGETQuestionsFeedback: FSEGETQuestionsFeedback,
};

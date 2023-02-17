const mongoose = require("mongoose");

const FirstStadgeEnSchema = mongoose.Schema({
  Unit: {
    type: String,
    required: true,
  },
  Lesson: {
    type: String,
    required: true,
  },

  DefintioninAc: {
    type: String,
    required: true,
  },
  DefintioninEn: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Parent: {
    type: String,
    required: true,
  },
  Stadge: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("FirstStadgeEn", FirstStadgeEnSchema);

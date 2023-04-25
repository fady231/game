const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: true,
    trim: true
  },
  parentMail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/ // Regular expression to validate email format
  },
  parentPassword: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  parentAge: {
    type: Number,
    required: false,
    min: 1,
    max: 99
  },
  parentPhoneNumber: {
    type: String,
    required: false,
    minlength: 11,
    maxlength: 15,
    trim: false
  },
  profilePictureUrl: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields to the document
});

module.exports = mongoose.model('Parent', parentSchema);

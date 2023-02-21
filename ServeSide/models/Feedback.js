const { string } = require('joi');
const mongoose = require('mongoose');

const FeedbackEnSchema = mongoose.Schema({
    child_id: {
        type: String,
        required: true,
    },
    game_id: {
        type: String,
        required: true,
    },
    questions: {
        type: [],
        required: true,
        word_id:{
            type: String,
            required: true,
        },
        attempts:{
            type: Number,
            required: true
        },
    },
});

module.exports = mongoose.model('Feedback', FeedbackEnSchema);
const mongoose =require('mongoose');

const ParentSchema = mongoose.Schema({
    parentName: {
        type: String,
        required: true
    },
    parentMail: {
        type: String,
        required: true
    },
    parentPassword: {
        type: String,
        required: true
    },
    parentAge: {
        type: Number,
        min: 1, max: 99
        
    },
    parentPhoneNumber: {
        type: Number,
        min: 11,
        required: true 
    },


});



module.exports = mongoose.model('Parent', ParentSchema);
const mongoose = require('mongoose')

//-----------------------[college schema]----------------------//

const collegeSchema = new mongoose.Schema({

    collegeName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    logoLink: {
        type: String,
        required: true,
        trim: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


module.exports = mongoose.model('College', collegeSchema)
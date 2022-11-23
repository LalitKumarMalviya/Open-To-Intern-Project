const mongoose =  require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

//------------------------[intern schema]--------------------------//

const interSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    mobile: {
        type: Number,
        unique: true,
        trim: true
    },

    collegeId: {
        type: ObjectId,
        ref: "College"
    },
    
    isDeleted: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model('Intern', interSchema)

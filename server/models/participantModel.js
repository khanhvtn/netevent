const mongoose = require('mongoose')

const participantSchema = mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: [true, 'Event Id cannot be blanked'],
    },

    email: {
        type: String,
        required: [true, 'Email cannot be blanked'],
    },

    name: {
        type: String,
        required: [true, 'Name cannot be blanked'],
    },

    academic: {
        type: String,
        required: [true, 'Academic cannot be blanked'],
    },

    school: {
        type: String,
        required: [true, 'School cannot be blanked'],
    },

    major: {
        type: String,
        required: [true, 'Major cannot be blanked'],
    },

    phone: {
        type: String,
        required: [true, 'Phone cannot be blanked'],
    },

    isValid: {
        type: Boolean,
        default: false
    },

    isAttended: {
        type: Boolean,
        default: false
    },

    DOB: {
        type: Date,
        required: [true, 'Date of Birth cannot be blanked'],
    },

    expectedGraduateDate: {
        type: Date,
        required: [true, 'Graduation Date cannot be blanked'],
    },


}, { timestamps: true })


const ParticipantModel = mongoose.model('Participant', participantSchema)
module.exports = ParticipantModel;
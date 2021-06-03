const mongoose = require('mongoose')

const participantSchema = mongoose.Schema({
    
})


const ParticipantModel = mongoose.model('participant', participantSchema)
module.exports = ParticipantModel;
const mongoose = require('mongoose')

const linkSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    }
},
    { timestamps: true }

)

const LinkModel = mongoose.model('Link', linkSchema);
module.exports = LinkModel;
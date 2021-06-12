const mongoose = require('mongoose')

/**
 *  =====================================
 *       NOTIFICATION HISTORY MODEL
 *  =====================================
 */

const notificationHistorySchema = mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    title: {
        type: String,
        require: [true, "Title cannot be blanked"]
    },
    description: {
        type: String,
        require: [true, "Description cannot be blanked"]
    }
},
    { timestamps: true }

)

const NotificationHistoryModel = mongoose.model('NotificationHistory', notificationHistorySchema);
module.exports = NotificationHistoryModel;
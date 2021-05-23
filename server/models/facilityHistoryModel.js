const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 *  =====================================
 *         FACILITY HISTORY MODEL
 *  =====================================
 */

const facilityHistorySchema = mongoose.Schema(
    {
        facilityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Facility',
            required: [true, 'Facility Id cannot be blanked'],
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
        },
        borrowDate: {
            type: Date,
            required: [true, 'Borrow Date cannot be blanked'],
        },
        returnDate: {
            type: Date,
            required: [true, 'Return Date cannot be blanked'],
        },
    },
    { timestamps: true }
);

// Apply the uniqueValidator plugin
facilityHistorySchema.plugin(uniqueValidator, {
    message: `{VALUE} is already existed`,
});

const facilityHistoryModel = mongoose.model(
    'FacilityHistory',
    facilityHistorySchema
);
module.exports = facilityHistoryModel;

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 *  =====================================
 *            FACILITY MODEL
 *  =====================================
 */

const facilitySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name cannot be blanked'],
            unique: true
        },
        code: {
            type: String,
            required: [true, 'Code cannot be blanked'],
            unique: true
        },
        type: {
            type: String,
            required: [true, 'Type cannot be blanked']
        },
        status: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Apply the uniqueValidator plugin to facilitySchema
facilitySchema.plugin(uniqueValidator, {
    message: `{VALUE} is already existed`
});

const FacilityModel = mongoose.model('Facility', facilitySchema);
module.exports = FacilityModel;

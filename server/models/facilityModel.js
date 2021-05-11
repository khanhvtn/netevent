const mongoose = require('mongoose');

const facilitySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            require: true,
            unique: true
        },
        type: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

const FacilityModel = mongoose.model('Facility', facilitySchema);

module.exports = FacilityModel;

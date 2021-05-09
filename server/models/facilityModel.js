const mongoose = require('mongoose');

const facilitySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name cannot be blanked'],
            validate: {
                validator: async function (v) {
                    try {
                        const existedFacility = await FacilityModel.findOne({
                            name: v,
                        });
                        return existedFacility ? false : true;
                    } catch (error) {
                        throw error;
                    }
                },
                message: (props) => `${props.value} is already existed`,
            },
        },
        code: {
            type: String,
            required: [true, 'Code cannot be blanked'],
            validate: {
                validator: async function (v) {
                    try {
                        const existedFacility = await FacilityModel.findOne({
                            code: v,
                        });
                        return existedFacility ? false : true;
                    } catch (error) {
                        throw error;
                    }
                },
                message: (props) => `${props.value} is already existed`,
            },
        },
        type: {
            type: String,
            required: [true, 'Type cannot be blanked'],
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const FacilityModel = mongoose.model('Facility', facilitySchema);
module.exports = FacilityModel;

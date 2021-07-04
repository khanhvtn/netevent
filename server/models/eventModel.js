const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { customAlphabet } = require('nanoid');
const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 7);

/**
 *  =====================================
 *             EVENT MODEL
 *  =====================================
 */

const eventSchema = mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        eventName: {
            type: String,
            required: [true, 'Event Name cannot be blanked'],
            trim: true,
            unique: true
        },
        language: {
            type: String,
            required: [true, 'Language cannot be blanked'],
            trim: true
        },
        eventTypeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EventType',
            required: [true, 'Event Type Id cannot be blanked']
        },
        mode: {
            type: String,
            required: [true, 'Mode cannot be blanked'],
            trim: true
        },
        location: {
            type: String,
            required: [true, 'Location cannot be blanked'],
            trim: true
        },
        accommodation: {
            type: String,
            required: [true, 'Accommodation cannot be blanked'],
            trim: true
        },
        startDate: {
            type: Date,
            required: [true, 'Start Date cannot be blanked']
        },
        registrationCloseDate: {
            type: Date,
            required: [true, 'Registration Close Date cannot be blanked'],
            validate: {
                validator: function (v) {
                    return new Date(v) > new Date(this.startDate);
                },
                message: () =>
                    `Registration Close Date cannot be smaller than Start Date`
            }
        },
        endDate: {
            type: Date,
            required: [true, 'End Date cannot be blanked'],
            validate: {
                validator: function (v) {
                    return new Date(v) > new Date(this.startDate);
                },
                message: () => `End Date cannot be smaller than Start Date`
            }
        },
        maxParticipants: {
            type: String,
            required: [true, 'Max Participants cannot be blanked'],
            validate: {
                validator: function (v) {
                    return parseInt(v) > 0;
                },
                message: () => `Max Participants cannot be equal to 0`
            },
            trim: true
        },
        tags: {
            type: [String],
            validate: {
                validator: function (v) {
                    return v.length > 0;
                },
                message: () => `Tags cannot be blanked`
            }
        },
        description: {
            type: String,
            required: [true, 'Description cannot be blanked'],
            trim: true
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Owner Id cannot be blanked']
        },
        budget: {
            type: String,
            required: [true, 'Budget cannot be blanked'],
            validate: {
                validator: function (v) {
                    return parseInt(v) > 0;
                },
                message: () => `Budget cannot be equal to 0`
            },
            trim: true
        },
        isApproved: {
            type: Boolean,
            default: null
        },
        image: {
            type: String,
            required: [true, 'Please upload image']
        },
        reviewerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        isFinished: {
            type: Boolean,
            default: false
        },
        taskListId: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Task'
        },
        facilityHistoryListId: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'FacilityHistory'
        },
        urlCode: {
            type: String,
            default: () => nanoid()
        },
        clickAmount: {
            type: Number,
            default: 0
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// Apply the uniqueValidator plugin
eventSchema.plugin(uniqueValidator, {
    message: `{VALUE} is already existed`
});

const eventModel = mongoose.model('Event', eventSchema);
module.exports = eventModel;

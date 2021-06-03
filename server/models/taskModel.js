const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 *  =====================================
 *         FACILITY HISTORY MODEL
 *  =====================================
 */

const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Task name cannot be blanked'],
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Assignee cannot be blnaked'],
        },
        type: {
            type: String,
            reqruied: [true, 'Type cannot be blanked'],
        },
        startDate: {
            type: Date,
            required: [true, 'Start Date cannot be blanked'],
        },
        endDate: {
            type: Date,
            required: [true, 'End Date cannot be blanked'],
        },
        eventId: {
            type: mongoose.Types.ObjectId,
            default: null,
        },
    },
    { timestamps: true }
);

// Apply the uniqueValidator plugin
taskSchema.plugin(uniqueValidator, {
    message: `{VALUE} is already existed`,
});

const taskModel = mongoose.model('Task', taskSchema);
module.exports = taskModel;

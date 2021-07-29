const mongoose = require('mongoose');
const { customAlphabet } = require('nanoid');
const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 7);

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title cannot be blanked'],
        trim: true
    },
    value: {
        type: mongoose.SchemaTypes.Mixed,
        required: [true, 'Value cannot be blanked']
    }
});

/**
 *  =====================================
 *           FEEDBACK MODEL
 *  =====================================
 */

const feedbackSchema = mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: [true, 'Event Id cannot be blanked']
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Participant',
            required: [true, 'Participant Id cannot be blanked']
        },
        question: {
            type: [questionSchema]
        },
        urlCode: {
            type: String,
            default: () => nanoid()
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);
module.exports = FeedbackModel;

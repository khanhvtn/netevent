const mongoose = require('mongoose');

/**
 *  =====================================
 *             USER MODEL
 *  =====================================
 */

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String
        },
        role: {
            type: [String],
            required: true
        },
        isConfirmed: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

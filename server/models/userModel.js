const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: [String],
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

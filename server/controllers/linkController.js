const Link = require('../models/linkModel');
const User = require('../models/userModel')
const mongoose = require('mongoose');
const { update } = require('../models/userModel');
const bcrypt = require('bcrypt');


const getLinks = async (req, res) => {
    try {
        const linkData = await Link.find();
        if (linkData) {
            return res.status(200).json(linkData)
        } else {
            return res.status(500).json("No Link Exists")

        }
    } catch (error) {
        return res.status(404).json(error)
    }
}

const getLink = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const link = await Link.findById(_id)

        if (link) {
            const update = await User.findByIdAndUpdate(
                link.user,
                { $set: { 'isConfirmed': true } },

                { new: true }

            )
            await Link.findByIdAndRemove(_id);
            return res.status(200).json("Successful")
        }
    } catch (error) {
        return res.status(404).json(error)
    }
}



const confirmPassword = async (req, res) => {
    const { password } = req.body;
    console.log("Password: ", req.body)
    hashPassword = await bcrypt.hash(password, 10);

    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No link with that id');
    } else {
        const data = await Link.findByIdAndRemove(_id);
        const userID = data.user;
        const update = await User.findByIdAndUpdate(
            userID,
            { $set: { 'isConfirmed': true, 'password': hashPassword } },
            { new: true }
        )

        res.json(update);

    }
}

const deleteLink = async (req, res) => {


    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No link with that id');
    } else {
        const data = await Link.findByIdAndRemove(_id);


        res.json(data);

    }
}

module.exports = {
    getLinks,
    getLink,
    confirmPassword,
    deleteLink
}

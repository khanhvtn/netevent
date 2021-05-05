const Link = require('../models/linkModel');
const User = require('../models/userModel')
const mongoose = require('mongoose');
const { update } = require('../models/userModel');


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

const deleteLink = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No link with that id');
    }
    await Link.findByIdAndRemove(_id);
    res.json({ message: 'Link deleted successfully' });
}

module.exports = {
    getLinks,
    getLink,
    deleteLink
}

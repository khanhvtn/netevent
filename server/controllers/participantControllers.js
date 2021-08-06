const { Participant, Event, Feedback } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomError');
const mongoose = require('mongoose');
const { sendInvitation, sendEmail } = require('./misc/mailer');
const qrCode = require('qrcode');
const CryptoJS = require('crypto-js');
const {
    eventInvitationTemplate,
    feedbackTemplate
} = require('../mail-template/template');

/**
 *  =====================================
 *         PARTICIPANT CONTROLLER
 *  =====================================
 */

/**
 * @decsription Get all participants
 * @method GET
 * @route /api/participant/all
 *
 * @version 1.0
 */
const getParticipantByEventID = async (req, res, next) => {
    let options = {
        eventId: null
    };
    if (req.query.eventId) {
        options = {
            ...options,
            eventId: req.query.eventId.toString()
        };
    }
    try {
        const participants = await Participant.find({
            event: options.eventId
        });
        return cusResponse(res, 200, participants, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Filter all participants
 * @method PATCH
 * @route /api/participant/filter
 *
 * @version 1.0
 */
const filterParticipants = async (req, res, next) => {
    try {
        let options = {
            search: '',
            take: 10,
            isValid: {
                $in: [true, false, null]
            },
            isAttended: {
                $in: [true, false]
            },
            academic: {
                $in: ['Bachelor', 'Master', 'PhD']
            },
            eventId: null
        };

        //adding search
        if (req.query.search) {
            options = {
                ...options,
                search: req.query.search.toString()
            };
        }

        /* 
        Add take row filter
        Default take is 5
         */
        if (req.query.take) {
            options = {
                ...options,
                take: parseInt(req.query.take.toString())
            };
        }

        /* 
        Add eventId row filter
         */
        if (req.query.eventId) {
            options = {
                ...options,
                eventId: req.query.eventId.toString()
            };
        }

        /* 
        Add academic row filter
         */
        if (req.query.academic) {
            options = {
                ...options,
                academic: req.query.academic.toString()
            };
        }

        /* 
        Add academic row filter
         */
        if (req.query.isValid) {
            options = {
                ...options,
                isValid:
                    req.query.isValid.toString() === 'null'
                        ? null
                        : req.query.isValid.toString() === 'true'
            };
        }

        /* 
        Add academic row filter
         */
        if (req.query.isAttended) {
            options = {
                ...options,
                isAttended: req.query.isAttended.toString() === 'true'
            };
        }

        /* 
        Add status row filter
         */
        if (req.query.status) {
            switch (req.query.status) {
                case 'Verified':
                    options = {
                        ...options,
                        isValid: true,
                        isAttended: false
                    };
                    break;
                case 'Invalid':
                    options = {
                        ...options,
                        isValid: false,
                        isAttended: false
                    };
                    break;
                case 'Pending':
                    options = {
                        ...options,
                        isValid: null,
                        isAttended: false
                    };
                    break;
                case 'Checked':
                    options = {
                        ...options,
                        isValid: true,
                        isAttended: true
                    };
                    break;
            }
        }

        /* 
        Variable page default is 1
         */
        const page = parseInt(req.query.page) || 1;

        /* 
        Variable total user based on search and filter
         */
        const totalParticipants = await Participant.find({
            $or: [
                { email: new RegExp(options.search, 'i') },
                { name: new RegExp(options.search, 'i') },
                { school: new RegExp(options.search, 'i') },
                { major: new RegExp(options.search, 'i') }
            ],
            isValid: options.isValid,
            isAttended: options.isAttended,
            event: options.eventId,
            academic: options.academic
        }).countDocuments();

        let totalPages = (totalParticipants / options.take)
            .toString()
            .includes('.')
            ? Math.ceil(totalParticipants / options.take)
            : totalParticipants / options.take;

        //return data to client
        const participants = await Participant.find({
            $or: [
                { email: new RegExp(options.search, 'i') },
                { name: new RegExp(options.search, 'i') },
                { school: new RegExp(options.search, 'i') },
                { major: new RegExp(options.search, 'i') }
            ],
            isValid: options.isValid,
            isAttended: options.isAttended,
            event: options.eventId,
            academic: options.academic
        })
            .sort({ updatedAt: -1 })
            .skip((page - 1) * options.take)
            .limit(options.take);

        return cusResponse(res, 200, participants, null, totalPages);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Register Event to save participant model
 * @method POST
 * @route /api/participant/registerEvent
 *
 * @version 1.0
 */
const registerEvent = async (req, res, next) => {
    try {
        const event = await Participant.find({
            event: req.body.event,
            email: req.body.email
        });
        console.log(event);
        if (event.length > 0) {
            let errors = {
                email: 'Sorry! this email have already registered for this event.'
            };
            return next(new CustomError(500, errors));
        } else {
            const data = new Participant(req.body);
            await data.validate();

            const savedData = await data.save();
            return cusResponse(res, 200, savedData, null);
        }
    } catch (error) {
        if (error.name == 'ValidationError') {
            let errors = {};
            for (field in error.errors) {
                errors = { ...errors, [field]: error.errors[field].message };
            }
            return next(new CustomError(500, errors));
        }
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Delete Participant
 * @method DELETE
 * @route /api/participant/:id
 *
 * @version 1.0
 */
const deleteParticipant = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No participant with that id');
        } else {
            const data = await Participant.findByIdAndRemove(_id);
            res.json(data);
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

function formatDateTime(date) {
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    const hour = pad(date.getUTCHours());
    const minute = pad(date.getUTCMinutes());
    const second = pad(date.getUTCSeconds());
    return `${year}${month}${day}T${hour}${minute}${second}Z`;
}

function pad(i) {
    return i < 10 ? `0${i}` : `${i}`;
}

/**
 * @decsription Set Invalid and Verify participants
 * @method PATCH
 * @route /api/participant/update/valid
 *
 * @version 1.0
 */
const setInvalidAndVerifyParticipant = async (req, res, next) => {
    const { invalidList, verifiedList, action } = req.body;
    try {
        switch (action) {
            case false:
                const updateInvalidParticipant = await Participant.updateMany(
                    { _id: invalidList },
                    { $set: { isValid: action } },
                    { new: true }
                );
                return cusResponse(res, 200, updateInvalidParticipant, null);
            case true:
                const updateVerifiedParticipant = await Participant.updateMany(
                    { _id: verifiedList },
                    { $set: { isValid: action } },
                    { new: true }
                );

                // Send Invitation
                const participants = await Participant.find({
                    _id: verifiedList
                });

                const event = await Event.findOne({
                    _id: participants[0].event
                });

                const dateStart = new Date(event.startDate);
                const dateEnd = new Date(event.endDate);

                const emailParticipantsList = [];
                for (var i = 0; i < participants.length; i++) {
                    emailParticipantsList.push(participants[i].email);
                }
                const stringUsersMail = emailParticipantsList.join(', ');

                const description = JSON.parse(event.description);

                //Calendar Content
                let content =
                    'BEGIN:VCALENDAR\n' +
                    'VERSION:2.0\n' +
                    'BEGIN:VEVENT\n' +
                    'DTSTART:' +
                    formatDateTime(dateStart) +
                    '\r\n' +
                    'DTEND:' +
                    formatDateTime(dateEnd) +
                    '\r\n' +
                    'SUMMARY:' +
                    event.eventName +
                    '\r\n' +
                    'DESCRIPTION:' +
                    description.blocks[0].text +
                    ' \r\n' +
                    'LOCATION:' +
                    event.location +
                    '\r\n' +
                    'ORGANIZER;CN=' +
                    'NetCompany' +
                    ':mailto:' +
                    'netevent@gmail.com' +
                    '\r\n' +
                    'STATUS:CONFIRMED\n' +
                    'SEQUENCE:0\n' +
                    'ACTION:DISPLAY\n' +
                    'END:VEVENT\n' +
                    'END:VCALENDAR';

                //send invitation to participants with QRCode and Calendar event.
                await Promise.all(
                    participants.map(async (participant) => {
                        const qrData = JSON.stringify({
                            eventId: participant.event,
                            participantId: participant._id
                        });
                        //encrypt data
                        const cipherText = CryptoJS.AES.encrypt(
                            qrData,
                            process.env.SECRET_KEY
                        ).toString();
                        const qrCodeDataUrl = await qrCode.toDataURL(
                            cipherText,
                            {
                                width: 300
                            }
                        );
                        return await sendInvitation({
                            from: 'noreply@netevent.com',
                            to: stringUsersMail,
                            subject: `NetEvent - ${event.eventName} - Invitation`,
                            icalEvent: {
                                filename: 'invitation.ics',
                                method: 'request',
                                content: content
                            },
                            html: `
                            <p>Your event registration has been verified. You can now come to an event!</p>
                            <p>Please show below QR Code to staff when you come to the event:</p> 
                            <img src="cid:${participant.email}" alt="QrCode">`,
                            attachments: [
                                {
                                    filename: 'qrcode.png',
                                    path: qrCodeDataUrl,
                                    cid: participant.email
                                }
                            ]
                        });
                    })
                );

                return cusResponse(res, 200, updateVerifiedParticipant, null);
        }
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Set Attend participants
 * @method PATCH
 * @route /api/participant/update/valid
 *
 * @version 1.0
 */
const setAttendedParticipant = async (req, res, next) => {
    const { attendedList, action } = req.body;
    try {
        const newUpdateParticipants = await Participant.updateMany(
            { _id: attendedList },
            { $set: { isAttended: action } },
            { new: true }
        );
        return cusResponse(res, 200, newUpdateParticipants, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Set Attend participants
 * @method PATCH
 * @route /api/participant/update/valid
 *
 * @version 1.0
 */
const setAttendedParticipantByQrCode = async (req, res, next) => {
    const { cipherTextQrCodeData } = req.body;
    try {
        // Decrypt
        var bytes = CryptoJS.AES.decrypt(
            cipherTextQrCodeData,
            process.env.SECRET_KEY
        );
        var participantInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        const participant = await Participant.findById(
            participantInfo.participantId
        ).populate('event');
        if (participant.event.isFinished) {
            return next(
                new CustomError(500, {
                    qrCode: 'This QR Code is expired'
                })
            );
        }
        if (participant.isAttended) {
            return next(
                new CustomError(500, {
                    qrCode: 'This participant already checked'
                })
            );
        }
        const updateNotAttendedParticipant = await Participant.updateOne(
            { _id: participantInfo.participantId },
            { $set: { isAttended: true } },
            { new: true }
        );
        return cusResponse(res, 200, updateNotAttendedParticipant, null);
    } catch (error) {
        return next(new CustomError(500, { qrCode: 'Invalid QR Code' }));
    }
};

function uniqueBy(a, cond) {
    return a.filter((e, i) => a.findIndex((e2) => cond(e, e2)) === i);
}

/**
 * @decsription Get suggest participants
 * @method GET
 * @route /api/participant/suggest
 *
 * @version 1.0
 */
const getSuggestedParticipants = async (req, res, next) => {
    try {
        let options = {
            search: '',
            take: 8,
            eventType: null,
            tags: [],
            language: {
                $in: ['English', 'Vietnamese']
            }
        };

        //adding search
        if (req.query.search) {
            options = {
                ...options,
                search: req.query.search.toString()
            };
        }

        /* 
        Add take row filter
        Default take is 5
         */
        if (req.query.take) {
            options = {
                ...options,
                take: parseInt(req.query.take.toString())
            };
        }

        /* 
        Variable page default is 1
         */
        const page = parseInt(req.query.page) || 1;

        const event = await Event.findOne({
            urlCode: req.query.eventCode
        }).populate('eventTypeId');

        const allParticipants = await Participant.find({
            name: new RegExp(options.search, 'i')
        })
            .populate({
                path: 'event',
                match: {
                    language: event.language,
                    tags: { $in: event.tags }
                },
                populate: {
                    path: 'eventTypeId',
                    model: 'EventType',
                    match: {
                        name: event.eventTypeId.name
                    }
                }
            })
            .sort({ updatedAt: -1 });

        // Filter all participant following language and tags
        const filterParticipantsByLanguageAndTags = allParticipants.filter(
            (participant) => participant.event
        );

        // Filter all participant haven't attended to the current event
        const filterParticipantsByEventId =
            filterParticipantsByLanguageAndTags.filter(
                (participant) =>
                    participant.event.urlCode !== req.query.eventCode
            );

        // Filter all participant with the unique email
        const filterUniqueParticipants = uniqueBy(
            filterParticipantsByEventId,
            (o1, o2) => o1.email === o2.email
        );

        const participantLength = filterUniqueParticipants.length;

        /* 
        Variable total participant
         */
        let totalPages = (participantLength / options.take)
            .toString()
            .includes('.')
            ? Math.ceil(participantLength / options.take)
            : participantLength / options.take;

        // Paging participant
        const pagingParticipant = filterUniqueParticipants
            .skip((page - 1) * options.take)
            .limit(options.take);

        return cusResponse(
            res,
            200,
            {
                suggestedParticipants: pagingParticipant,
                invitationListEmail: event.invitationListEmail
            },
            null,
            totalPages
        );
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Invite Suggest Participant
 * @method POST
 * @route /api/participant/invite
 *
 * @version 1.0
 */
const inviteParticipant = async (req, res, next) => {
    const { email, eventCode } = req.body;
    try {
        const event = await Event.findOne({ urlCode: eventCode });
        if (event.invitationListEmail.includes(email)) {
            return next(
                new CustomError(500, { error: 'Email has been invited' })
            );
        }

        let newInvitationList = [...event.invitationListEmail, email];

        const updateEvent = await Event.findOneAndUpdate(
            { urlCode: eventCode },
            { invitationListEmail: newInvitationList },
            { new: true }
        );

        // Send Email Invitation (Minh)
        await sendEmail(
            'noreply@netevent.com',
            newInvitationList.join(', '),
            'Netcompany - You May Interest In This Event',
            eventInvitationTemplate(event)
        );

        return cusResponse(res, 200, updateEvent.invitationListEmail, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Sending feedback to participant
 * @method POST
 * @route /api/participant/sendFeedback
 *
 * @version 1.0
 */
const sendFeedbackToParticipants = async (req, res, next) => {
    const { code } = req.body;
    try {
        // Get eventId
        const currentEvent = await Event.findOne({ urlCode: code });
        const eventId = currentEvent._id;

        // Get checked participants
        const checkedParticipants = await Participant.find({
            event: eventId,
            isValid: true,
            isAttended: true
        });

        await Promise.all(
            checkedParticipants.map(async (participant) => {
                // Create feedback
                const participantId = participant._id;
                const feedback = new Feedback({
                    eventId: eventId,
                    userId: participantId
                });

                // Validate feedback model
                await feedback.validate();

                const saveFeedback = await feedback.save();

                // Send email inviataion (Minh)
                //
                // Get feedback link
                const urlCodeFeedback = saveFeedback.urlCode;
                const urlFeedback = `feedback/${urlCodeFeedback}`;
                await sendEmail(
                    'noreply@netevent.com',
                    participant.email,
                    'Netcompany - We Would Love To Hear Your Feedback',
                    feedbackTemplate(urlFeedback, participant)
                );
            })
        );

        return cusResponse(res, 200, null, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Submit a feedback
 * @method POST
 * @route /api/participant/submitFeedback
 *
 * @version 1.0
 */
const submitFeedback = async (req, res, next) => {
    const { question, urlCode } = req.body;

    try {
        const updateFeedback = await Feedback.findOneAndUpdate(
            { urlCode: urlCode },
            { question: question, isCompleted: true },
            { new: true }
        );

        return cusResponse(res, 200, updateFeedback, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @decsription Get a feedback
 * @method GET
 * @route /api/participant/feedback
 *
 * @version 1.0
 */
const getFeedback = async (req, res, next) => {
    const code = req.query.code;
    try {
        const feedback = await Feedback.findOne({ urlCode: code });

        if (!feedback) {
            return cusResponse(res, 200, [], null);
        }

        return cusResponse(res, 200, feedback, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

module.exports = {
    getSuggestedParticipants,
    getParticipantByEventID,
    registerEvent,
    deleteParticipant,
    filterParticipants,
    setInvalidAndVerifyParticipant,
    setAttendedParticipant,
    setAttendedParticipantByQrCode,
    inviteParticipant,
    sendFeedbackToParticipants,
    submitFeedback,
    getFeedback
};

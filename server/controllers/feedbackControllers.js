const { Feedback } = require('../models');
const { cusResponse } = require('../utils');
const CustomError = require('../class/CustomError');
/**
 *  =====================================
 *         FEEDBACK CONTROLLER
 *  =====================================
 */

/**
 * @decsription Get all feedbacks
 * @method GET
 * @route /api/feedback/all
 *
 * @version 1.0
 */

const getAllFeedback = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find();
        return cusResponse(res, 200, feedbacks, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

/**
 * @description Get feedback by event ID
 * @method GET
 * @route /api/feedback/eventID
 *
 * @version 1.0
 */

const getFeedbackByEventID = async (req, res, next) => {
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
        const feedbacks = await Feedback.find({
            eventId: options.eventId,
            isCompleted: true
        }).populate('userId');

        // Get number of feedback Sent
        const feedbackSent = await Feedback.find({
            eventId: options.eventId
        });

        const feedbackReceived = await Feedback.find({
            eventId: options.eventId,
            isCompleted: true
        }).populate('userId');
        const numberOfFeedbackReceived = feedbackReceived.length;
        const numberOfFeedbackSent = feedbackSent.length;

        // Get list of participants agree to receive notification
        const participantAgreeToReceiveNoti = feedbacks.filter(
            (feedback) => feedback.question[3].value == 1
        );

        const feedbackQuestion1 = [];
        const feedbackQuestion2 = [];
        const feedbackQuestion3 = [];
        const feedbackQuestion4 = [];
        const feedbackQuestion5A = [];
        const feedbackQuestion5B = [];
        const feedbackQuestion6 = [];

        feedbacks.map((feedback) =>
            feedbackQuestion1.push(feedback.question[0])
        );

        feedbacks.map((feedback) =>
            feedbackQuestion2.push(feedback.question[1])
        );

        feedbacks.map((feedback) =>
            feedbackQuestion3.push(feedback.question[2])
        );

        feedbacks.map((feedback) =>
            feedbackQuestion4.push(feedback.question[3])
        );

        feedbacks.map((feedback) =>
            feedbackQuestion5A.push(feedback.question[4].value)
        );

        feedbacks.map((feedback) =>
            feedbackQuestion5B.push(feedback.question[4].value)
        );
        feedbacks.map((feedback) =>
            feedbackQuestion6.push({
                sender: feedback.userId.email,
                answer: feedback.question[5].value
            })
        );

        const feedbackAnalysis = {
            question1Result: {},
            question2Result: {},
            question3Result: {},
            question4Result: {},
            question5AResult: {},
            question5BResult: {},
            question6Result: []
        };

        feedbackAnalysis.question1Result = feedbackQuestion1.reduce(function (
            sums,
            entry
        ) {
            sums[entry.value] = (sums[entry.value] || 0) + 1;
            return sums;
        },
        {});

        feedbackAnalysis.question2Result = feedbackQuestion2.reduce(function (
            sums,
            entry
        ) {
            sums[entry.value] = (sums[entry.value] || 0) + 1;
            return sums;
        },
        {});

        feedbackAnalysis.question3Result = feedbackQuestion3.reduce(function (
            sums,
            entry
        ) {
            sums[entry.value] = (sums[entry.value] || 0) + 1;
            return sums;
        },
        {});

        feedbackAnalysis.question4Result = feedbackQuestion4.reduce(function (
            sums,
            entry
        ) {
            sums[entry.value] = (sums[entry.value] || 0) + 1;
            return sums;
        },
        {});

        feedbackAnalysis.question5AResult = feedbackQuestion5A.reduce(function (
            sums,
            entry
        ) {
            sums[entry.presentationQuality] =
                (sums[entry.presentationQuality] || 0) + 1;
            return sums;
        },
        {});

        feedbackAnalysis.question5BResult = feedbackQuestion5B.reduce(function (
            sums,
            entry
        ) {
            sums[entry.speakerKnowledge] =
                (sums[entry.speakerKnowledge] || 0) + 1;
            return sums;
        },
        {});

        feedbackAnalysis.question6Result.push(feedbackQuestion6);

        const question1ChartInitialData = [0, 0, 0, 0, 0, 0, 0];
        const question2ChartInitialData = [0, 0, 0, 0, 0, 0, 0];
        const question3ChartInitialData = [0, 0, 0, 0, 0, 0, 0];
        const question4ChartInitialData = [0, 0];
        const question5AChartInitialData = [0, 0, 0, 0, 0];
        const question5BChartInitialData = [0, 0, 0, 0, 0];
        const question6ChartInitialData = feedbackQuestion6;
        const questionFeedbackSentVsReceived = [
            numberOfFeedbackSent,
            numberOfFeedbackReceived
        ];
        const questionParticipantAgreeToReceive = [];
        const raw = [];

        feedbackReceived.forEach((feedback) => {
            var date = new Date(feedback.updatedAt);
            raw.push({
                Timestamp: date.toLocaleString(),
                Sender: feedback.userId.email,
                'How likely are you to recommend Netcompany as a workplace to your friend/colleague?':
                    feedback.question[0].value,
                'Do you find the content of the seminar helpful?':
                    feedback.question[1].value,
                'What is your willingness to recommend a future NC seminar to a friend or a colleague?':
                    feedback.question[2].value,
                'Would you like us to send you upcoming events and seminar notification?':
                    feedback.question[3].value,
                'Please rate the following as you see fit on the seminar: Presentation Quality':
                    feedback.question[4].value.presentationQuality,
                'Please rate the following as you see fit on the seminar: Speaker Knowledge':
                    feedback.question[4].value.speakerKnowledge,
                'Please provide any suggestions to help us improve the quality of future event':
                    feedback.question[5].value
            });
        });

        participantAgreeToReceiveNoti.forEach((element) => {
            questionParticipantAgreeToReceive.push(element.userId.email);
        });

        Object.keys(feedbackAnalysis.question1Result).forEach((key) => {
            question1ChartInitialData[parseInt(key) - 1] =
                question1ChartInitialData[parseInt(key) - 1] +
                feedbackAnalysis.question1Result[key];
        });

        Object.keys(feedbackAnalysis.question2Result).forEach((key) => {
            question2ChartInitialData[parseInt(key) - 1] =
                question2ChartInitialData[parseInt(key) - 1] +
                feedbackAnalysis.question2Result[key];
        });

        Object.keys(feedbackAnalysis.question3Result).forEach((key) => {
            question3ChartInitialData[parseInt(key) - 1] =
                question3ChartInitialData[parseInt(key) - 1] +
                feedbackAnalysis.question3Result[key];
        });

        Object.keys(feedbackAnalysis.question4Result).forEach((key) => {
            if (key === '1') {
                question4ChartInitialData[0] =
                    question4ChartInitialData[0] +
                    feedbackAnalysis.question4Result[key];
            }
            if (key === '0') {
                question4ChartInitialData[1] =
                    question4ChartInitialData[1] +
                    feedbackAnalysis.question4Result[key];
            }
        });

        Object.keys(feedbackAnalysis.question5AResult).forEach((key) => {
            if (key === 'Very Poor') {
                question5AChartInitialData[0] =
                    question5AChartInitialData[0] +
                    feedbackAnalysis.question5AResult[key];
            }
            if (key === 'Poor') {
                question5AChartInitialData[1] =
                    question5AChartInitialData[1] +
                    feedbackAnalysis.question5AResult[key];
            }
            if (key === 'Moderate') {
                question5AChartInitialData[2] =
                    question5AChartInitialData[2] +
                    feedbackAnalysis.question5AResult[key];
            }
            if (key === 'Good') {
                question5AChartInitialData[3] =
                    question5AChartInitialData[3] +
                    feedbackAnalysis.question5AResult[key];
            }
            if (key === 'Excellent') {
                question5AChartInitialData[4] =
                    question5AChartInitialData[4] +
                    feedbackAnalysis.question5AResult[key];
            }
        });

        Object.keys(feedbackAnalysis.question5BResult).forEach((key) => {
            if (key === 'Very Poor') {
                question5BChartInitialData[0] =
                    question5BChartInitialData[0] +
                    feedbackAnalysis.question5BResult[key];
            }
            if (key === 'Poor') {
                question5BChartInitialData[1] =
                    question5BChartInitialData[1] +
                    feedbackAnalysis.question5BResult[key];
            }
            if (key === 'Moderate') {
                question5BChartInitialData[2] =
                    question5BChartInitialData[2] +
                    feedbackAnalysis.question5BResult[key];
            }
            if (key === 'Good') {
                question5BChartInitialData[3] =
                    question5BChartInitialData[3] +
                    feedbackAnalysis.question5BResult[key];
            }
            if (key === 'Excellent') {
                question5BChartInitialData[4] =
                    question5BChartInitialData[4] +
                    feedbackAnalysis.question5BResult[key];
            }
        });

        const result = {
            chart1: question1ChartInitialData,
            chart2: question2ChartInitialData,
            chart3: question3ChartInitialData,
            chart4: question4ChartInitialData,
            chart5A: question5AChartInitialData,
            chart5B: question5BChartInitialData,
            chart6: question6ChartInitialData,
            chartSendVsReceived: questionFeedbackSentVsReceived,
            chartParticipantAgree: questionParticipantAgreeToReceive,
            raw: raw
        };

        return cusResponse(res, 200, result, null);
    } catch (error) {
        return next(new CustomError(500, error.message));
    }
};

module.exports = {
    getAllFeedback,
    getFeedbackByEventID
};

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
            eventId: options.eventId
        }).populate('userId');

        // Get number of feedback Sent
        const feedbackSent = await Feedback.find({
            eventId: options.eventId
        });

        const feedbackReceived = await Feedback.find({
            eventId: options.eventId,
            isCompleted: true
        });
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
            question1Result: [],
            question2Result: [],
            question3Result: [],
            question4Result: [],
            question5AResult: [],
            question5BResult: [],
            question6Result: []
        };

        feedbackQuestion1.reduce(function (sums, entry) {
            sums[entry.value] = (sums[entry.value] || 0) + 1;
            feedbackAnalysis.question1Result.push(sums);
        }, {});

        feedbackQuestion2.reduce(function (sums, entry) {
            sums[entry.value] = (sums[entry.value] || 0) + 1;
            feedbackAnalysis.question2Result.push(sums);
        }, {});

        feedbackQuestion3.reduce(function (sums, entry) {
            sums[entry.value] = (sums[entry.value] || 0) + 1;
            feedbackAnalysis.question3Result.push(sums);
        }, {});

        feedbackQuestion4.reduce(function (sums, entry) {
            sums[entry.value] = (sums[entry.value] || 0) + 1;
            feedbackAnalysis.question4Result.push(sums);
        }, {});

        feedbackQuestion5A.reduce(function (sums, entry) {
            sums[entry.presentationQuality] =
                (sums[entry.presentationQuality] || 0) + 1;
            feedbackAnalysis.question5AResult.push(sums);
        }, {});

        feedbackQuestion5B.reduce(function (sums, entry) {
            sums[entry.speakerKnowledge] =
                (sums[entry.speakerKnowledge] || 0) + 1;
            feedbackAnalysis.question5BResult.push(sums);
        }, {});

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

        participantAgreeToReceiveNoti.forEach((element) => {
            questionParticipantAgreeToReceive.push(element.userId.email);
        });

        feedbackAnalysis.question1Result.forEach((question1) => {
            Object.keys(question1).forEach((key) => {
                question1ChartInitialData[parseInt(key) - 1] =
                    question1ChartInitialData[parseInt(key) - 1] +
                    question1[key];
            });
        });

        feedbackAnalysis.question2Result.forEach((question2) => {
            Object.keys(question2).forEach((key) => {
                question2ChartInitialData[parseInt(key) - 1] =
                    question2ChartInitialData[parseInt(key) - 1] +
                    question2[key];
            });
        });

        feedbackAnalysis.question3Result.forEach((question3) => {
            Object.keys(question3).forEach((key) => {
                question3ChartInitialData[parseInt(key) - 1] =
                    question3ChartInitialData[parseInt(key) - 1] +
                    question3[key];
            });
        });

        feedbackAnalysis.question4Result.forEach((question4) => {
            Object.keys(question4).forEach((key) => {
                if (key === '1') {
                    question4ChartInitialData[0] =
                        question4ChartInitialData[0] + question4[key];
                }
                if (key === '0') {
                    question4ChartInitialData[1] =
                        question4ChartInitialData[1] + question4[key];
                }
            });
        });

        feedbackAnalysis.question5AResult.forEach((question5A) => {
            Object.keys(question5A).forEach((key) => {
                if (key === 'Very Poor') {
                    question5AChartInitialData[0] =
                        question5AChartInitialData[0] + question5A[key];
                }
                if (key === 'Poor') {
                    question5AChartInitialData[1] =
                        question5AChartInitialData[1] + question5A[key];
                }
                if (key === 'Moderate') {
                    question5AChartInitialData[2] =
                        question5AChartInitialData[2] + question5A[key];
                }
                if (key === 'Good') {
                    question5AChartInitialData[3] =
                        question5AChartInitialData[3] + question5A[key];
                }
                if (key === 'Excellent') {
                    question5AChartInitialData[4] =
                        question5AChartInitialData[4] + question5A[key];
                }
            });
        });

        feedbackAnalysis.question5BResult.forEach((question5B) => {
            Object.keys(question5B).forEach((key) => {
                if (key === 'Very Poor') {
                    question5BChartInitialData[0] =
                        question5BChartInitialData[0] + question5B[key];
                }
                if (key === 'Poor') {
                    question5BChartInitialData[1] =
                        question5BChartInitialData[1] + question5B[key];
                }
                if (key === 'Moderate') {
                    question5BChartInitialData[2] =
                        question5BChartInitialData[2] + question5B[key];
                }
                if (key === 'Good') {
                    question5BChartInitialData[3] =
                        question5BChartInitialData[3] + question5B[key];
                }
                if (key === 'Excellent') {
                    question5BChartInitialData[4] =
                        question5BChartInitialData[4] + question5B[key];
                }
            });
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
            chartParticipantAgree: questionParticipantAgreeToReceive
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

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Paper,
    Typography,
    CircularProgress,
    Button
} from '@material-ui/core';
import useStyles from './styles';
import { Bar, Pie } from 'react-chartjs-2';
import GetAppIcon from '@material-ui/icons/GetApp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getFeedbackByEventID } from '../../../actions/feedbackActions';
import { ExportToCsv } from 'export-to-csv';

const question1ChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
        {
            label: 'How likely are you to recommend Netcompany as a workplace to your friend/colleague?',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 210, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 210, 64, 1)'
            ],
            borderWidth: 1
        }
    ]
};

const question2ChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
        {
            label: 'Do you find the content of the seminar helpful?',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 210, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 210, 64, 1)'
            ],
            borderWidth: 1
        }
    ]
};

const question3ChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
        {
            label: 'What is your willingness to recommend a future NC seminar to a friend or a colleague?',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 210, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 210, 64, 1)'
            ],
            borderWidth: 1
        }
    ]
};

const question4ChartData = {
    labels: ['Yes', 'No'],
    datasets: [
        {
            label: 'Would you like us to send you upcoming events and seminar notification?',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1
        }
    ]
};

const question5AChartData = {
    labels: ['Very Poor', 'Poor', 'Moderate', 'Good', 'Execellent'],
    datasets: [
        {
            label: 'Please rate the following as you see fit on the seminar: Presentation Quality',
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }
    ]
};

const question5BChartData = {
    labels: ['Very Poor', 'Poor', 'Moderate', 'Good', 'Execellent'],
    datasets: [
        {
            label: 'Please rate the following as you see fit on the seminar: Speaker Knowledge',
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }
    ]
};

const questionFeedbackSentVsReceivedData = {
    labels: ['Sent', 'Received'],
    datasets: [
        {
            label: 'Feedback Sent vs Feedback Received',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }
    ]
};

const noDataPieChartData = {
    labels: ['No Available Data'],
    datasets: [
        {
            label: 'No Available Data',
            data: [100],
            backgroundColor: ['rgb(39,44,52,0.2)'],
            borderColor: ['rgb(39,44,52,0.1)'],
            borderWidth: 1
        }
    ]
};

const optionNoDataPieChart = {
    plugins: {
        legend: {
            display: false
        }
    }
};

const FeedbackAnalysis = ({ eventId, eventName }) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [question1FeedbackState, setQuestion1FeedbackState] =
        useState(question1ChartData);
    const [question2FeedbackState, setQuestion2FeedbackState] =
        useState(question2ChartData);
    const [question3FeedbackState, setQuestion3FeedbackState] =
        useState(question3ChartData);
    const [question4FeedbackState, setQuestion4FeedbackState] =
        useState(question4ChartData);
    const [question5AFeedbackState, setQuestion5AFeedbackState] =
        useState(question5AChartData);
    const [question5BFeedbackState, setQuestion5BFeedbackState] =
        useState(question5BChartData);
    const [question6FeedbackState, setQuestion6FeedbackState] = useState([]);
    const [
        questionFeedbackSentvsReceivedState,
        setQuestionFeedbackSentvsReceivedState
    ] = useState(questionFeedbackSentVsReceivedData);
    const [questionParticipantAgreeState, setQuestionParticipantAgreeState] =
        useState([]);

    const optionQuestion1Chart = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        precision: 0
                    }
                }
            ]
        },

        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (TooltipItem) {
                        let total = 0;
                        for (
                            let i = 0;
                            i < question1FeedbackState.datasets[0].data.length;
                            i++
                        ) {
                            total += question1FeedbackState.datasets[0].data[i];
                        }

                        const percentage = (
                            (parseInt(TooltipItem.formattedValue) / total) *
                            100
                        ).toFixed(0);
                        // return `${currentValue} (${percentage}%)`;
                        let label =
                            'Rating: ' +
                            percentage +
                            `% (${TooltipItem.formattedValue})`;
                        return label;
                    }
                }
            }
        }
    };

    const optionQuestion2Chart = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        precision: 0
                    }
                }
            ]
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (TooltipItem) {
                        let total = 0;
                        for (
                            let i = 0;
                            i < question2FeedbackState.datasets[0].data.length;
                            i++
                        ) {
                            total += question2FeedbackState.datasets[0].data[i];
                        }

                        const percentage = (
                            (parseInt(TooltipItem.formattedValue) / total) *
                            100
                        ).toFixed(0);
                        // return `${currentValue} (${percentage}%)`;
                        let label =
                            'Rating: ' +
                            percentage +
                            `% (${TooltipItem.formattedValue})`;
                        return label;
                    }
                }
            }
        }
    };

    const optionQuestion3Chart = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        precision: 0
                    }
                }
            ]
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (TooltipItem) {
                        let total = 0;
                        for (
                            let i = 0;
                            i < question3FeedbackState.datasets[0].data.length;
                            i++
                        ) {
                            total += question3FeedbackState.datasets[0].data[i];
                        }

                        const percentage = (
                            (parseInt(TooltipItem.formattedValue) / total) *
                            100
                        ).toFixed(0);
                        // return `${currentValue} (${percentage}%)`;
                        let label =
                            'Rating: ' +
                            percentage +
                            `% (${TooltipItem.formattedValue})`;
                        return label;
                    }
                }
            }
        }
    };

    const optionQuestion4Chart = {
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (TooltipItem) {
                        let total = 0;
                        for (
                            let i = 0;
                            i < question4FeedbackState.datasets[0].data.length;
                            i++
                        ) {
                            total += question4FeedbackState.datasets[0].data[i];
                        }
                        const percentage = (
                            (TooltipItem.parsed / total) *
                            100
                        ).toFixed(0);
                        // return `${currentValue} (${percentage}%)`;
                        let label =
                            TooltipItem.label +
                            ': ' +
                            percentage +
                            `% (${TooltipItem.parsed})`;
                        return label;
                    }
                }
            }
        }
    };

    const optionQuestion5AChart = {
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (TooltipItem) {
                        let total = 0;
                        for (
                            let i = 0;
                            i < question5AFeedbackState.datasets[0].data.length;
                            i++
                        ) {
                            total +=
                                question5AFeedbackState.datasets[0].data[i];
                        }
                        const percentage = (
                            (TooltipItem.parsed / total) *
                            100
                        ).toFixed(0);
                        // return `${currentValue} (${percentage}%)`;
                        let label =
                            TooltipItem.label +
                            ': ' +
                            percentage +
                            `% (${TooltipItem.parsed})`;
                        return label;
                    }
                }
            }
        }
    };

    const optionQuestion5BChart = {
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (TooltipItem) {
                        let total = 0;
                        for (
                            let i = 0;
                            i < question5BFeedbackState.datasets[0].data.length;
                            i++
                        ) {
                            total +=
                                question5BFeedbackState.datasets[0].data[i];
                        }
                        const percentage = (
                            (TooltipItem.parsed / total) *
                            100
                        ).toFixed(0);
                        // return `${currentValue} (${percentage}%)`;
                        let label =
                            TooltipItem.label +
                            ': ' +
                            percentage +
                            `% (${TooltipItem.parsed})`;
                        return label;
                    }
                }
            }
        }
    };

    const optionFeedbackSentVsReceived = {
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (TooltipItem) {
                        let total = 0;
                        for (
                            let i = 0;
                            i <
                            questionFeedbackSentvsReceivedState.datasets[0].data
                                .length;
                            i++
                        ) {
                            total +=
                                questionFeedbackSentvsReceivedState.datasets[0]
                                    .data[i];
                        }
                        const percentage = (
                            (TooltipItem.parsed / total) *
                            100
                        ).toFixed(0);
                        // return `${currentValue} (${percentage}%)`;
                        let label =
                            TooltipItem.label +
                            ': ' +
                            percentage +
                            `% (${TooltipItem.parsed})`;
                        return label;
                    }
                }
            }
        }
    };

    const { feedbacks, isLoading } = useSelector((state) => ({
        feedbacks: state.feedback.feedbacks,
        isLoading: state.feedback.isLoading
    }));

    useEffect(() => {
        dispatch(getFeedbackByEventID(eventId));
    }, [dispatch, eventId]);

    useEffect(() => {
        if (!isLoading) {
            setQuestion1FeedbackState({
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                    {
                        label: 'How likely are you to recommend Netcompany as a workplace to your friend/colleague?',
                        data: feedbacks.chart1,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 210, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 210, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            });
            setQuestion2FeedbackState({
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                    {
                        label: 'Do you find the content of the seminar helpful?',
                        data: feedbacks.chart2,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 210, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 210, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            });
            setQuestion3FeedbackState({
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                datasets: [
                    {
                        label: 'What is your willingness to recommend a future NC seminar to a friend or a colleague?',
                        data: feedbacks.chart3,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 210, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 210, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            });
            setQuestion4FeedbackState({
                labels: ['Yes', 'No'],
                datasets: [
                    {
                        label: 'Would you like us to send you upcoming events and seminar notification?',
                        data: feedbacks.chart4,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            });
            setQuestion5AFeedbackState({
                labels: ['Very Poor', 'Poor', 'Moderate', 'Good', 'Execellent'],
                datasets: [
                    {
                        label: 'Please rate the following as you see fit on the seminar: Presentation Quality',
                        data: feedbacks.chart5A,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            });
            setQuestion5BFeedbackState({
                labels: ['Very Poor', 'Poor', 'Moderate', 'Good', 'Execellent'],
                datasets: [
                    {
                        label: 'Please rate the following as you see fit on the seminar: Speaker Knowledge',
                        data: feedbacks.chart5B,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            });
            setQuestionFeedbackSentvsReceivedState({
                labels: ['Sent', 'Received'],
                datasets: [
                    {
                        label: 'Feedback Sent vs Feedback Received',
                        data: feedbacks.chartSendVsReceived,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            });
            setQuestion6FeedbackState(feedbacks.chart6);
            setQuestionParticipantAgreeState(feedbacks.chartParticipantAgree);
        }
    }, [feedbacks, isLoading]);

    const handleOnExport = () => {
        const exportData = feedbacks.raw;
        const csvOptions = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: `${eventName} Feedback`,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            filename: `${eventName} Feedback`
        };
        const csvExporter = new ExportToCsv(csvOptions);
        csvExporter.generateCsv(exportData);
    };

    return (
        <>
            {isLoading ? (
                <div className={css.contentWrapper} align="center">
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <Paper elevation={0} className={css.paper}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography
                                className={css.title}
                                align="left"
                                variant="h4">
                                Feedback Review
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            {feedbacks.raw.length == 0 ? (
                                <Button
                                    variant="contained"
                                    disabled
                                    className={css.exportBtn}
                                    onClick={() => handleOnExport()}>
                                    <Typography className={css.titleExportBtn}>
                                        <GetAppIcon
                                            className={css.iconAnalysis}
                                        />
                                        Export
                                    </Typography>
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    className={css.exportBtn}
                                    onClick={() => handleOnExport()}>
                                    <Typography className={css.titleExportBtn}>
                                        <GetAppIcon
                                            className={css.iconAnalysis}
                                        />
                                        Export
                                    </Typography>
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    <div align="center">
                        <Grid container spacing={2}>
                            {/* QUESTION 1 */}
                            <Grid item xs={12}>
                                <Paper className={css.paperChart}>
                                    <Box height="25%">
                                        <Typography className={css.labelChart}>
                                            How likely are you to recommend
                                            Netcompany as a workplace to your
                                            friend/colleague?
                                        </Typography>

                                        <Bar
                                            style={{ marginTop: 16 }}
                                            data={question1FeedbackState}
                                            options={optionQuestion1Chart}
                                            height={75}
                                        />
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* QUESTION 2 */}
                            <Grid item xs={12} md={6}>
                                <Paper className={css.paperChart}>
                                    <Typography className={css.labelChart}>
                                        Do you find the content of the seminar
                                        helpful?
                                    </Typography>
                                    <Bar
                                        style={{ marginTop: 42 }}
                                        data={question2FeedbackState}
                                        options={optionQuestion2Chart}
                                    />
                                </Paper>
                            </Grid>

                            {/* QUESTION 3 */}
                            <Grid item xs={12} md={6}>
                                <Paper className={css.paperChart}>
                                    <Typography className={css.labelChart}>
                                        What is your willingness to recommend a
                                        future NC seminar to a friend or a
                                        colleague?
                                    </Typography>
                                    <Bar
                                        style={{ marginTop: 16 }}
                                        data={question3FeedbackState}
                                        options={optionQuestion3Chart}
                                    />
                                </Paper>
                            </Grid>

                            {/* Feedback Sent / Feedback Recieved */}
                            <Grid item xs={12} md={6}>
                                <Paper className={css.pie}>
                                    <Typography className={css.labelChart}>
                                        Feedback Sent vs Feedback Received
                                    </Typography>
                                    {!Array.isArray(
                                        questionFeedbackSentvsReceivedState
                                            .datasets[0].data
                                    ) ? (
                                        <></>
                                    ) : questionFeedbackSentvsReceivedState
                                          .datasets[0].data[0] === 0 &&
                                      questionFeedbackSentvsReceivedState
                                          .datasets[0].data[1] === 0 ? (
                                        <article className={css.chartContainer}>
                                            <Pie
                                                data={noDataPieChartData}
                                                options={optionNoDataPieChart}
                                            />
                                        </article>
                                    ) : (
                                        <article className={css.chartContainer}>
                                            <Pie
                                                data={
                                                    questionFeedbackSentvsReceivedState
                                                }
                                                options={
                                                    optionFeedbackSentVsReceived
                                                }
                                            />
                                        </article>
                                    )}
                                </Paper>
                            </Grid>

                            {/* QUESTION 4 */}
                            <Grid item xs={12} md={6}>
                                <Paper className={css.pie}>
                                    <Typography className={css.labelChart}>
                                        Would you like us to send you upcoming
                                        events and seminar notification?
                                    </Typography>
                                    {!Array.isArray(
                                        question4FeedbackState.datasets[0].data
                                    ) ? (
                                        <></>
                                    ) : question4FeedbackState.datasets[0]
                                          ?.data[0] === 0 &&
                                      question4FeedbackState.datasets[0]
                                          ?.data[1] === 0 ? (
                                        <article className={css.chartContainer}>
                                            <Pie
                                                data={noDataPieChartData}
                                                options={optionNoDataPieChart}
                                            />
                                        </article>
                                    ) : (
                                        <article className={css.chartContainer}>
                                            <Pie
                                                data={question4FeedbackState}
                                                options={optionQuestion4Chart}
                                            />
                                        </article>
                                    )}
                                </Paper>
                            </Grid>

                            {/* QUESTION 5A */}
                            <Grid item xs={12} md={6}>
                                <Paper className={css.pie}>
                                    <Typography className={css.labelChart}>
                                        Please rate the following as you see fit
                                        on the seminar: Presentation Quality
                                    </Typography>
                                    {!Array.isArray(
                                        question5AFeedbackState.datasets[0].data
                                    ) ? (
                                        <></>
                                    ) : question5AFeedbackState.datasets[0]
                                          ?.data[0] === 0 &&
                                      question5AFeedbackState.datasets[0]
                                          ?.data[1] === 0 &&
                                      question5AFeedbackState.datasets[0]
                                          ?.data[2] === 0 &&
                                      question5AFeedbackState.datasets[0]
                                          ?.data[3] === 0 &&
                                      question5AFeedbackState.datasets[0]
                                          ?.data[4] === 0 ? (
                                        <article className={css.chartContainer}>
                                            <Pie
                                                data={noDataPieChartData}
                                                options={optionNoDataPieChart}
                                            />
                                        </article>
                                    ) : (
                                        <article className={css.chartContainer}>
                                            <Pie
                                                data={question5AFeedbackState}
                                                options={optionQuestion5AChart}
                                            />
                                        </article>
                                    )}
                                </Paper>
                            </Grid>

                            {/* QUESTION 5B */}
                            <Grid item xs={12} md={6}>
                                <Paper className={css.pie}>
                                    <Typography className={css.labelChart}>
                                        Please rate the following as you see fit
                                        on the seminar: Speaker Knowledge
                                    </Typography>
                                    {!Array.isArray(
                                        question5BFeedbackState.datasets[0].data
                                    ) ? (
                                        <></>
                                    ) : question5BFeedbackState.datasets[0]
                                          .data[0] === 0 &&
                                      question5BFeedbackState.datasets[0]
                                          .data[1] === 0 &&
                                      question5BFeedbackState.datasets[0]
                                          .data[2] === 0 &&
                                      question5BFeedbackState.datasets[0]
                                          .data[3] === 0 &&
                                      question5BFeedbackState.datasets[0]
                                          .data[4] === 0 ? (
                                        <article className={css.chartContainer}>
                                            <Pie
                                                data={noDataPieChartData}
                                                options={optionNoDataPieChart}
                                            />
                                        </article>
                                    ) : (
                                        <article className={css.chartContainer}>
                                            <Pie
                                                data={question5BFeedbackState}
                                                options={optionQuestion5BChart}
                                            />
                                        </article>
                                    )}
                                </Paper>
                            </Grid>

                            {/* Agree to receive notification */}
                            <Grid item xs={12}>
                                <Paper className={css.paperChart}>
                                    <Typography className={css.labelChart}>
                                        Participants agree to receive future
                                        notifications
                                    </Typography>
                                    <Table
                                        className={css.table}
                                        aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Email</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {questionParticipantAgreeState?.length !==
                                            0 ? (
                                                questionParticipantAgreeState?.map(
                                                    (value, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell
                                                                component="th"
                                                                scope="row">
                                                                {value}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )
                                            ) : (
                                                <>
                                                    <TableRow
                                                        style={{
                                                            height: 50 * 5
                                                        }}>
                                                        <TableCell
                                                            colSpan={5}
                                                            align="center">
                                                            <Typography>
                                                                No Data
                                                                Available
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            )}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>

                            {/* QUESTION 6 */}
                            <Grid item xs={12}>
                                <Paper className={css.paperChart}>
                                    <Typography className={css.labelChart}>
                                        Please provide any suggestions to help
                                        us improve the quality of future event.
                                    </Typography>
                                    <Table
                                        className={css.table}
                                        aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Sender</TableCell>
                                                <TableCell align="left">
                                                    Answer
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {question6FeedbackState?.length !==
                                            0 ? (
                                                question6FeedbackState?.map(
                                                    (result) => (
                                                        <TableRow
                                                            key={result.sender}>
                                                            <TableCell
                                                                component="th"
                                                                scope="row">
                                                                {result.sender}
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row">
                                                                {result.answer}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )
                                            ) : (
                                                <>
                                                    <TableRow
                                                        style={{
                                                            height: 50 * 5
                                                        }}>
                                                        <TableCell
                                                            colSpan={5}
                                                            align="center">
                                                            <Typography>
                                                                No Data
                                                                Available
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            )}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            )}
        </>
    );
};

export default FeedbackAnalysis;

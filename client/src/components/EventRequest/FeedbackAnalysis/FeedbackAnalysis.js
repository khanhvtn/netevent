import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Grid,
    Paper,
    Typography,
    CircularProgress
} from '@material-ui/core';
import useStyles from './styles';
import { Bar, Pie } from 'react-chartjs-2';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getFeedbackByEventID } from '../../../actions/feedbackActions';

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
            data: [0, 0],
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

const optionQuestion1Chart = {
    scales: {
        y: [
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
        }
    }
};

const optionQuestion4Chart = {
    plugins: {
        legend: {
            display: false
        }
    }
};

const optionQuestion5AChart = {
    plugins: {
        legend: {
            display: false
        }
    }
};

const optionQuestion5BChart = {
    plugins: {
        legend: {
            display: false
        }
    }
};

const FeedbackAnalysis = ({ eventId }) => {
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
            setQuestion6FeedbackState(feedbacks.chart6);
        }
    }, [feedbacks, isLoading]);

    return (
        <>
            {isLoading ? (
                <div className={css.contentWrapper} align="center">
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <Paper elevation={0} className={css.paper}>
                    <div className={css.tmp} align="center">
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Box height="25%">
                                    <Typography className={css.labelChart}>
                                        How likely are you to recommend
                                        Netcompany as a workplace to your
                                        friend/colleague?
                                    </Typography>
                                    <Bar
                                        data={question1FeedbackState}
                                        options={optionQuestion1Chart}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={css.labelChart}>
                                    Do you find the content of the seminar
                                    helpful?
                                </Typography>
                                <Bar
                                    data={question2FeedbackState}
                                    options={optionQuestion2Chart}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={css.labelChart}>
                                    What is your willingness to recommend a
                                    future NC seminar to a friend or a
                                    colleague?
                                </Typography>
                                <Bar
                                    data={question3FeedbackState}
                                    options={optionQuestion3Chart}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={css.labelChart}>
                                    Would you like us to send you upcoming
                                    events and seminar notification?
                                </Typography>
                                <Pie
                                    data={question4FeedbackState}
                                    options={optionQuestion4Chart}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Typography className={css.labelChart}>
                                    Please rate the following as you see fit on
                                    the seminar: Presentation Quality
                                </Typography>
                                <Pie
                                    data={question5AFeedbackState}
                                    options={optionQuestion5AChart}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Typography className={css.labelChart}>
                                    Please rate the following as you see fit on
                                    the seminar: Speaker Knowledge
                                </Typography>
                                <Pie
                                    data={question5BFeedbackState}
                                    options={optionQuestion5BChart}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={css.labelChart}>
                                    Please provide any suggestions to help us
                                    improve the quality of future event.
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
                                        {question6FeedbackState?.map(
                                            (result) => (
                                                <TableRow key={result.sender}>
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
                                        )}
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            )}
        </>
    );
};

export default FeedbackAnalysis;

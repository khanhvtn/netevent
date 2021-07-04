import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { Pie, Bar } from 'react-chartjs-2';
import { getAllParicipant } from '../../actions/participantActions';
import { getAllEvent } from '../../actions/eventActions';
import GetAppIcon from '@material-ui/icons/GetApp';

import { useDispatch, useSelector } from 'react-redux';
const options = {
    maintainAspectRatio: false // Don't maintain w/h ratio
};

// const completedEventDataState = {
//     eventName: '',
//     count: 0
// };

const data = {
    labels: ['Signed Up', 'Showed Up'],
    datasets: [
        {
            label: 'Signed Up vs Showed Up',
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

const dataBarChart = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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

const dataVerticalBarChart = {
    labels: [],
    datasets: [
        {
            label: 'Total Participants of Completed Events',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }
    ]
};

const optionBarChart = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
        bar: {
            borderWidth: 2
        }
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right'
        }
    }
};

const optionVerticalBarChart = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true
                }
            }
        ]
    }
};
const EventAnalysis = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState(data);
    const [barChartData, setBarChartData] = useState(dataBarChart);
    const [verticalBarChartData, setVerticalBarChartData] =
        useState(dataVerticalBarChart);
    // const [completedEventData, setCompletedEventData] = useState(completedEventDataState);
    const { participants, isLoading, events, eventLoading } = useSelector(
        (state) => ({
            participants: state.participant.allParticipants,
            isLoading: state.participant.isLoading,
            events: state.event.events,
            eventLoading: state.event.isLoading
        })
    );

    useEffect(() => {
        dispatch(getAllParicipant());
        dispatch(getAllEvent());
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading) {
            // const totalParticipants = participants.length;
            const totalParticipantSignedUp = participants.filter(
                (participant) => participant.isValid == true
            ).length;
            const totalParticipantShowedUp = participants.filter(
                (participant) => participant.isAttended == true
            ).length;

            const percentageOfShowedUpParticipant =
                (totalParticipantShowedUp / totalParticipantSignedUp) * 100;
            const percentageOfSignUp = 100 - percentageOfShowedUpParticipant;

            const newDataChart = {
                labels: ['Signed Up', 'Showed Up'],
                datasets: [
                    {
                        label: 'Percentage of People Showing Up Across All Events',
                        data: [
                            percentageOfSignUp,
                            percentageOfShowedUpParticipant
                        ],
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
            };
            setChartData(newDataChart);
        }
    }, [dispatch, isLoading, participants]);

    useEffect(() => {
        if (!eventLoading) {
            const pendingEvents = events.filter(
                (event) => event.isApproved == null
            ).length;
            const approvedEvents = events.filter(
                (event) => event.isApproved == true
            ).length;
            const completedEvents = events.filter(
                (event) => event.isFinished == true
            ).length;
            const onGoing = events.filter(
                (event) => event.isFinished == false && event.isApproved == true
            ).length;
            const rejected = events.filter(
                (event) => event.isApproved == false
            ).length;
            const totalEvents = events.length;

            const newDataBarChart = {
                labels: [
                    'Pending',
                    'Approved',
                    'Rejected',
                    'On-going',
                    'Completed',
                    'Total'
                ],
                datasets: [
                    {
                        label: 'Number of Events',
                        data: [
                            pendingEvents,
                            approvedEvents,
                            rejected,
                            onGoing,
                            completedEvents,
                            totalEvents
                        ],
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

            setBarChartData(newDataBarChart);
        }
    }, [dispatch, eventLoading, events]);

    useEffect(() => {
        if (!eventLoading && !isLoading) {
            const completedEvents = events.filter(
                (event) => event.isFinished == true && event.isApproved == true
            );
            const labelNames = completedEvents.map(
                (completedEvent) => completedEvent.eventName
            );
            let showedUpParticipants = [];
            for (let i = 0; i < labelNames.length; i++) {
                let count = 0;
                for (let x = 0; x < participants.length; x++) {
                    if (participants[x].event != null) {
                        if (
                            participants[x].event.eventName === labelNames[i] &&
                            participants[x].isAttended === true
                        ) {
                            count += 1;
                        }
                    }
                }
                showedUpParticipants.push(count);
            }
            console.log(showedUpParticipants);
            const newVerticalBarChart = {
                labels: labelNames,
                datasets: [
                    {
                        label: 'Total Participants of Completed Events',
                        data: showedUpParticipants,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            };
            setVerticalBarChartData(newVerticalBarChart);
        }
    }, [dispatch, eventLoading, isLoading, events, participants]);

    return (
        <Paper elevation={0} className={css.paper}>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Typography
                        className={css.title}
                        style={{ fontWeight: 'bold' }}
                        align="left"
                        variant="h4">
                        Analysis
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        className={css.exportBtn}
                        onClick={() => handleOnExport()}>
                        <Typography className={css.titleExportBtn}>
                            <GetAppIcon className={css.iconAnalysis} />
                            Export
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={css.chartTypo}>
                        {/* <PieChartIcon
                                    className={css.iconAnalysis}
                                /> */}
                        Percentage of People Showing Up Across All Events
                    </Typography>
                    <article className={css.chartContainer}>
                        <Pie data={chartData} options={options} />
                    </article>
                </Grid>

                <Grid item xs={6}>
                    <Typography className={css.chartTypo}>
                        {/* <PieChartIcon
                                    className={css.iconAnalysis}
                                /> */}
                        Number of Events
                    </Typography>
                    <article className={css.chartContainer}>
                        <Bar data={barChartData} options={optionBarChart} />
                    </article>
                </Grid>

                <Grid item xs={6}>
                    <Typography className={css.chartTypo}>
                        {/* <PieChartIcon
                                    className={css.iconAnalysis}
                                /> */}
                        Number of Participants in Completed Events
                    </Typography>
                    <article className={css.chartContainer}>
                        <Bar
                            data={verticalBarChartData}
                            options={optionVerticalBarChart}
                        />
                    </article>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default EventAnalysis;

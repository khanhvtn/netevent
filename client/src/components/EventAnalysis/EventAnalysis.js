import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import {
    Grid,
    Paper,
    Typography,
    Button,
    CircularProgress
} from '@material-ui/core';
import { Pie, Bar } from 'react-chartjs-2';
import { getEventAnalysis } from '../../actions/eventActions';
import GetAppIcon from '@material-ui/icons/GetApp';
import { ExportToCsv } from 'export-to-csv';
import PieChartIcon from '@material-ui/icons/PieChart';
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
    },
    ticks: {
        precision: 0
    }
};
const EventAnalysis = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState(data);
    const [barChartData, setBarChartData] = useState(dataBarChart);
    const [verticalBarChartData, setVerticalBarChartData] =
        useState(dataVerticalBarChart);
    const { loadingAnalysis, analysis } = useSelector((state) => ({
        loadingAnalysis: state.event.loadingAnalysis,
        analysis: state.event.analysis
    }));

    useEffect(() => {
        dispatch(getEventAnalysis());
    }, [dispatch]);

    useEffect(() => {
        if (!loadingAnalysis && analysis.completedEventNames !== undefined) {
            // const totalParticipants = participants.length;
            const newDataChart = {
                labels: ['Signed Up', 'Showed Up'],
                datasets: [
                    {
                        label: 'Percentage of People Showing Up Across All Events',
                        data: [
                            analysis.percentageOfSignup,
                            analysis.percentageOfShowedUpParticipant
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
                            analysis.pendingEvents,
                            analysis.approvedEvents,
                            analysis.rejected,
                            analysis.onGoing,
                            analysis.completedEvents,
                            analysis.totalEvents
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
            const newVerticalBarChart = {
                labels: analysis.completedEventNames,
                datasets: [
                    {
                        label: 'Total Participants of Completed Events',
                        data: analysis.completedEventParticipants,
                        backgroundColor: [],
                        borderColor: [],
                        borderWidth: 1
                    }
                ]
            };
            for (let z = 0; z < analysis.completedEventNames.length; z++) {
                //Generate Random RGBA
                var r = () => (Math.random() * 256) >> 0;
                newVerticalBarChart.datasets[0].backgroundColor.push(
                    `rgba(${r()}, ${r()}, ${r()}, 0.2)`
                );
                newVerticalBarChart.datasets[0].borderColor.push(
                    `rgba(${r()}, ${r()}, ${r()}, 1)`
                );
            }
            setVerticalBarChartData(newVerticalBarChart);
            setBarChartData(newDataBarChart);
            setChartData(newDataChart);
        }
    }, [analysis, loadingAnalysis]);

    const handleOnExport = () => {
        const exportEventData = [
            {
                'Signed Up': chartData.datasets[0].data[0],
                'Showed Up': chartData.datasets[0].data[1],
                'Pending Events': barChartData.datasets[0].data[0],
                'Approved Events': barChartData.datasets[0].data[1],
                'Rejected Events': barChartData.datasets[0].data[2],
                'On-going Events': barChartData.datasets[0].data[3],
                'Completed Events': barChartData.datasets[0].data[4],
                'Completed Event Name': verticalBarChartData.labels
            },

            {
                'Signed Up': '',
                'Showed Up': '',
                'Pending Events': '',
                'Approved Events': '',
                'Rejected Events': '',
                'On-going Events': '',
                'Completed Events': '',
                'Completed Event Name': verticalBarChartData.datasets[0].data
            }
        ];
        const csvOptions = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: `Event Analysis`,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            filename: `Event Analysis`
        };
        const csvExporter = new ExportToCsv(csvOptions);
        csvExporter.generateCsv(exportEventData);
        console.log(exportEventData);
    };

    return (
        <>
            {loadingAnalysis ? (
                <div className={css.contentWrapper} align="center">
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <Paper elevation={0} className={css.paper}>
                    <Grid container className={css.gridChart}>
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
                                <PieChartIcon className={css.iconAnalysis} />
                                Percentage of People Showing Up Across All
                                Events
                            </Typography>
                            <article className={css.chartContainer}>
                                <Pie data={chartData} options={options} />
                            </article>
                        </Grid>

                        <Grid item xs={6}>
                            <Typography className={css.chartTypo}>
                                <PieChartIcon className={css.iconAnalysis} />
                                Number of Events
                            </Typography>
                            <article className={css.chartContainer}>
                                <Bar
                                    data={barChartData}
                                    options={optionBarChart}
                                />
                            </article>
                        </Grid>
                        <Grid container spacing={3} style={{ paddingTop: 10 }}>
                            <Grid item xs={6}>
                                <Typography className={css.chartTypo}>
                                    <PieChartIcon
                                        className={css.iconAnalysis}
                                    />
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
                    </Grid>
                </Paper>
            )}
        </>
    );
};

export default EventAnalysis;

import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import {
    Grid,
    Paper,
    Typography,
    Button,
    CircularProgress,
    Toolbar,
    Tooltip,
    IconButton
} from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { Pie, Bar } from 'react-chartjs-2';
import { getEventAnalysis } from '../../actions/eventActions';
import GetAppIcon from '@material-ui/icons/GetApp';
import { ExportToCsv } from 'export-to-csv';
import PieChartIcon from '@material-ui/icons/PieChart';
import { useDispatch, useSelector } from 'react-redux';
import EventAnalysisFilter from './EventAnalysisFilter/EventAnalysisFilter';
import { getLastMonth } from '../../utils';

const signUpAndShowUpData = {
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

const eventStatusData = {
    labels: [],
    datasets: [
        {
            label: 'Event with Status',
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

const participantOfCompletedEventData = {
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
            position: 'top'
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

const initialState = {
    startFrom: getLastMonth(),
    startTo: new Date()
};

const filterState = {
    startFrom: getLastMonth(),
    startTo: new Date()
};

const EventAnalysis = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [signUpAndShowUpState, setSignUpAndShowUpState] =
        useState(signUpAndShowUpData);
    const [eventStatusState, setEventStatusState] = useState(eventStatusData);
    const [
        participantOfCompletedEventState,
        setParticipantOfCompletedEventState
    ] = useState(participantOfCompletedEventData);

    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);

    // Get selector redux store
    const { loadingAnalysis, analysis } = useSelector((state) => ({
        loadingAnalysis: state.event.loadingAnalysis,
        analysis: state.event.analysis
    }));

    // Use Effect for get event analysis
    useEffect(() => {
        dispatch(
            getEventAnalysis({
                startFrom: state.startFrom,
                startTo: state.startTo
            })
        );
    }, [dispatch, state.startFrom, state.startTo]);

    useEffect(() => {
        if (!loadingAnalysis && analysis.completedEventNames !== undefined) {
            // const totalParticipants = participants.length;
            const newSignUpAndShowUpData = {
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
            const newEventStatusData = {
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
                        label: 'Number of events',
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
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(170,175,180, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(170,175,180, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            };
            const newParticipantOfCompletedEventData = {
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
                newParticipantOfCompletedEventData.datasets[0].backgroundColor.push(
                    `rgba(${r()}, ${r()}, ${r()}, 0.2)`
                );
                newParticipantOfCompletedEventData.datasets[0].borderColor.push(
                    `rgba(${r()}, ${r()}, ${r()}, 1)`
                );
            }
            setParticipantOfCompletedEventState(
                newParticipantOfCompletedEventData
            );
            setEventStatusState(newEventStatusData);
            setSignUpAndShowUpState(newSignUpAndShowUpData);
        }
    }, [analysis, loadingAnalysis]);

    const handleOnExport = () => {
        const exportEventData = [
            {
                'Signed Up': signUpAndShowUpState.datasets[0].data[0],
                'Showed Up': signUpAndShowUpState.datasets[0].data[1],
                'Pending Events': eventStatusState.datasets[0].data[0],
                'Approved Events': eventStatusState.datasets[0].data[1],
                'Rejected Events': eventStatusState.datasets[0].data[2],
                'On-going Events': eventStatusState.datasets[0].data[3],
                'Completed Events': eventStatusState.datasets[0].data[4],
                'Completed Event Name': participantOfCompletedEventState.labels
            },

            {
                'Signed Up': '',
                'Showed Up': '',
                'Pending Events': '',
                'Approved Events': '',
                'Rejected Events': '',
                'On-going Events': '',
                'Completed Events': '',
                'Completed Event Name':
                    participantOfCompletedEventState.datasets[0].data
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

    //handle ToggleFilter
    const handleToggleFilter = () => {
        setState((prevState) => ({
            ...prevState,
            openFilter: !prevState.openFilter
        }));
    };

    //handle Apply Filter
    const handleApplyFilter = () => {
        setState((prevState) => ({
            ...prevState,
            ...filters,
            openFilter: !prevState.openFilter
        }));
    };

    //handle Clear Filter
    const handleClearFilter = () => {
        setFilters((prevState) => ({
            ...prevState,
            ...filterState
        }));
        setState((prevState) => ({
            ...prevState,
            openFilter: !prevState.openFilter
        }));
    };

    return (
        <>
            {loadingAnalysis ? (
                <div className={css.circularProgress} align="center">
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <>
                    <Paper elevation={0} className={css.paper}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Paper className={css.paperToolbar}>
                                    <Toolbar>
                                        <Typography
                                            className={css.title}
                                            style={{ fontWeight: 'bold' }}
                                            align="left"
                                            variant="h4">
                                            Analysis
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            className={css.exportBtn}
                                            onClick={() => handleOnExport()}>
                                            <Typography
                                                className={css.titleExportBtn}>
                                                <GetAppIcon
                                                    className={css.iconAnalysis}
                                                />
                                                Export
                                            </Typography>
                                        </Button>
                                        <Tooltip
                                            title="Filter"
                                            className={css.filterButton}
                                            onClick={handleToggleFilter}>
                                            <div>
                                                <IconButton color="inherit">
                                                    <FilterList />
                                                </IconButton>
                                            </div>
                                        </Tooltip>
                                    </Toolbar>
                                </Paper>
                            </Grid>

                            {/* Number of participant in completed events */}
                            <Grid item xs={12}>
                                <Paper className={css.paperChart}>
                                    <div align="center">
                                        <Typography
                                            align="center"
                                            className={css.chartTypo}>
                                            <PieChartIcon
                                                className={css.iconAnalysis}
                                            />
                                            Number of Participants in Completed
                                            Events
                                        </Typography>
                                    </div>
                                    <Bar
                                        data={participantOfCompletedEventState}
                                        options={optionVerticalBarChart}
                                        height={80}
                                    />
                                </Paper>
                            </Grid>

                            <Grid container direction="row" item xs={12}>
                                {/* Number of Events Chart */}
                                <Grid
                                    justifyContent="center"
                                    alignItems="center"
                                    item
                                    xs={12}
                                    md={6}>
                                    <Paper
                                        style={{ justifyContent: 'center' }}
                                        className={css.paperChart}>
                                        <div align="center">
                                            <Typography
                                                align="center"
                                                className={css.chartTypo}>
                                                <PieChartIcon
                                                    className={css.iconAnalysis}
                                                />
                                                Percentage of People Showing Up
                                                Across All Events
                                            </Typography>
                                            <div style={{ width: '50%' }}>
                                                <Pie
                                                    data={signUpAndShowUpState}
                                                />
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>

                                {/* Number of showing up event chart */}
                                <Grid
                                    justifyContent="center"
                                    alignItems="center"
                                    item
                                    xs={12}
                                    md={6}>
                                    <Paper className={css.paperChart}>
                                        <div align="center">
                                            <Typography
                                                align="center"
                                                className={css.chartTypo}>
                                                <PieChartIcon
                                                    className={css.iconAnalysis}
                                                />
                                                Number of Events
                                            </Typography>
                                        </div>
                                        <Bar
                                            data={eventStatusState}
                                            options={optionBarChart}
                                        />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Filter Sidebar */}
                    <EventAnalysisFilter
                        openFilter={state.openFilter}
                        startFrom={filters.startFrom}
                        startTo={filters.startTo}
                        setFilters={setFilters}
                        handleToggleFilter={handleToggleFilter}
                        handleApplyFilter={handleApplyFilter}
                        handleClearFilter={handleClearFilter}
                    />
                </>
            )}
        </>
    );
};

export default EventAnalysis;

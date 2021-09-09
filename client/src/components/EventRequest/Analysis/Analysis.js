import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import {
    Grid,
    Typography,
    Paper,
    CircularProgress,
    Button
} from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import PieChartIcon from '@material-ui/icons/PieChart';
import { getEventAnalysisByID } from '../../../actions/eventActions';
import { useDispatch, useSelector } from 'react-redux';
import GetAppIcon from '@material-ui/icons/GetApp';
import { ExportToCsv } from 'export-to-csv';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';
const options = {
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            display: function (context) {
                return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
            },
            color: '#36A2EB',
            font: {
                weight: 'bold'
            },
            formatter: function (value) {
                return value;
            }
        }
    }
};

const signUpAndShowUpData = {
    labels: ['Signed Up', 'Showed Up'],
    datasets: [
        {
            label: 'Signed Up vs Showed Up',
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

const signUpAndOpenUpData = {
    labels: ['Signed Up', 'Opened Up'],
    datasets: [
        {
            label: 'Signed Up vs Opened Up',
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

const Analysis = ({ eventId, tabs, event }) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [signUpAndShowUpState, setSignUpAndShowUpState] =
        useState(signUpAndShowUpData);
    const [signUpAndOpenUpState, setSignUpAndOpenUpState] =
        useState(signUpAndOpenUpData);

    const { analysisData, analysisLoading } = useSelector((state) => ({
        analysisData: state.event.analysisByID,
        analysisLoading: state.event.loadingAnalysis
    }));
    useEffect(() => {
        if (eventId && tabs === 3) {
            dispatch(getEventAnalysisByID(eventId));
        }
    }, [dispatch, eventId, tabs]);

    useEffect(() => {
        if (!analysisLoading) {
            const newSignUpAndShowUpData = {
                labels: ['Signed Up', 'Showed Up'],
                datasets: [
                    {
                        label: 'Signed Up vs Showed Up',
                        data: [analysisData.signUp, analysisData.showUp],
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
            const newSignUpAndOpenUpData = {
                labels: ['Signed Up', 'Opened Up'],
                datasets: [
                    {
                        label: 'Signed Up vs Opened Up',
                        data: [analysisData.signUp, analysisData.openAmount],
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
            setSignUpAndShowUpState(newSignUpAndShowUpData);
            setSignUpAndOpenUpState(newSignUpAndOpenUpData);
        }
    }, [analysisLoading, analysisData]);

    const handleOnExport = () => {
        const exportData = [
            {
                name: event.eventName,
                language: event.language,
                type: event.eventTypeId.name,
                mode: event.mode,
                location: event.location,
                budget: event.budget,
                accommodation: event.accommodation,
                registrationCloseDate: moment(
                    event.registrationCloseDate
                ).format('LLLL'),
                startDate: moment(event.startDate).format('LLLL'),
                endDate: moment(event.endDate).format('LLLL'),
                maxParticipants: event.maxParticipants,
                tags: event.tags.join(),
                'Sign-up Participants':
                    signUpAndShowUpState.datasets[0].data[0],
                'Showed-up Participants':
                    signUpAndShowUpState.datasets[0].data[1],
                'Opened Time': event.clickAmount
            }
        ];
        const csvOptions = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: `${event.eventName} Analysis`,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            filename: `${event.eventName} Analysis`
        };
        const csvExporter = new ExportToCsv(csvOptions);
        csvExporter.generateCsv(exportData);
    };
    return (
        <>
            {analysisLoading ? (
                <div className={css.contentWrapper} align="center">
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <Paper elevation={0} className={css.paper}>
                    <Grid container>
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
                        <Grid item xs={12} md={6}>
                            <Paper className={css.analysisCard}>
                                <Typography className={css.chartTypo}>
                                    <AssignmentIndIcon
                                        className={css.iconAnalysis}
                                    />
                                    Number of Sign Up Participants
                                </Typography>
                                <Typography className={css.chartTypo1}>
                                    {analysisData.signUp}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper className={css.analysisCard}>
                                <Typography className={css.chartTypo}>
                                    <LibraryAddCheckIcon
                                        className={css.iconAnalysis}
                                    />
                                    Number of Showed Up Participants
                                </Typography>

                                <Typography className={css.chartTypo1}>
                                    {analysisData.showUp}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper className={css.analysisCard}>
                                <Typography className={css.chartTypo}>
                                    <BrandingWatermarkIcon
                                        className={css.iconAnalysis}
                                    />
                                    Opened Times of Registration Page
                                </Typography>

                                <Typography className={css.chartTypo1}>
                                    {analysisData.openAmount}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper className={css.analysisCard}>
                                <Typography className={css.chartTypo}>
                                    <BrandingWatermarkIcon
                                        className={css.iconAnalysis}
                                    />
                                    Number of Valid Participants
                                </Typography>

                                <Typography className={css.chartTypo1}>
                                    {analysisData.valid}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={3}
                        style={{ paddingTop: 10 }}
                        justify="center">
                        <Grid item xs={12} md={6}>
                            <Paper className={css.pie}>
                                <Typography className={css.chartTypo}>
                                    <PieChartIcon
                                        className={css.iconAnalysis}
                                    />
                                    Signed Up vs Showed Up
                                </Typography>
                                <article className={css.chartContainer}>
                                    <Pie
                                        data={
                                            signUpAndShowUpState.datasets[0]
                                                .data[0] === 0 &&
                                            signUpAndShowUpState.datasets[0]
                                                .data[1] === 0
                                                ? noDataPieChartData
                                                : signUpAndShowUpState
                                        }
                                        options={options}
                                        plugins={[ChartDataLabels]}
                                    />
                                </article>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper className={css.pie}>
                                <Typography className={css.chartTypo}>
                                    <PieChartIcon
                                        className={css.iconAnalysis}
                                    />
                                    Signed Up vs Opened
                                </Typography>
                                <article className={css.chartContainer}>
                                    <Pie
                                        data={
                                            signUpAndOpenUpState.datasets[0]
                                                .data[0] === 0 &&
                                            signUpAndOpenUpState.datasets[0]
                                                .data[1] === 0
                                                ? noDataPieChartData
                                                : signUpAndOpenUpState
                                        }
                                        options={options}
                                        plugins={[ChartDataLabels]}
                                    />
                                </article>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </>
    );
};

export default Analysis;

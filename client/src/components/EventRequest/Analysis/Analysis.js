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
import { getParticipantByEventID } from '../../../actions/participantActions';
import { useDispatch, useSelector } from 'react-redux';
import GetAppIcon from '@material-ui/icons/GetApp';
import { ExportToCsv } from 'export-to-csv';
import moment from 'moment';
const options = {
    maintainAspectRatio: false // Don't maintain w/h ratio
};

const data = {
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

const newChartData = {
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

const Analysis = ({ eventId, tabs, event }) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [chartData, setChartData] = useState(data);
    const [chartData2, setChartData2] = useState(newChartData);

    const { participants, isLoading } = useSelector((state) => ({
        participants: state.participant.allParticipants,
        isLoading: state.participant.isLoading
    }));
    useEffect(() => {
        if (eventId && tabs === 3) {
            dispatch(getParticipantByEventID(eventId));
        }
    }, [dispatch, eventId, tabs]);

    useEffect(() => {
        if (!isLoading) {
            const newDataChart = {
                labels: ['Signed Up', 'Showed Up'],
                datasets: [
                    {
                        label: 'Signed Up vs Showed Up',
                        data: [
                            participants.filter(
                                (participant) => participant.isValid == true
                            ).length,
                            participants.filter(
                                (participant) => participant.isAttended == true
                            ).length
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
            const newDataChart2 = {
                labels: ['Signed Up', 'Opened Up'],
                datasets: [
                    {
                        label: 'Signed Up vs Opened Up',
                        data: [
                            participants.filter(
                                (participant) => participant.isValid == true
                            ).length,
                            event.clickAmount
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
            setChartData2(newDataChart2);
        }
    }, [isLoading, participants, event.clickAmount]);

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
                'Sign-up Participants': data.datasets[0].data[0],
                'Showed-up Participants': data.datasets[0].data[1],
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
            {isLoading ? (
                <div className={css.contentWrapper} align="center">
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <Paper elevation={0} className={css.paper}>
                    <Grid container spacing={3}>
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
                            <Paper className={css.analysisCard}>
                                <Typography className={css.chartTypo}>
                                    <AssignmentIndIcon
                                        className={css.iconAnalysis}
                                    />
                                    Number of Sign Up Participants
                                </Typography>
                                <Typography className={css.chartTypo1}>
                                    {
                                        participants.filter(
                                            (participant) =>
                                                participant.isValid == true
                                        ).length
                                    }
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={css.analysisCard}>
                                <Typography className={css.chartTypo}>
                                    <LibraryAddCheckIcon
                                        className={css.iconAnalysis}
                                    />
                                    Number of Showed Up Participants
                                </Typography>

                                <Typography className={css.chartTypo1}>
                                    {
                                        participants.filter(
                                            (participant) =>
                                                participant.isAttended == true
                                        ).length
                                    }
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={css.analysisCard}>
                                <Typography className={css.chartTypo}>
                                    <BrandingWatermarkIcon
                                        className={css.iconAnalysis}
                                    />
                                    Number of times the registration page has
                                    been opened
                                </Typography>

                                <Typography className={css.chartTypo1}>
                                    {event.clickAmount}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={3}
                        style={{ paddingTop: 10 }}
                        justify="center">
                        <Grid item xs={6}>
                            <Paper className={css.pie}>
                                <Typography className={css.chartTypo}>
                                    <PieChartIcon
                                        className={css.iconAnalysis}
                                    />
                                    Signed Up vs Showed Up
                                </Typography>
                                <article className={css.chartContainer}>
                                    <Pie data={chartData} options={options} />
                                </article>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={css.pie}>
                                <Typography className={css.chartTypo}>
                                    <PieChartIcon
                                        className={css.iconAnalysis}
                                    />
                                    Signed Up vs Opened
                                </Typography>
                                <article className={css.chartContainer}>
                                    <Pie data={chartData2} options={options} />
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

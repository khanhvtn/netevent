import { Paper, Typography, Grid, CircularProgress } from '@material-ui/core';
import React, { useCallback, useState, useEffect } from 'react';
import useStyle from './styles';
import QrReader from 'react-qr-reader';
import { useDispatch, useSelector } from 'react-redux';
import SystemNotification from '../Notification/Notification';
import { setAttendedParticipant } from '../../actions/participantActions';
const ParticipantChecking = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [scanDelay, setScanDelay] = useState(1000);
    const [qrCodeData, SetQrCodeDate] = useState('');
    const [openUpdateSnackBar, SetOpenUpdateSnackBar] = useState(false);
    const css = useStyle();
    const dispatch = useDispatch();
    const { isParticipantUpdated } = useSelector((state) => ({
        isParticipantUpdated: state.participant.isUpdated,
        isLoading: state.participant.isLoading
    }));
    // UseEffect for update event success
    useEffect(() => {
        if (isParticipantUpdated) {
            setTimeout(() => {
                setScanDelay(1000);
            }, 3000);
        }
        SetOpenUpdateSnackBar(isParticipantUpdated);
    }, [dispatch, isParticipantUpdated]);

    /* Checking if the Qr Code data is different with the previous data. 
    Then, request to server to change the participant status */
    useEffect(() => {
        if (qrCodeData) {
            setScanDelay(false);
            dispatch(
                setAttendedParticipant({
                    attendedList: [qrCodeData],
                    action: true
                })
            );
        }
    }, [dispatch, qrCodeData]);

    /* Scan QR Code to get value and set it to local state */
    const handleScan = useCallback((value) => {
        if (value) {
            SetQrCodeDate((prevState) => {
                if (prevState === value) {
                    setErrorMessage(
                        'This QR Code already checked. Please try another one!'
                    );
                } else {
                    setErrorMessage('');
                }
                return value;
            });
        }
    }, []);

    //handle Scan Error
    const handleScanError = useCallback((err) => {
        console.log(err);
    }, []);
    return (
        <Paper className={css.wrapper}>
            <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-between"
                spacing={4}>
                <Grid
                    item
                    container
                    direction="column"
                    alignItems="center"
                    justify="center">
                    <Typography variant="h4" gutterBottom>
                        QR Code Checking
                    </Typography>
                    <QrReader
                        showViewFinder
                        delay={scanDelay}
                        onError={handleScanError}
                        onScan={handleScan}
                        style={{ width: '100%', maxWidth: '500px' }}
                    />
                </Grid>
                {scanDelay === false && (
                    <Grid
                        item
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                        spacing={3}>
                        <Typography variant="h6">Verifying.....</Typography>
                        <CircularProgress />
                    </Grid>
                )}
                {errorMessage && scanDelay && (
                    <Grid
                        item
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                        spacing={3}>
                        <Typography color="secondary" variant="h6">
                            {errorMessage}
                        </Typography>
                    </Grid>
                )}
            </Grid>
            {/* Notification */}
            <SystemNotification openUpdateSnackBar={openUpdateSnackBar} />
        </Paper>
    );
};

export default ParticipantChecking;

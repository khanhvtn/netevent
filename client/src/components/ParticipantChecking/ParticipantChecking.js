import {
    Paper,
    Typography,
    Grid,
    CircularProgress,
    Dialog,
    DialogContent,
    Slide
} from '@material-ui/core';
import React, { useCallback, useState, useEffect } from 'react';
import useStyle from './styles';
import QrReader from 'react-qr-reader';
import { useDispatch, useSelector } from 'react-redux';
import { setAttendedParticipantByQrCode } from '../../actions/participantActions';
import './styles.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ParticipantChecking = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [scanDelay, setScanDelay] = useState(1000);
    const [qrCodeData, SetQrCodeDate] = useState('');
    const [openUpdateSnackBar, SetOpenUpdateSnackBar] = useState(false);
    const css = useStyle();
    const dispatch = useDispatch();
    const { isParticipantUpdated, errors, isLoading } = useSelector(
        (state) => ({
            isParticipantUpdated: state.participant.isUpdated,
            isLoading: state.participant.isLoading,
            errors: state.error.errors
        })
    );
    // UseEffect for update event success
    useEffect(() => {
        SetOpenUpdateSnackBar(isParticipantUpdated);
    }, [dispatch, isParticipantUpdated]);

    /* Checking if the Qr Code data is different with the previous data. 
    Then, request to server to change the participant status */
    useEffect(() => {
        if (qrCodeData) {
            setScanDelay(false);
            dispatch(
                setAttendedParticipantByQrCode(
                    {
                        cipherTextQrCodeData: qrCodeData
                    },
                    setScanDelay,
                    setSuccessMessage,
                    setErrorMessage
                )
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
                {scanDelay === false && isLoading === true ? (
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
                ) : errors?.qrCode ? (
                    <Grid
                        item
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                        spacing={3}>
                        <Typography color="secondary" variant="h6">
                            {errors.qrCode}
                        </Typography>
                    </Grid>
                ) : errorMessage && scanDelay ? (
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
                ) : (
                    ''
                )}
            </Grid>
            {/* Notification */}
            <Dialog open={openUpdateSnackBar} TransitionComponent={Transition}>
                <DialogContent className={css.dialogContent}>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        spacing={3}
                        direction="column">
                        <Grid item>
                            <svg
                                className="qr-checked"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 130.2 130.2">
                                <circle
                                    className="path circle"
                                    fill="none"
                                    stroke="#73AF55"
                                    strokeWidth={6}
                                    strokeMiterlimit={10}
                                    cx="65.1"
                                    cy="65.1"
                                    r="62.1"
                                />
                                <polyline
                                    className="path check"
                                    fill="none"
                                    stroke="#73AF55"
                                    strokeWidth={6}
                                    strokeLinecap="round"
                                    strokeMiterlimit={10}
                                    points="100.2,40.2 51.5,88.8 29.8,67.5 "
                                />
                            </svg>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">
                                {successMessage}
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Paper>
    );
};

export default ParticipantChecking;

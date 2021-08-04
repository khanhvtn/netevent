import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Typography,
    IconButton,
    Slide,
    Divider,
    Grid
} from '@material-ui/core';
import moment from 'moment';

import CloseIcon from '@material-ui/icons/Close';
//import useStyles in the last
import useStyles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewParticipantDialog = ({
    openReviewParticipantDialog,
    handleCloseDialogReviewParticipant,
    participant
}) => {
    const css = useStyles();

    console.log(participant);

    return (
        <Dialog
            classes={{ paper: css.dialogPaper }}
            TransitionComponent={Transition}
            maxWidth="sm"
            open={openReviewParticipantDialog}
            fullWidth
            className={css.dialogInviation}
            onClose={handleCloseDialogReviewParticipant}
            aria-labelledby="review-participant-dialog">
            <DialogTitle id="review-participant-dialog">
                <Typography align="center">
                    Participant Information
                    <IconButton
                        size="small"
                        className={css.closeButton}
                        onClick={handleCloseDialogReviewParticipant}>
                        <CloseIcon />
                    </IconButton>
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Typography style={{ fontWeight: 'bold' }} variant="h5">
                    Basic information
                </Typography>
                <Divider style={{ height: 3 }} />

                <div style={{ marginTop: 16, marginBottom: 16 }}>
                    <Grid container direction="row">
                        <Grid xs={12} container direction="column" item>
                            {/*  */}
                            <Typography
                                variant="body1"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#616161'
                                }}>
                                Email
                            </Typography>
                            <DialogContentText>
                                {participant?.email}
                            </DialogContentText>
                        </Grid>

                        <Grid xs={6} container direction="column" item>
                            {/*  */}
                            <Typography
                                variant="body1"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#616161'
                                }}>
                                Name
                            </Typography>
                            <DialogContentText>
                                {participant?.name}
                            </DialogContentText>

                            {/*  */}
                            <Typography
                                variant="body1"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#616161'
                                }}>
                                University
                            </Typography>
                            <DialogContentText>
                                {participant?.school}
                            </DialogContentText>

                            {/*  */}
                            <Typography
                                variant="body1"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#616161'
                                }}>
                                Phone
                            </Typography>
                            <DialogContentText>
                                {participant?.phone}
                            </DialogContentText>
                        </Grid>
                        <Grid xs={6} container direction="column" item>
                            {/*  */}
                            <Typography
                                variant="body1"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#616161'
                                }}>
                                Academic
                            </Typography>
                            <DialogContentText>
                                {participant?.academic}
                            </DialogContentText>

                            {/*  */}
                            <Typography
                                variant="body1"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#616161'
                                }}>
                                Major
                            </Typography>
                            <DialogContentText>
                                {participant?.major}
                            </DialogContentText>

                            {/*  */}
                            <Typography
                                variant="body1"
                                style={{
                                    fontWeight: 'bold',
                                    color: '#616161'
                                }}>
                                DOB
                            </Typography>
                            <DialogContentText>
                                {moment(participant?.DOB).format('L')}
                            </DialogContentText>
                        </Grid>
                    </Grid>
                </div>

                <Typography style={{ fontWeight: 'bold' }} variant="h5">
                    Other information
                </Typography>
                <Divider style={{ height: 3 }} />

                <div style={{ marginTop: 16 }}>
                    {participant?.customizeFieldData.length === 0 ? (
                        <div style={{ marginTop: '10%' }} align="center">
                            <DialogContentText>
                                No data matched.
                            </DialogContentText>
                        </div>
                    ) : (
                        participant?.customizeFieldData.map((data) => {
                            return (
                                <Grid
                                    key={`customize-${data._id}`}
                                    xs={6}
                                    container
                                    direction="column"
                                    item>
                                    <Typography
                                        variant="body1"
                                        style={{
                                            fontWeight: 'bold',
                                            color: '#616161'
                                        }}>
                                        {data.title}
                                    </Typography>
                                    <DialogContentText>
                                        {data.value[0]}
                                    </DialogContentText>
                                </Grid>
                            );
                        })
                    )}
                </div>
            </DialogContent>
            <DialogActions className={css.dialogActions}></DialogActions>
        </Dialog>
    );
};

export default ReviewParticipantDialog;

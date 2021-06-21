import React from 'react';
import {
    CircularProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Slide
} from '@material-ui/core';
import { useSelector } from 'react-redux';
//import useStyles in the last
import useStyles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EventCheckingCompletedDialog = ({
    openCheckingCompletedDialog,
    handleToggleDialogCheckingCompleted,
    handleUpdateEventStatus
}) => {
    const css = useStyles();

    const { isLoading } = useSelector((state) => ({
        isLoading: state.event.isLoading
    }));

    return (
        <>
            {/* Dialog Checking completed */}
            <Dialog
                TransitionComponent={Transition}
                open={openCheckingCompletedDialog}
                onClose={handleToggleDialogCheckingCompleted}
                aria-labelledby="delete-dialog"
                fullWidth
                className={css.dialogDeleteFac}
                aria-describedby="delete-dialog-description">
                <DialogTitle id="delete-dialog">
                    {'Confirm completed event!'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Your event currently out of date! You should update your
                        event's status.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={css.dialogCheckingActions}>
                    <Button
                        fullWidth
                        disabled={isLoading ? true : false}
                        onClick={handleUpdateEventStatus}
                        variant="contained"
                        color="primary">
                        {isLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : (
                            'Confirm Completed'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EventCheckingCompletedDialog;

import React, { useEffect } from 'react';
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

const ReviewEventDialog = ({
  openReviewEventDialog,
  handleToggleDialogReviewEvent,
  handleUpdateEventStatus
}) => {
  const css = useStyles();

  const { isLoading, updateEventSuccess } = useSelector((state) => ({
    isLoading: state.event.isLoading,
    updateEventSuccess: state.event.updateSuccess
  }));

  //useEffect for create event success
  useEffect(() => {
    if (updateEventSuccess) {
      handleToggleDialogReviewEvent();
    }
  }, [updateEventSuccess]);

  return (
    <>
      {/* Dialog Review Event Status */}
      <Dialog
        TransitionComponent={Transition}
        open={openReviewEventDialog}
        onClose={handleToggleDialogReviewEvent}
        aria-labelledby="review-event-dialog"
        fullWidth
        className={css.dialogDeleteFac}
        aria-describedby="review-event-dialog-description">
        <DialogTitle id="review-event-dialog">
          {'Confirm completed event!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="review-event-dialog-description">
            Process the event status.
          </DialogContentText>
        </DialogContent>
        <DialogActions className={css.dialogCheckingActions}>
          <Button
            fullWidth
            disabled={isLoading ? true : false}
            onClick={() => handleUpdateEventStatus(true, 'approve')}
            variant="contained"
            color="primary">
            {isLoading ? (
              <CircularProgress size={25} color="inherit" />
            ) : (
              'Approve'
            )}
          </Button>
          <Button
            fullWidth
            disabled={isLoading ? true : false}
            onClick={() => handleUpdateEventStatus(false, 'approve')}
            variant="contained"
            color="secondary">
            {isLoading ? (
              <CircularProgress size={25} color="inherit" />
            ) : (
              'Reject'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewEventDialog;

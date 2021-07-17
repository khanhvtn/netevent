import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    CircularProgress,
    Slide
} from '@material-ui/core';
//import useStyles in the last
import useStyles from './styles';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const CreateEventTypeDialog = ({
    openDialogCreateEventType,
    handleToggleDialogCreateEventType,
    handleChange,
    eventTypeTarget,
    eventTypeIsLoading,
    handleCreateEventType,
    errors
}) => {
    const css = useStyles();
    return (
        <Dialog
            TransitionComponent={Transition}
            maxWidth="sm"
            open={openDialogCreateEventType}
            fullWidth
            className={css.dialogCreateUpdateFac}
            onClose={(e) => handleToggleDialogCreateEventType(e)}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <div align="center">Create New Event Type</div>
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    className={css.textField}
                    helperText={errors?.name ? errors?.name : ''}
                    error={errors?.name ? true : false}
                    variant="outlined"
                    onChange={handleChange}
                    id="name"
                    value={eventTypeTarget}
                    name="eventTypeTarget"
                    label="Name"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions className={css.dialogActions}>
                <Button
                    disabled={eventTypeIsLoading ? true : false}
                    onClick={handleToggleDialogCreateEventType}
                    color="default">
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleCreateEventType}
                    color="primary">
                    {eventTypeIsLoading ? (
                        <CircularProgress size={25} color="inherit" />
                    ) : (
                        'Create'
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateEventTypeDialog;

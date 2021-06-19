import React from 'react';
import {
    CircularProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    DialogContentText,
    Slide
} from '@material-ui/core';
//import useStyles in the last
import useStyles from './styles';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const EventDialog = ({
    openCreateAndUpdateDialog,
    handleToggleDialogCreateAndUpdate,
    isCreateMode,
    handleChange,
    name,
    openDeleteDialog,
    handleCreateAndUpdate,
    handleToggleDialogDelete,
    handleDelete,
    isLoading,
    errors,
    createSuccess,
    isRecoveryMode
}) => {
    const css = useStyles();
    return (
        <div>
            {/* Dialog Create and Update */}
            <Dialog
                TransitionComponent={Transition}
                maxWidth="sm"
                open={openCreateAndUpdateDialog}
                onClose={(e) => handleToggleDialogCreateAndUpdate(e)}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {isCreateMode
                        ? 'Create New Event Type'
                        : 'Update a Event Type'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        disabled={isLoading || createSuccess ? true : false}
                        className={css.textField}
                        helperText={errors?.name ? errors?.name : ''}
                        error={errors?.name ? true : false}
                        variant="outlined"
                        onChange={handleChange}
                        id="name"
                        value={name}
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions className={css.dialogActions}>
                    <Button
                        disabled={isLoading || createSuccess ? true : false}
                        variant="contained"
                        onClick={handleToggleDialogCreateAndUpdate}
                        color="default">
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading || createSuccess ? true : false}
                        variant="contained"
                        onClick={handleCreateAndUpdate}
                        color="primary">
                        {isLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : isCreateMode ? (
                            'Create'
                        ) : (
                            'Update'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog Confirm Delete */}
            <Dialog
                maxWidth="sm"
                fullWidth
                TransitionComponent={Transition}
                open={openDeleteDialog}
                onClose={handleToggleDialogDelete}
                aria-labelledby="delete-dialog"
                aria-describedby="delete-dialog-description">
                <DialogTitle id="delete-dialog">{'Warning!!!'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        {isRecoveryMode
                            ? 'This action will delete the event type permanently. Are you sure with your action ?'
                            : 'Are you sure with your action ?'}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={isLoading ? true : false}
                        variant="contained"
                        onClick={handleDelete}
                        color="secondary">
                        {isLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : (
                            'Delete'
                        )}
                    </Button>
                    <Button
                        disabled={isLoading ? true : false}
                        variant="outlined"
                        onClick={handleToggleDialogDelete}
                        color="default">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EventDialog;

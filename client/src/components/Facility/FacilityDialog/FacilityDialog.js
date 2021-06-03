import React from 'react';
import {
    CircularProgress,
    Button,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Collapse,
    DialogContentText,
    Slide,
    InputLabel,
    FormControl,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useSelector } from 'react-redux';
//import useStyles in the last
import useStyles from './styles';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const FacilityDialog = ({
    openCreateAndUpdateDialog,
    handleToggleDialogCreateAndUpdate,
    isCreateMode,
    openAlert,
    handleChange,
    name,
    code,
    type,
    openDeleteDialog,
    handleCreateAndUpdate,
    handleToggleDialogDelete,
    handleDelete,
}) => {
    const css = useStyles();
    const { isLoading, errors, createSuccess } = useSelector((state) => ({
        isLoading: state.facility.isLoading,
        errors: state.error.errors,
        createSuccess: state.facility.createSuccess,
    }));
    return (
        <div>
            {/* Dialog Create and Update */}
            <Dialog
                TransitionComponent={Transition}
                maxWidth="sm"
                open={openCreateAndUpdateDialog}
                fullWidth
                className={css.dialogCreateUpdateFac}
                onClose={(e) => handleToggleDialogCreateAndUpdate(e)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {isCreateMode ? 'Create New Facility' : 'Update a Facility'}
                </DialogTitle>
                <DialogContent>
                    <Collapse in={openAlert} className={css.textField}>
                        <Alert severity="success">
                            Create New Facility Success!
                        </Alert>
                    </Collapse>
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
                    <TextField
                        disabled={isLoading || createSuccess ? true : false}
                        className={css.textField}
                        helperText={errors?.code ? errors?.code : ''}
                        error={errors?.code ? true : false}
                        variant="outlined"
                        onChange={handleChange}
                        id="code"
                        value={code}
                        name="code"
                        label="Code"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        disabled={isLoading || createSuccess ? true : false}
                        className={css.textField}
                        helperText={errors?.type ? errors?.type : ''}
                        error={errors?.type ? true : false}
                        variant="outlined"
                        onChange={handleChange}
                        id="type"
                        value={type}
                        name="type"
                        label="Type"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions className={css.dialogActions}>
                    <Button
                        disabled={isLoading || createSuccess ? true : false}
                        onClick={handleToggleDialogCreateAndUpdate}
                        color="default"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading || createSuccess ? true : false}
                        variant="contained"
                        onClick={handleCreateAndUpdate}
                        color="primary"
                    >
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
                TransitionComponent={Transition}
                open={openDeleteDialog}
                onClose={handleToggleDialogDelete}
                aria-labelledby="delete-dialog"
                fullWidth
                className={css.dialogDeleteFac}
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog">{'Warning!!!'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure with your action ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={css.dialogActions}>
                    <Button
                        disabled={isLoading ? true : false}
                        onClick={handleToggleDialogDelete}
                        color="default"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading ? true : false}
                        variant="contained"
                        onClick={handleDelete}
                        color="secondary"
                    >
                        {isLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FacilityDialog;

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
    Slide,
} from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
//import useStyles in the last
import useStyles from './styles';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const BorrowFacilityDialog = ({
    openCreateAndUpdateDialog,
    handleToggleDialogCreateAndUpdate,
    isCreateMode,
    borrowDate,
    returnDate,
    openDeleteDialog,
    handleCreateAndUpdate,
    handleToggleDialogDelete,
    handleDelete,
    isLoading,
    errors,
    name,
    createSuccess,
    setBorrowFacilityState,
    availableFacilities,
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
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {isCreateMode
                        ? 'Create New Borrow Facility'
                        : 'Update a Borrow Facility'}
                </DialogTitle>
                <DialogContent>
                    <Autocomplete
                        value={name}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                            setBorrowFacilityState((prevState) => ({
                                ...prevState,
                                name: newValue,
                            }));
                        }}
                        id="controllable-states-demo"
                        options={availableFacilities}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Available Facility"
                                variant="outlined"
                                error={errors?.name ? true : false}
                                helperText={errors?.name ? errors.name : ''}
                            />
                        )}
                    />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDateTimePicker
                            error={errors?.borrowDate ? true : false}
                            helperText={
                                errors?.borrowDate ? errors.borrowDate : ''
                            }
                            inputVariant="outlined"
                            margin="normal"
                            fullWidth
                            id="borrowDate"
                            label="Borrow Date"
                            format="DD/MM/YYYY, h:mm a"
                            value={borrowDate}
                            onChange={(date) => {
                                setBorrowFacilityState((prevState) => ({
                                    ...prevState,
                                    borrowDate: date?.toDate()
                                        ? date?.toDate()
                                        : null,
                                }));
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDateTimePicker
                            error={errors?.returnDate ? true : false}
                            helperText={
                                errors?.returnDate ? errors.returnDate : ''
                            }
                            inputVariant="outlined"
                            margin="normal"
                            fullWidth
                            id="returnDate"
                            label="Return Date"
                            format="DD/MM/YYYY, h:mm a"
                            value={returnDate}
                            onChange={(date) => {
                                setBorrowFacilityState((prevState) => ({
                                    ...prevState,
                                    returnDate: date?.toDate()
                                        ? date?.toDate()
                                        : null,
                                }));
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions className={css.dialogActions}>
                    <Button
                        disabled={isLoading || createSuccess ? true : false}
                        variant="contained"
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
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog">{'Warning!!!'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure with your action ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
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
                    <Button
                        disabled={isLoading ? true : false}
                        variant="outlined"
                        onClick={handleToggleDialogDelete}
                        color="default"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BorrowFacilityDialog;

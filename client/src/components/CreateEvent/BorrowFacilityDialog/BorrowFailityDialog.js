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
    maxBorrowDate,
}) => {
    const css = useStyles();
    return (
        <div>
            {/* Dialog Create and Update */}
            <Dialog
                TransitionComponent={Transition}
                maxWidth="sm"
                className={css.dialogCreateUpdateFac}
                fullWidth
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
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDateTimePicker
                            disablePast
                            error={errors?.borrowDate ? true : false}
                            helperText={
                                errors?.borrowDate ? errors.borrowDate : ''
                            }
                            maxDate={
                                maxBorrowDate
                                    ? Date.parse(maxBorrowDate)
                                    : undefined
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
                                    name: '',
                                    returnDate: null,
                                }));
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDateTimePicker
                            disabled={!borrowDate}
                            disablePast
                            error={errors?.returnDate ? true : false}
                            helperText={
                                errors?.returnDate ? errors.returnDate : ''
                            }
                            minDate={
                                borrowDate ? Date.parse(borrowDate) : undefined
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
                    <Autocomplete
                        disabled={!borrowDate}
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
                                margin="normal"
                                error={errors?.name ? true : false}
                                helperText={errors?.name ? errors.name : ''}
                            />
                        )}
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
                fullWidth
                TransitionComponent={Transition}
                open={openDeleteDialog}
                onClose={handleToggleDialogDelete}
                className={css.dialogDeleteFac}
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

export default BorrowFacilityDialog;

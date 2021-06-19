import React, { useContext } from 'react';
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
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
//import useStyles in the last
import useStyles from './styles';
import { CreateEventInterface } from '../../Context';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const BorrowFacilityDialog = () => {
    const css = useStyles();
    const {
        borrowFacilityState,
        facilities,
        facilityHistories,
        handleToggleDialogCreateAndUpdateBorrowFacility,
        errors,
        state,
        setBorrowFacilityState,
        handleCreateAndUpdateBorrowFacility,
        handleToggleDialogDeleteBorrowFacility,
        handleDeleteBorrowFacility
    } = useContext(CreateEventInterface);
    /* if isBorrowFacilityCreateMode is true, 
  then render facilities that are not in borrow facility table, vice versa.*/
    const availableFacilities = !borrowFacilityState.borrowDate
        ? []
        : borrowFacilityState.isBorrowFacilityCreateMode
        ? facilities
              .filter((facility) => {
                  const targetFacilityHistory = facilityHistories
                      .filter((element) => element.facilityId === facility._id)
                      .sort(
                          (a, b) =>
                              new Date(b.returnDate) - new Date(a.returnDate)
                      );
                  return !targetFacilityHistory.length
                      ? true
                      : new Date(borrowFacilityState.borrowDate) <
                        new Date(targetFacilityHistory[0].returnDate)
                      ? false
                      : true;
              })
              .filter((facility) => {
                  const facilityNames =
                      borrowFacilityState.borrowFacilities.map(
                          (borrowFacility) => borrowFacility.name
                      );

                  return !facilityNames.includes(facility.name);
              })
        : facilities.filter((facility) => {
              const targetFacilityHistory = facilityHistories
                  .filter((element) => element.facilityId === facility._id)
                  .sort(
                      (a, b) => new Date(b.returnDate) - new Date(a.returnDate)
                  );
              return !targetFacilityHistory.length
                  ? true
                  : new Date(borrowFacilityState.borrowDate) <
                    new Date(targetFacilityHistory[0].returnDate)
                  ? false
                  : true;
          });
    return (
        <div>
            {/* Dialog Create and Update */}
            <Dialog
                TransitionComponent={Transition}
                maxWidth="sm"
                className={css.dialogCreateUpdateFac}
                fullWidth
                open={
                    borrowFacilityState.openCreateAndUpdateDialogBorrowFacility
                }
                onClose={(e) =>
                    handleToggleDialogCreateAndUpdateBorrowFacility(e)
                }
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {borrowFacilityState.isBorrowFacilityCreateMode
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
                                state.endDate
                                    ? Date.parse(state.endDate)
                                    : undefined
                            }
                            inputVariant="outlined"
                            margin="normal"
                            fullWidth
                            id="borrowDate"
                            label="Borrow Date"
                            format="DD/MM/YYYY, h:mm a"
                            value={borrowFacilityState.borrowDate}
                            onChange={(date) => {
                                setBorrowFacilityState((prevState) => ({
                                    ...prevState,
                                    borrowDate: date?.toDate()
                                        ? date?.toDate()
                                        : null,
                                    name: '',
                                    returnDate: null
                                }));
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                        />
                        <KeyboardDateTimePicker
                            disabled={!borrowFacilityState.borrowDate}
                            disablePast
                            error={errors?.returnDate ? true : false}
                            helperText={
                                errors?.returnDate ? errors.returnDate : ''
                            }
                            minDate={
                                borrowFacilityState.borrowDate
                                    ? Date.parse(borrowFacilityState.borrowDate)
                                    : undefined
                            }
                            inputVariant="outlined"
                            margin="normal"
                            fullWidth
                            id="returnDate"
                            label="Return Date"
                            format="DD/MM/YYYY, h:mm a"
                            value={borrowFacilityState.returnDate}
                            onChange={(date) => {
                                setBorrowFacilityState((prevState) => ({
                                    ...prevState,
                                    returnDate: date?.toDate()
                                        ? date?.toDate()
                                        : null
                                }));
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <Autocomplete
                        disabled={!borrowFacilityState.borrowDate}
                        value={borrowFacilityState.name}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                            setBorrowFacilityState((prevState) => ({
                                ...prevState,
                                name: newValue
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
                        disabled={
                            borrowFacilityState.borrowFacilityLoading ||
                            borrowFacilityState.borrowFacilityCreatSuccess
                                ? true
                                : false
                        }
                        onClick={
                            handleToggleDialogCreateAndUpdateBorrowFacility
                        }
                        color="default">
                        Cancel
                    </Button>
                    <Button
                        disabled={
                            borrowFacilityState.borrowFacilityLoading ||
                            borrowFacilityState.borrowFacilityCreatSuccess
                                ? true
                                : false
                        }
                        variant="contained"
                        onClick={handleCreateAndUpdateBorrowFacility}
                        color="primary">
                        {borrowFacilityState.borrowFacilityLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : borrowFacilityState.isBorrowFacilityCreateMode ? (
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
                open={borrowFacilityState.openDeleteDialogBorrowFacility}
                onClose={handleToggleDialogDeleteBorrowFacility}
                className={css.dialogDeleteFac}
                aria-labelledby="delete-dialog"
                aria-describedby="delete-dialog-description">
                <DialogTitle id="delete-dialog">{'Warning!!!'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure with your action ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={
                            borrowFacilityState.borrowFacilityLoading
                                ? true
                                : false
                        }
                        onClick={handleToggleDialogDeleteBorrowFacility}
                        color="default">
                        Cancel
                    </Button>
                    <Button
                        disabled={
                            borrowFacilityState.borrowFacilityLoading
                                ? true
                                : false
                        }
                        variant="contained"
                        onClick={handleDeleteBorrowFacility}
                        color="secondary">
                        {borrowFacilityState.borrowFacilityLoading ? (
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

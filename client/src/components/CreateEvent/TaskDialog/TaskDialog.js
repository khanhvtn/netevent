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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
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
const TaskDialog = ({
    openCreateAndUpdateDialog,
    handleToggleDialogCreateAndUpdate,
    isCreateMode,
    handleChange,
    name,
    email,
    type,
    startTime,
    endTime,
    openDeleteDialog,
    handleCreateAndUpdate,
    handleToggleDialogDelete,
    handleDelete,
    isLoading,
    errors,
    createSuccess,
    setTaskState,
    availableUsers,
    maxDate,
    minDate,
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
                    {isCreateMode ? 'Create New Task' : 'Update a Task'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Task Name"
                        type="text"
                        value={name}
                        name="name"
                        onChange={handleChange}
                        error={errors?.name ? true : false}
                        helperText={errors?.name ? errors.name : ''}
                    />
                    <Autocomplete
                        value={email}
                        getOptionLabel={(option) => option.email}
                        onChange={(event, newValue) => {
                            setTaskState((prevState) => ({
                                ...prevState,
                                email: newValue,
                            }));
                        }}
                        id="controllable-states-demo"
                        options={availableUsers}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Member"
                                margin="normal"
                                variant="outlined"
                                error={errors?.email ? true : false}
                                helperText={errors?.email ? errors.email : ''}
                            />
                        )}
                    />
                    <FormControl
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        error={errors?.type ? true : false}
                    >
                        <InputLabel id="select-label-type">Type</InputLabel>
                        <Select
                            labelId="select-label-type"
                            id="select-type"
                            name="type"
                            margin="normal"
                            value={type}
                            onChange={handleChange}
                            label="Type"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'Assignee'}>Assignee</MenuItem>
                            <MenuItem value={'Presenter'}>Presenter</MenuItem>
                        </Select>
                        <FormHelperText>
                            {errors?.type ? errors.type : ''}
                        </FormHelperText>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDateTimePicker
                            disablePast
                            error={errors?.startTime ? true : false}
                            helperText={
                                errors?.startTime ? errors.startTime : ''
                            }
                            maxDate={maxDate ? Date.parse(maxDate) : undefined}
                            minDate={minDate ? Date.parse(minDate) : undefined}
                            inputVariant="outlined"
                            margin="normal"
                            fullWidth
                            id="startTime"
                            label="Start Time"
                            format="DD/MM/YYYY, h:mm a"
                            value={startTime}
                            onChange={(date) => {
                                setTaskState((prevState) => ({
                                    ...prevState,
                                    startTime: date?.toDate()
                                        ? date?.toDate()
                                        : null,
                                }));
                            }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDateTimePicker
                            disablePast
                            disabled={!startTime}
                            error={errors?.endTime ? true : false}
                            helperText={errors?.endTime ? errors.endTime : ''}
                            inputVariant="outlined"
                            margin="normal"
                            fullWidth
                            id="endTime"
                            label="End Time"
                            maxDate={maxDate ? Date.parse(maxDate) : undefined}
                            minDate={
                                startTime ? Date.parse(startTime) : undefined
                            }
                            format="DD/MM/YYYY, h:mm a"
                            value={endTime}
                            onChange={(date) => {
                                setTaskState((prevState) => ({
                                    ...prevState,
                                    endTime: date?.toDate()
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

export default TaskDialog;

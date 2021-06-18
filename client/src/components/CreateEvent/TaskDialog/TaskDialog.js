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
  Slide,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
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
const TaskDialog = () => {
  const css = useStyles();
  const {
    taskState,
    handleToggleDialogCreateAndUpdateTask,
    handleChangeTask,
    setTaskState,
    state,
    handleCreateAndUpdateTask,
    handleToggleDialogDeleteTask,
    handleDeleteTask,
    errors,
    users,
    user
  } = useContext(CreateEventInterface);
  /* 
  if isTaskCreateMode is true, 
  then render user emails that are not in task table or a team member, vice versa.
   */
  const availableUsers = taskState.isTaskCreateMode
    ? users
        .filter((targetUser) => targetUser.role.includes('4'))
        .filter((targetUser) => {
          const listUserEmails = taskState.tasks.map((task) => task.email);
          return !listUserEmails.includes(targetUser.email);
        })
    : users.filter((targetUser) => targetUser.email !== user.email);
  return (
    <div>
      {/* Dialog Create and Update */}
      <Dialog
        TransitionComponent={Transition}
        maxWidth="sm"
        open={taskState.openCreateAndUpdateDialogTask}
        onClose={(e) => handleToggleDialogCreateAndUpdateTask(e)}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {taskState.isTaskCreateMode ? 'Create New Task' : 'Update a Task'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Task Name"
            type="text"
            value={taskState.name}
            name="name"
            onChange={handleChangeTask}
            error={errors?.name ? true : false}
            helperText={errors?.name ? errors.name : ''}
          />
          <Autocomplete
            value={taskState.email}
            getOptionLabel={(option) => option.email}
            onChange={(event, newValue) => {
              setTaskState((prevState) => ({
                ...prevState,
                email: newValue
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
            error={errors?.type ? true : false}>
            <InputLabel id="select-label-type">Type</InputLabel>
            <Select
              labelId="select-label-type"
              id="select-type"
              name="type"
              margin="normal"
              value={taskState.type}
              onChange={handleChangeTask}
              label="Type">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Assignee'}>Assignee</MenuItem>
              <MenuItem value={'Presenter'}>Presenter</MenuItem>
            </Select>
            <FormHelperText>{errors?.type ? errors.type : ''}</FormHelperText>
          </FormControl>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDateTimePicker
              disablePast
              error={errors?.startTime ? true : false}
              helperText={errors?.startTime ? errors.startTime : ''}
              maxDate={state.maxDate ? Date.parse(state.maxDate) : undefined}
              minDate={state.minDate ? Date.parse(state.minDate) : undefined}
              inputVariant="outlined"
              margin="normal"
              fullWidth
              id="startTime"
              label="Start Time"
              format="DD/MM/YYYY, h:mm a"
              value={taskState.startTime}
              onChange={(date) => {
                setTaskState((prevState) => ({
                  ...prevState,
                  startTime: date?.toDate() ? date?.toDate() : null
                }));
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
            <KeyboardDateTimePicker
              disablePast
              disabled={!taskState.startTime}
              error={errors?.endTime ? true : false}
              helperText={errors?.endTime ? errors.endTime : ''}
              inputVariant="outlined"
              margin="normal"
              fullWidth
              id="endTime"
              label="End Time"
              maxDate={state.maxDate ? Date.parse(state.maxDate) : undefined}
              minDate={
                taskState.startTime
                  ? Date.parse(taskState.startTime)
                  : undefined
              }
              format="DD/MM/YYYY, h:mm a"
              value={taskState.endTime}
              onChange={(date) => {
                setTaskState((prevState) => ({
                  ...prevState,
                  endTime: date?.toDate() ? date?.toDate() : null
                }));
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions className={css.dialogActions}>
          <Button
            disabled={
              taskState.isLoading || taskState.taskCreatSuccess ? true : false
            }
            onClick={handleToggleDialogCreateAndUpdateTask}
            color="default">
            Cancel
          </Button>
          <Button
            disabled={
              taskState.isLoading || taskState.taskCreatSuccess ? true : false
            }
            variant="contained"
            onClick={handleCreateAndUpdateTask}
            color="primary">
            {taskState.isLoading ? (
              <CircularProgress size={25} color="inherit" />
            ) : taskState.isTaskCreateMode ? (
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
        className={css.dialogDeleteTask}
        open={taskState.openDeleteDialogTask}
        onClose={handleToggleDialogDeleteTask}
        aria-labelledby="delete-dialog"
        aria-describedby="delete-dialog-task">
        <DialogTitle id="delete-dialog">{'Warning!!!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-task">
            Are you sure with your action ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={taskState.isLoading ? true : false}
            onClick={handleToggleDialogDeleteTask}
            color="default">
            Cancel
          </Button>
          <Button
            disabled={taskState.isLoading ? true : false}
            variant="contained"
            onClick={handleDeleteTask}
            color="secondary">
            {taskState.isLoading ? (
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

import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  Grid,
  Typography,
  Paper,
  Button,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';
import { AddAPhoto, DeleteForever } from '@material-ui/icons';
import blankPhoto from '../../images/blankPhoto.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllEventTypes,
  createEventType,
} from '../../actions/eventTypeActions';

import { getAllFacilities } from '../../actions/facilityActions';
import { getFacilityHistories } from '../../actions/facilityHistoryActions';
import { getAllUsers } from '../../actions/userActions';
import { createEvent } from '../../actions/eventActions';
import SystemNotification from '../Notification/Notification';
import DataTable from '../MainTable/DataTable/DataTable';
import CreateEventTypeDialog from './CreateEventTypeDialog/CreateEventTypeDialog';
import BorrowFacilityDialog from './BorrowFacilityDialog/BorrowFailityDialog';
import { ERROR, ERROR_CLEAR } from '../../constants';

import { convertBase64 } from '../../utils';
//import useStyles in the last
import useStyles from './styles';
import TaskDialog from './TaskDialog/TaskDialog';
import RichTextEditor from './RichTextEditor/RichTextEditor';
import CreateEventInputGroup from './CreateEventInputGroup/CreateEventInputGroup';

let tagList = [];
const headCellBorrowFacility = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'borrowDate',
    numeric: false,
    disablePadding: false,
    label: 'Borrow Date',
  },
  {
    id: 'returnDate',
    numeric: false,
    disablePadding: false,
    label: 'Return Date',
  },
];
const headCellsTask = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'startTime',
    numeric: false,
    disablePadding: false,
    label: 'Start Time',
  },
  {
    id: 'endTime',
    numeric: false,
    disablePadding: false,
    label: 'End Time',
  },
];
const initialState = {
  //create new event
  eventName: '',
  eventTypeId: '',
  language: '',
  mode: '',
  location: '',
  accommodation: '',
  registrationCloseDate: null,
  startDate: null,
  endDate: null,
  maxParticipants: '',
  description: '',
  budget: '',
  image: null,
  tasks: [],
  tags: [],
  borrowFacilities: [],
  // create event type
  openDialogCreateEventType: false,
  eventTypeTarget: '',
  openCreateSnackBar: false,
};
const initialBorrowFacilityState = {
  //facility taborrowFacilityState.
  borrowFacilities: [],
  borrowFacilityLoading: false,
  borrowFacilityCreatSucces: false,
  borrowFacilityUpdateSucces: false,
  borrowFacilityDeleteSucces: false,
  isBorrowFacilityCreateMode: true,
  name: '',
  borrowDate: null,
  returnDate: null,
  openCreateAndUpdateDialogBorrowFacility: false,
  openDeleteDialogBorrowFacility: false,
};

const initialTaskState = {
  tasks: [],
  isLoading: false,
  taskCreatSucces: false,
  taskDeleteSucces: false,
  taskUpdateSucces: false,
  name: '',
  email: '',
  type: '',
  startTime: null,
  endTime: null,
  openCreateAndUpdateDialogTask: false,
  openDeleteDialogTask: false,
  isTaskCreateMode: true,
};

const CreateEvent = ({ startDate, endDate, handleCloseCreateDialog }) => {
  initialState.startDate = startDate ? startDate : null;
  initialState.endDate = endDate ? endDate : null;
  const css = useStyles();
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const {
    eventTypes,
    errors,
    eventTypeIsLoading,
    createEventTypeSuccess,
    createEventSuccess,
    facilities,
    user,
    users,
    eventIsLoading,
    facilityHistories,
  } = useSelector((state) => ({
    users: state.user.users,
    user: state.user.user,
    eventTypes: state.eventType.eventTypes,
    errors: state.error.errors,
    eventTypeIsLoading: state.eventType.isLoading,
    eventIsLoading: state.event.isLoading,
    createEventTypeSuccess: state.eventType.createSuccess,
    createEventSuccess: state.event.createSuccess,
    facilities: state.facility.facilities,
    facilityHistories: state.facilityHistory.facilityHistories,
  }));
  const [state, setState] = useState(initialState);
  //borrow facility table
  const [selectedFacility, setSelectedFacility] = useState([]);
  const [borrowFacilityState, setBorrowFacilityState] = useState(
    initialBorrowFacilityState
  );

  //task table
  const [selectedTask, setSelectedTask] = useState([]);
  const [taskState, setTaskState] = useState(initialTaskState);

  // handle clear all fields
  const handleClearFields = useCallback(
    (action) => {
      setState(initialState);
      setBorrowFacilityState(initialBorrowFacilityState);
      setTaskState(initialTaskState);
      setSelectedFacility([]);
      setSelectedTask([]);
      tagList = [];
      fileInput.current.value = '';
      //clear all error
      if (action) {
        dispatch({
          type: ERROR_CLEAR,
          payload: null,
        });
      }
    },
    [dispatch]
  );

  //useEffect for create event success
  useEffect(() => {
    if (createEventSuccess) {
      handleClearFields();
      dispatch(getAllEventTypes());
      dispatch(getAllFacilities());
      dispatch(getAllUsers());
      dispatch(getFacilityHistories({ returnFrom: new Date(Date.now()) }));
    }
    setState((prevState) => ({
      ...prevState,
      openCreateSnackBar: createEventSuccess,
    }));
  }, [dispatch, createEventSuccess, handleClearFields]);

  //useEffect get status create event type
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      openCreateSnackBar: createEventTypeSuccess,
      openDialogCreateEventType: false,
    }));
    if (createEventTypeSuccess) {
      dispatch(getAllEventTypes());
    }
  }, [dispatch, createEventTypeSuccess]);

  //useEffect to get all needed data for crete event
  useEffect(() => {
    dispatch(getAllEventTypes());
    dispatch(getAllFacilities());
    dispatch(getAllUsers());
    dispatch(getFacilityHistories({ returnFrom: new Date(Date.now()) }));
  }, [dispatch]);
  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCreateEventType = () => {
    dispatch(createEventType({ name: state.eventTypeTarget }));
  };
  const handleToggleDialogCreateEventType = () => {
    setState((prevState) => ({
      ...prevState,
      openDialogCreateEventType: !prevState.openDialogCreateEventType,
    }));
  };
  const handleCreateEvent = () => {
    const {
      eventName,
      language,
      mode,
      location,
      accommodation,
      registrationCloseDate,
      startDate,
      endDate,
      maxParticipants,
      description,
      budget,
      image,
      eventTypeTarget,
    } = state;
    //generate valid data to send request to the server
    const templateRequest = {
      eventName,
      language,
      eventTypeId: eventTypeTarget
        ? eventTypes.find((eventType) => eventType.name === eventTypeTarget)._id
        : null,
      mode,
      location,
      accommodation,
      registrationCloseDate,
      startDate,
      endDate,
      maxParticipants,
      tags: tagList,
      description: description
        ? JSON.parse(description).blocks[0].text
          ? JSON.parse(description).blocks[0].text
          : ''
        : '',
      ownerId: user.id,
      budget,
      image,
      tasks: taskState.tasks.map((task) => {
        const {
          name,
          email,
          type,
          startTime: startDate,
          endTime: endDate,
        } = task;

        const { _id: userId } = users.find((user) => user.email === email);
        return {
          name,
          userId,
          type,
          startDate,
          endDate,
        };
      }),
      borrowFacilities: borrowFacilityState.borrowFacilities.map(
        (borrowFacility) => {
          const { borrowDate, returnDate, name } = borrowFacility;
          const targetFacility = facilities.find(
            (facility) => facility.name === name
          );
          return {
            facilityId: targetFacility._id,
            borrowDate,
            returnDate,
          };
        }
      ),
    };
    dispatch(createEvent(templateRequest));
  };

  //handle update taglist
  const handleUpdateTaglist = (newTagList) => {
    tagList = newTagList;
  };

  /* Borrow Facility */

  const handleChangeBorrowFacility = (e) => {
    setBorrowFacilityState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleToggleDialogCreateAndUpdateBorrowFacility = (event, mode) => {
    let targetEdit;
    if (mode) {
      targetEdit = borrowFacilityState.borrowFacilities.find(
        (facility) => facility.name === selectedFacility[0]
      );
    }
    setBorrowFacilityState((prevState) => ({
      ...prevState,
      name: mode ? targetEdit : '',
      borrowDate: mode ? targetEdit.borrowDate : null,
      returnDate: mode ? targetEdit.returnDate : null,
      openCreateAndUpdateDialogBorrowFacility:
        !prevState.openCreateAndUpdateDialogBorrowFacility,
      isBorrowFacilityCreateMode: mode ? false : true,
    }));
    //clear Error
    dispatch({
      type: ERROR_CLEAR,
      payload: null,
    });
  };

  const handleToggleDialogDeleteBorrowFacility = () => {
    setBorrowFacilityState((prevState) => ({
      ...prevState,
      openDeleteDialogBorrowFacility: !prevState.openDeleteDialogBorrowFacility,
    }));
  };

  const handleCreateAndUpdateBorrowFacility = () => {
    const { name, borrowDate, returnDate } = borrowFacilityState;
    let listErrors = {};
    if (!name) {
      listErrors = {
        ...listErrors,
        name: 'Borrow Facility cannot be blanked.',
      };
    }
    if (!borrowDate) {
      listErrors = {
        ...listErrors,
        borrowDate: 'Borrow Facility cannot be blanked.',
      };
    }
    if (!returnDate) {
      listErrors = {
        ...listErrors,
        returnDate: 'Borrow Facility cannot be blanked.',
      };
    }
    if (Object.keys(listErrors).length !== 0) {
      return dispatch({
        type: ERROR,
        payload: listErrors,
      });
    }

    //generate new update when in edit mode
    let update;
    if (!borrowFacilityState.isBorrowFacilityCreateMode) {
      update = borrowFacilityState.borrowFacilities.filter(
        (borrowFacility) => borrowFacility.name !== selectedFacility[0]
      );
    }

    //create
    setBorrowFacilityState((prevState) => {
      update = update ? update : prevState.borrowFacilities;
      return {
        ...prevState,
        borrowFacilities: [
          ...update,
          {
            name: prevState.name.name,
            borrowDate: prevState.borrowDate,
            returnDate: prevState.returnDate,
          },
        ],
        name: '',
        borrowDate: null,
        returnDate: null,
        openCreateAndUpdateDialogBorrowFacility: false,
      };
    });

    //clear error
    dispatch({
      type: ERROR_CLEAR,
      payload: null,
    });
    setSelectedFacility([]);
  };

  const handleDeleteBorrowFacility = () => {
    setBorrowFacilityState((prevState) => {
      return {
        ...prevState,
        borrowFacilities: prevState.borrowFacilities.filter(
          (borrowFacility) => !selectedFacility.includes(borrowFacility.name)
        ),
        name: '',
        borrowDate: null,
        returnDate: null,
        openDeleteDialogBorrowFacility: false,
      };
    });
    setSelectedFacility([]);
  };

  /* Borrow Facility */

  /* Task Table */
  const handleChangeTask = (e) => {
    setTaskState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleToggleDialogCreateAndUpdateTask = (event, mode) => {
    let targetEdit;
    if (mode) {
      targetEdit = taskState.tasks.find(
        (task) => task.name === selectedTask[0]
      );
    }
    setTaskState((prevState) => ({
      ...prevState,
      name: mode ? targetEdit.name : '',
      email: mode ? targetEdit : '',
      type: mode ? targetEdit.type : '',
      startTime: mode ? targetEdit.startTime : null,
      endTime: mode ? targetEdit.endTime : null,
      openCreateAndUpdateDialogTask: !prevState.openCreateAndUpdateDialogTask,
      isTaskCreateMode: mode ? false : true,
    }));
    //clear Error
    dispatch({
      type: ERROR_CLEAR,
      payload: null,
    });
  };

  const handleToggleDialogDeleteTask = () => {
    setTaskState((prevState) => ({
      ...prevState,
      openDeleteDialogTask: !prevState.openDeleteDialogTask,
    }));
  };

  const handleCreateAndUpdateTask = () => {
    const { name, email, type, startTime, endTime } = taskState;
    let listErrors = {};
    if (!name) {
      listErrors = {
        ...listErrors,
        name: 'Name cannot be blanked.',
      };
    }
    if (!email) {
      listErrors = {
        ...listErrors,
        email: 'Email cannot be blanked.',
      };
    }
    if (!type) {
      listErrors = {
        ...listErrors,
        type: 'Type cannot be blanked.',
      };
    }
    if (!startTime) {
      listErrors = {
        ...listErrors,
        startTime: 'Start Time cannot be blanked.',
      };
    }
    if (!endTime) {
      listErrors = {
        ...listErrors,
        endTime: 'End Time cannot be blanked.',
      };
    }
    if (Object.keys(listErrors).length !== 0) {
      return dispatch({
        type: ERROR,
        payload: listErrors,
      });
    }

    //generate new update when in edit mode
    let update;
    if (!taskState.isTaskCreateMode) {
      update = taskState.tasks.filter((task) => task.name !== selectedTask[0]);
    }

    //create
    setTaskState((prevState) => {
      update = update ? update : prevState.tasks;
      return {
        ...prevState,
        tasks: [
          ...update,
          {
            name: prevState.name,
            email: prevState.email.email,
            type: prevState.type,
            startTime: prevState.startTime,
            endTime: prevState.endTime,
          },
        ],
        name: '',
        email: '',
        type: '',
        startTime: null,
        endTime: null,
        openCreateAndUpdateDialogTask: false,
      };
    });

    //clear error
    dispatch({
      type: ERROR_CLEAR,
      payload: null,
    });
    setSelectedTask([]);
  };

  const handleDeleteTask = () => {
    setTaskState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => !selectedTask.includes(task.name)
        ),
        name: '',
        email: '',
        type: '',
        startTime: null,
        endTime: null,
        openDeleteDialogTask: false,
      };
    });
    setSelectedTask([]);
  };
  /* Task Table */

  //handle change photo
  const handleChangePhoto = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileBase64 = await convertBase64(file);
      setState({ ...state, image: fileBase64 });
    }
  };

  return (
    <div>
      <Paper className={css.paper} elevation={3}>
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item>
            <Typography style={{ fontWeight: 'bold' }} variant="h3">
              Event Form
            </Typography>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            item
            md={12}
            lg={12}
            xl={12}
            sm={12}
            xs={12}
            style={{ margin: '20px 0' }}
          >
            <div
              style={{
                width: '100%',
                height: '500px',
                backgroundImage: `url(${
                  !state.image ? blankPhoto : state.image
                })`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
              }}
            ></div>
            <FormControl error={errors?.image ? true : false}>
              <FormHelperText>
                {errors?.image ? errors?.image : ''}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            item
            md={12}
            lg={12}
            xl={12}
            sm={12}
            xs={12}
          >
            <input
              ref={fileInput}
              accept="image/*"
              className={css.inputImage}
              id="change-image"
              type="file"
              onChange={handleChangePhoto}
            />
            {state.image && (
              <Button
                disabled={eventIsLoading}
                className={css.btnRemovePhoto}
                onClick={() => {
                  setState({
                    ...state,
                    image: null,
                  });
                  fileInput.current.value = '';
                }}
                color="secondary"
                startIcon={<DeleteForever />}
                variant="contained"
                style={{ textTransform: 'none' }}
              >
                Remove
              </Button>
            )}
            <label className={css.btnChangePhoto} htmlFor="change-image">
              {state.image ? (
                <Button
                  disabled={eventIsLoading}
                  startIcon={<AddAPhoto />}
                  variant="contained"
                  style={{ textTransform: 'none' }}
                  color="primary"
                  component="span"
                >
                  Change Image
                </Button>
              ) : (
                <Button
                  disabled={eventIsLoading}
                  startIcon={<AddAPhoto />}
                  style={{
                    backgroundColor: 'transparent',
                    textTransform: 'none',
                  }}
                  component="span"
                >
                  Choose Image
                </Button>
              )}
            </label>
          </Grid>

          <Grid
            container
            item
            md={12}
            lg={12}
            xl={12}
            sm={12}
            xs={12}
            spacing={3}
            style={{ margin: '20px 0' }}
          >
            {/* Create Event Input Group */}
            <CreateEventInputGroup
              eventIsLoading={eventIsLoading}
              errors={errors}
              handleChange={handleChange}
              state={state}
              setState={setState}
              eventTypes={eventTypes}
              createEventSuccess={createEventSuccess}
              updateTagList={handleUpdateTaglist}
            />

            {/* Tasks Table */}
            <Grid
              style={{ marginTop: 24 }}
              item
              md={12}
              lg={12}
              xl={12}
              sm={12}
              xs={12}
            >
              <Paper className={css.paper1} elevation={3}>
                <DataTable
                  constrainRangeDate={!!state.startDate && !!state.endDate}
                  disabled={eventIsLoading}
                  handleToggleDialogCreateAndUpdate={
                    handleToggleDialogCreateAndUpdateTask
                  }
                  handleToggleDialogDelete={handleToggleDialogDeleteTask}
                  take={1}
                  selected={selectedTask}
                  setSelected={setSelectedTask}
                  data={taskState.tasks}
                  isLoading={taskState.isLoading}
                  createSuccess={taskState.taskCreatSucces}
                  deleteSuccess={taskState.taskDeleteSucces}
                  updateSuccess={taskState.taskUpdateSucces}
                  tableName="Task Assign"
                  headCells={headCellsTask}
                />
              </Paper>
              <FormControl error={errors?.taskListId ? true : false}>
                <FormHelperText>
                  {errors?.taskListId ? errors?.taskListId : ''}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Pick Facility Table */}
            <Grid
              style={{ marginTop: 24 }}
              item
              md={12}
              lg={12}
              xl={12}
              sm={12}
              xs={12}
            >
              <Paper className={css.paper1} elevation={3}>
                <DataTable
                  disabled={eventIsLoading}
                  constrainRangeDate={!!state.endDate}
                  handleToggleDialogCreateAndUpdate={
                    handleToggleDialogCreateAndUpdateBorrowFacility
                  }
                  handleToggleDialogDelete={
                    handleToggleDialogDeleteBorrowFacility
                  }
                  take={1}
                  selected={selectedFacility}
                  setSelected={setSelectedFacility}
                  data={borrowFacilityState.borrowFacilities}
                  isLoading={borrowFacilityState.borrowFacilityLoading}
                  createSuccess={borrowFacilityState.borrowFacilityCreatSucces}
                  deleteSuccess={borrowFacilityState.borrowFacilityDeleteSucces}
                  updateSuccess={borrowFacilityState.borrowFacilityUpdateSucces}
                  tableName="Borrow Facility"
                  headCells={headCellBorrowFacility}
                />
              </Paper>
              <FormControl error={errors?.facilityHistoryListId ? true : false}>
                <FormHelperText>
                  {errors?.facilityHistoryListId
                    ? errors?.facilityHistoryListId
                    : ''}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid
              style={{ marginTop: 24 }}
              item
              md={12}
              lg={12}
              xl={12}
              sm={12}
              xs={12}
            >
              <Typography style={{ fontWeight: 'bold' }} variant="h6">
                Event Description
              </Typography>
            </Grid>

            {/* Description */}
            <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
              <RichTextEditor
                key={createEventSuccess}
                disabled={eventIsLoading}
                setState={setState}
              />
              <FormControl error={errors?.description ? true : false}>
                <FormHelperText>
                  {errors?.description ? errors?.description : ''}
                </FormHelperText>
              </FormControl>
            </Grid>
            {/* Button Control */}
            <Grid container justify="space-between" alignItems="center" item>
              <Grid item>
                <Button
                  className={css.clearAllButton}
                  disabled={eventIsLoading}
                  size="large"
                  color="default"
                  style={{ backgroundColor: 'transparent' }}
                  onClick={() => handleClearFields(true)}
                >
                  Clear all
                </Button>
              </Grid>
              <Grid item>
                {handleCloseCreateDialog && (
                  <Button
                    disabled={eventIsLoading}
                    size="large"
                    onClick={handleCloseCreateDialog}
                    variant="contained"
                    color="default"
                  >
                    Close
                  </Button>
                )}
                <Button
                  disabled={eventIsLoading}
                  style={{
                    marginLeft: '20px',
                    textTransform: 'none',
                    width: '140px',
                  }}
                  size="large"
                  onClick={handleCreateEvent}
                  variant="contained"
                  color="primary"
                >
                  {eventIsLoading ? (
                    <CircularProgress size={26} color="inherit" />
                  ) : (
                    'Create Event'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {/* Create Event Type Dialog */}
      <CreateEventTypeDialog
        openDialogCreateEventType={state.openDialogCreateEventType}
        handleToggleDialogCreateEventType={handleToggleDialogCreateEventType}
        handleChange={handleChange}
        eventTypeTarget={state.eventTypeTarget}
        eventTypeIsLoading={eventTypeIsLoading}
        handleCreateEventType={handleCreateEventType}
        errors={errors}
      />
      {/* Borrow Facility Dialog */}
      <BorrowFacilityDialog
        maxBorrowDate={state.endDate}
        openCreateAndUpdateDialog={
          borrowFacilityState.openCreateAndUpdateDialogBorrowFacility
        }
        handleToggleDialogCreateAndUpdate={
          handleToggleDialogCreateAndUpdateBorrowFacility
        }
        isCreateMode={borrowFacilityState.isBorrowFacilityCreateMode}
        handleChange={handleChangeBorrowFacility}
        setBorrowFacilityState={setBorrowFacilityState}
        name={borrowFacilityState.name}
        borrowDate={borrowFacilityState.borrowDate}
        returnDate={borrowFacilityState.returnDate}
        openDeleteDialog={borrowFacilityState.openDeleteDialogBorrowFacility}
        handleCreateAndUpdate={handleCreateAndUpdateBorrowFacility}
        handleToggleDialogDelete={handleToggleDialogDeleteBorrowFacility}
        handleDelete={handleDeleteBorrowFacility}
        isLoading={borrowFacilityState.borrowFacilityLoading}
        errors={errors}
        createSuccess={borrowFacilityState.borrowFacilityCreatSucces}
        availableFacilities={
          /* 
                    if isBorrowFacilityCreateMode is true, 
                    then render facilities that are not in borrow facility table, vice versa.
                     */
          !borrowFacilityState.borrowDate
            ? []
            : borrowFacilityState.isBorrowFacilityCreateMode
            ? facilities
                .filter((facility) => {
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
              })
        }
      />
      {/* Borrow Facility Dialog */}

      <TaskDialog
        openCreateAndUpdateDialog={taskState.openCreateAndUpdateDialogTask}
        handleToggleDialogCreateAndUpdate={
          handleToggleDialogCreateAndUpdateTask
        }
        isCreateMode={taskState.isTaskCreateMode}
        handleChange={handleChangeTask}
        setTaskState={setTaskState}
        name={taskState.name}
        email={taskState.email}
        type={taskState.type}
        maxDate={state.endDate}
        minDate={state.startDate}
        startTime={taskState.startTime}
        endTime={taskState.endTime}
        openDeleteDialog={taskState.openDeleteDialogTask}
        handleCreateAndUpdate={handleCreateAndUpdateTask}
        handleToggleDialogDelete={handleToggleDialogDeleteTask}
        handleDelete={handleDeleteTask}
        isLoading={taskState.isLoading}
        errors={errors}
        createSuccess={taskState.taskCreatSucces}
        availableUsers={
          /* 
                    if isTaskCreateMode is true, 
                    then render user emails that are not in task table or a team member, vice versa.
                     */
          taskState.isTaskCreateMode
            ? users
                .filter((targetUser) => targetUser.role.includes('4'))
                .filter((targetUser) => {
                  const listUserEmails = taskState.tasks.map(
                    (task) => task.email
                  );

                  return !listUserEmails.includes(targetUser.email);
                })
            : users.filter((targetUser) => targetUser.email !== user.email)
        }
      />
      {/* Notification */}
      <SystemNotification openCreateSnackBar={state.openCreateSnackBar} />
    </div>
  );
};

export default CreateEvent;

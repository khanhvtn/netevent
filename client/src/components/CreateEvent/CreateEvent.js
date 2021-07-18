import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
    Grid,
    Typography,
    Paper,
    Button,
    FormControl,
    FormHelperText,
    CircularProgress
} from '@material-ui/core';
import { AddAPhoto, DeleteForever } from '@material-ui/icons';
import blankPhoto from '../../images/blankPhoto.png';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllEventTypes,
    createEventType
} from '../../actions/eventTypeActions';

import { getAllFacilities } from '../../actions/facilityActions';
import { getAllUsers } from '../../actions/userActions';
import { createEvent, updateEvent } from '../../actions/eventActions';
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
import { CreateEventInterface } from '../Context';
import moment from 'moment';
import CustomizeFieldDialog from './CustomizeFieldDialog/CustomizeFieldDialog';

let listTag = [];
let optionValues = [];
const initialDescription =
    '{"blocks":[{"key":"4jrep","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';

const headCellBorrowFacility = [
    {
        id: 'name',
        type: 'string',
        disablePadding: false,
        label: 'Name'
    },
    {
        id: 'borrowDate',
        type: 'date',
        disablePadding: false,
        label: 'Borrow Date'
    },
    {
        id: 'returnDate',
        type: 'date',
        disablePadding: false,
        label: 'Return Date'
    }
];
const headCellsTask = [
    {
        id: 'name',
        type: 'string',
        disablePadding: false,
        label: 'Name'
    },
    {
        id: 'email',
        type: 'string',
        disablePadding: false,
        label: 'Email'
    },
    {
        id: 'type',
        type: 'string',
        disablePadding: false,
        label: 'Type'
    },
    {
        id: 'startTime',
        type: 'date',
        disablePadding: false,
        label: 'Start Time'
    },
    {
        id: 'endTime',
        type: 'date',
        disablePadding: false,
        label: 'End Time'
    }
];

const headCellsCustomizeField = [
    {
        id: 'title',
        type: 'string',
        disablePadding: false,
        label: 'Title'
    },
    {
        id: 'type',
        type: 'string',
        disablePadding: false,
        label: 'Type'
    },
    {
        id: 'optionValues',
        type: 'array',
        disablePadding: false,
        label: 'Option Values'
    },
    {
        id: 'isRequired',
        type: 'boolean',
        disablePadding: false,
        label: 'Required'
    }
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
    isResetListTag: false,
    isResetOptionValues: false,
    // create event type
    openDialogCreateEventType: false,
    eventTypeTarget: '',
    openCreateSnackBar: false
};
const initialBorrowFacilityState = {
    //borrowFacilityState.
    borrowFacilities: [],
    borrowFacilityLoading: false,
    borrowFacilityCreatSuccess: false,
    borrowFacilityUpdateSuccess: false,
    borrowFacilityDeleteSuccess: false,
    isBorrowFacilityCreateMode: true,
    name: '',
    borrowDate: null,
    returnDate: null,
    openCreateAndUpdateDialogBorrowFacility: false,
    openDeleteDialogBorrowFacility: false
};

const initialTaskState = {
    tasks: [],
    isLoading: false,
    taskCreatSuccess: false,
    taskDeleteSuccess: false,
    taskUpdateSuccess: false,
    name: '',
    email: '',
    type: '',
    startTime: null,
    endTime: null,
    openCreateAndUpdateDialogTask: false,
    openDeleteDialogTask: false,
    isTaskCreateMode: true
};

const initialCustomizeFieldState = {
    customizeFields: [],
    isLoading: false,
    customizeFieldCreatSuccess: false,
    customizeFieldDeleteSuccess: false,
    customizeFieldUpdateSuccess: false,
    title: '',
    type: '',
    optionValues: [],
    isRequired: false,
    openCreateAndUpdateDialogCustomizeField: false,
    openDeleteDialogCustomizeField: false,
    isCustomizeFieldCreateMode: true
};

//Create Event Provider
const CreateEventProvider = ({ children, ...rest }) => {
    return (
        <CreateEventInterface.Provider value={{ ...rest }}>
            {children}
        </CreateEventInterface.Provider>
    );
};

const CreateEvent = ({
    isUpdateMode,
    updateEventDetail,
    updateFacilities,
    updateTasks,
    startDate,
    endDate,
    handleCloseCreateDialog,
    handleCloseUpdateDialog
}) => {
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
        updateEventSuccess,
        facilities,
        user,
        users,
        eventIsLoading,
        facilityHistories
    } = useSelector((state) => ({
        users: state.user.users,
        user: state.user.user,
        eventTypes: state.eventType.eventTypes,
        errors: state.error.errors,
        eventTypeIsLoading: state.eventType.isLoading,
        eventIsLoading: state.event.isLoading,
        createEventTypeSuccess: state.eventType.createSuccess,
        createEventSuccess: state.event.createSuccess,
        updateEventSuccess: state.event.updateSuccess,
        facilities: state.facility.facilities,
        facilityHistories: state.facilityHistory.facilityHistories
    }));

    const [state, setState] = useState(initialState);
    //borrow facility table
    const [selectedFacility, setSelectedFacility] = useState([]);
    const [borrowFacilityState, setBorrowFacilityState] = useState(
        initialBorrowFacilityState
    );

    const [defaultValueTags, setDefaultValueTags] = useState([]);
    const [defaultDescription, setDefaultDescription] =
        useState(initialDescription);

    //task table
    const [selectedTask, setSelectedTask] = useState([]);
    const [taskState, setTaskState] = useState(initialTaskState);
    //task table
    const [selectedCustomizeField, setSelectedCustomizeField] = useState([]);
    const [customizeFieldState, setCustomizeFieldState] = useState(
        initialCustomizeFieldState
    );

    // handle clear all fields
    const handleClearFields = useCallback(
        (action) => {
            setState((prevState) => {
                return {
                    ...prevState,
                    ...initialState,
                    isResetListTag: !prevState.isResetListTag
                };
            });
            setBorrowFacilityState(initialBorrowFacilityState);
            setTaskState(initialTaskState);
            setCustomizeFieldState(initialCustomizeFieldState);
            setSelectedFacility([]);
            setSelectedTask([]);
            setSelectedCustomizeField([]);
            setDefaultValueTags([]);
            setDefaultDescription(initialDescription);
            handleUpdateListTag([]);
            fileInput.current.value = '';
            //clear all error
            if (action) {
                dispatch({
                    type: ERROR_CLEAR,
                    payload: null
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
        }
        setState((prevState) => ({
            ...prevState,
            openCreateSnackBar: createEventSuccess,
            isResetListTag: !prevState.isResetListTag
        }));
    }, [dispatch, createEventSuccess, handleClearFields]);

    //useEffect for update event success
    useEffect(() => {
        if (updateEventSuccess) {
            handleClearFields();
            handleCloseUpdateDialog();
        }
    }, [updateEventSuccess, handleClearFields, handleCloseUpdateDialog]);

    //useEffect get status create event type
    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            openCreateSnackBar: createEventTypeSuccess,
            openDialogCreateEventType: false
        }));
        if (createEventTypeSuccess) {
            dispatch(getAllEventTypes());
        }
    }, [dispatch, createEventTypeSuccess]);

    //useEffect to get all needed data for create event
    useEffect(() => {
        dispatch(getAllEventTypes());
        dispatch(getAllFacilities());
        dispatch(getAllUsers());
    }, [dispatch]);

    //useEffect to check update mode and set current state of update
    useEffect(() => {
        if (isUpdateMode) {
            //reset listTag and update new listTag
            listTag = [];
            listTag = updateEventDetail?.tags
                ? [...listTag, ...updateEventDetail?.tags]
                : [...listTag];
            setDefaultValueTags(() => listTag);
            setDefaultDescription(updateEventDetail?.description);

            // setup initial state
            setState((prevState) => ({
                ...prevState,
                ...updateEventDetail,
                startDate: moment(
                    Date.parse(updateEventDetail.startDate)
                ).toDate(),
                endDate: moment(Date.parse(updateEventDetail.endDate)).toDate(),
                registrationCloseDate: moment(
                    Date.parse(updateEventDetail.registrationCloseDate)
                ).toDate(),
                eventTypeTarget: updateEventDetail.eventTypeId.name,
                description: updateEventDetail?.description
            }));

            // set initial customize fields for updating
            setCustomizeFieldState((prevState) => ({
                ...prevState,
                customizeFields: updateEventDetail.customizeFields
            }));

            // setup initial facilities
            setBorrowFacilityState((prevState) => ({
                ...prevState,
                borrowFacilities: updateFacilities.map((facility) => ({
                    _id: facility._id,
                    name: facility.facilityId?.name,
                    borrowDate: facility.borrowDate,
                    returnDate: facility.returnDate
                }))
            }));

            // setup initial tasks
            setTaskState((prevState) => ({
                ...prevState,
                tasks: updateTasks.map((task) => ({
                    _id: task._id,
                    name: task.name,
                    email: task.userId?.email,
                    type: task.type,
                    startTime: task.startDate,
                    endTime: task.endDate
                }))
            }));
        }
    }, [isUpdateMode, updateEventDetail, updateFacilities, updateTasks]);

    const handleChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleCreateEventType = () => {
        dispatch(createEventType({ name: state.eventTypeTarget }));
    };

    const handleToggleDialogCreateEventType = () => {
        setState((prevState) => ({
            ...prevState,
            openDialogCreateEventType: !prevState.openDialogCreateEventType
        }));
    };

    const handleCreateAndUpdateEvent = () => {
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
            eventTypeTarget
        } = state;

        //generate valid data to send request to the server
        const templateRequest = {
            eventName,
            language,
            eventTypeId: eventTypeTarget
                ? eventTypes.find(
                      (eventType) => eventType.name === eventTypeTarget
                  )._id
                : null,
            mode,
            location,
            accommodation,
            registrationCloseDate,
            startDate,
            endDate,
            maxParticipants,
            tags: listTag,
            description: description
                ? JSON.parse(description).blocks[0].text
                    ? description
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
                    endTime: endDate
                } = task;

                const targetUser = users.find((user) => user.email === email);
                return {
                    name,
                    userId: targetUser ? targetUser._id : null,
                    type,
                    startDate,
                    endDate
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
                        facilityName: name,
                        borrowDate,
                        returnDate
                    };
                }
            ),
            customizeFields: customizeFieldState.customizeFields
        };
        if (!isUpdateMode) {
            dispatch(createEvent(templateRequest));
        } else {
            const updateTemplate = {
                ...templateRequest,
                _id: updateEventDetail._id,
                borrowFacilities: [
                    ...borrowFacilityState.borrowFacilities
                        .filter((borrowFacility) => !borrowFacility._id)
                        .map((borrowFacility) => {
                            const { borrowDate, returnDate, name } =
                                borrowFacility;
                            const targetFacility = facilities.find(
                                (facility) => facility.name === name
                            );
                            return {
                                facilityId: targetFacility._id,
                                facilityName: name,
                                borrowDate,
                                returnDate
                            };
                        }),
                    ...borrowFacilityState.borrowFacilities.filter(
                        (borrowFacility) => borrowFacility._id
                    )
                ],
                tasks: [
                    ...taskState.tasks
                        .filter((task) => !task._id)
                        .map((task) => {
                            const {
                                name,
                                email,
                                type,
                                startTime: startDate,
                                endTime: endDate
                            } = task;
                            const targetUser = users.find(
                                (user) => user.email === email
                            );
                            return {
                                name,
                                userId: targetUser ? targetUser._id : null,
                                type,
                                startDate,
                                endDate
                            };
                        }),
                    ...taskState.tasks.filter((task) => task._id)
                ]
            };
            dispatch(updateEvent(updateTemplate));
        }
    };

    //handle update listTag
    const handleUpdateListTag = (newTagList) => {
        listTag = newTagList;
    };

    //handle update listTag
    const handleUpdateOptionValues = (newOptionValues) => {
        optionValues = newOptionValues;
    };

    /* Borrow Facility */
    const handleChangeBorrowFacility = (e) => {
        setBorrowFacilityState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
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
            isBorrowFacilityCreateMode: mode ? false : true
        }));
        //clear Error
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });
    };

    const handleToggleDialogDeleteBorrowFacility = () => {
        setBorrowFacilityState((prevState) => ({
            ...prevState,
            openDeleteDialogBorrowFacility:
                !prevState.openDeleteDialogBorrowFacility
        }));
    };

    const handleCreateAndUpdateBorrowFacility = () => {
        const { name, borrowDate, returnDate } = borrowFacilityState;
        let listErrors = {};
        if (!name) {
            listErrors = {
                ...listErrors,
                name: 'Borrow Facility cannot be blanked.'
            };
        }
        if (!borrowDate) {
            listErrors = {
                ...listErrors,
                borrowDate: 'Borrow Facility cannot be blanked.'
            };
        }
        if (!returnDate) {
            listErrors = {
                ...listErrors,
                returnDate: 'Borrow Facility cannot be blanked.'
            };
        }
        //end time can not smaller than start time
        if (moment(Date.parse(returnDate)).isBefore(Date.parse(borrowDate))) {
            listErrors = {
                ...listErrors,
                returnDate: 'Return Date cannot be smaller than Borrow Date.'
            };
        }
        if (Object.keys(listErrors).length !== 0) {
            return dispatch({
                type: ERROR,
                payload: listErrors
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
                        returnDate: prevState.returnDate
                    }
                ],
                name: '',
                borrowDate: null,
                returnDate: null,
                openCreateAndUpdateDialogBorrowFacility: false
            };
        });

        //clear error
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });
        setSelectedFacility([]);
    };

    const handleDeleteBorrowFacility = () => {
        setBorrowFacilityState((prevState) => {
            return {
                ...prevState,
                borrowFacilities: prevState.borrowFacilities.filter(
                    (borrowFacility) =>
                        !selectedFacility.includes(borrowFacility.name)
                ),
                name: '',
                borrowDate: null,
                returnDate: null,
                openDeleteDialogBorrowFacility: false
            };
        });
        setSelectedFacility([]);
    };

    /* Borrow Facility */

    /* Customize Fields for Registration Form */
    const handleChangeCustomizeField = (e) => {
        setCustomizeFieldState((prevState) => ({
            ...prevState,
            [e.target.name]:
                e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }));
    };

    const handleToggleDialogCreateAndUpdateCustomizeField = (event, mode) => {
        let targetEdit;
        if (mode) {
            targetEdit = customizeFieldState.customizeFields.find(
                (target) => target.title === selectedCustomizeField[0]
            );
        }
        setCustomizeFieldState((prevState) => ({
            ...prevState,
            title: mode ? targetEdit.title : '',
            type: mode ? targetEdit.type : '',
            isRequired: mode ? targetEdit.isRequired : false,
            optionValues: mode ? targetEdit.optionValues : [],
            openCreateAndUpdateDialogCustomizeField:
                !prevState.openCreateAndUpdateDialogCustomizeField,
            isCustomizeFieldCreateMode: mode ? false : true
        }));
        //clear Error
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });
    };

    const handleToggleDialogDeleteCustomizeField = () => {
        setCustomizeFieldState((prevState) => ({
            ...prevState,
            openDeleteDialogCustomizeField:
                !prevState.openDeleteDialogCustomizeField
        }));
    };

    const handleCreateAndUpdateCustomizeField = () => {
        const { title, type, isCustomizeFieldCreateMode } = customizeFieldState;
        let listErrors = {};
        if (!title) {
            listErrors = {
                ...listErrors,
                title: 'Title cannot be blanked.'
            };
        }
        if (
            customizeFieldState.customizeFields.some(
                (target) => target.title === title
            ) &&
            isCustomizeFieldCreateMode === true
        ) {
            listErrors = {
                ...listErrors,
                title: 'Title already existed.'
            };
        }
        if (!type) {
            listErrors = {
                ...listErrors,
                type: 'Type cannot be blanked.'
            };
        }
        if (Object.keys(listErrors).length !== 0) {
            return dispatch({
                type: ERROR,
                payload: listErrors
            });
        }

        //generate new update when in edit mode
        let update;
        if (!customizeFieldState.isCustomizeFieldCreateMode) {
            update = customizeFieldState.customizeFields.filter(
                (target) => target.title !== selectedCustomizeField[0]
            );
        }

        //create
        setCustomizeFieldState((prevState) => {
            update = update ? update : prevState.customizeFields;
            return {
                ...prevState,
                customizeFields: [
                    ...update,
                    {
                        title: prevState.title,
                        type: prevState.type,
                        isRequired: prevState.isRequired,
                        optionValues
                    }
                ],
                title: '',
                type: '',
                isRequired: false,
                optionValues: [],
                openCreateAndUpdateDialogCustomizeField: false
            };
        });

        //clear error
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });
        setSelectedCustomizeField([]);
        optionValues = [];
    };

    const handleDeleteCustomizeField = () => {
        setCustomizeFieldState((prevState) => {
            return {
                ...prevState,
                customizeFields: prevState.customizeFields.filter(
                    (target) => !selectedCustomizeField.includes(target.title)
                ),
                title: '',
                type: '',
                isRequired: false,
                optionValues: [],
                openDeleteDialogCustomizeField:
                    !prevState.openDeleteDialogCustomizeField
            };
        });
        setSelectedCustomizeField([]);
    };

    /* Customize Field */

    /* Task Table */
    const handleChangeTask = (e) => {
        setTaskState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
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
            openCreateAndUpdateDialogTask:
                !prevState.openCreateAndUpdateDialogTask,
            isTaskCreateMode: mode ? false : true
        }));
        //clear Error
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });
    };

    const handleToggleDialogDeleteTask = () => {
        setTaskState((prevState) => ({
            ...prevState,
            openDeleteDialogTask: !prevState.openDeleteDialogTask
        }));
    };

    const handleCreateAndUpdateTask = () => {
        const { name, email, type, startTime, endTime, tasks } = taskState;
        let listErrors = {};
        if (!name) {
            listErrors = {
                ...listErrors,
                name: 'Name cannot be blanked.'
            };
        }
        if (taskState.tasks.some((target) => target.name === name)) {
            listErrors = {
                ...listErrors,
                name: `${name} already existed`
            };
        }
        if (!email) {
            listErrors = {
                ...listErrors,
                email: 'Email cannot be blanked.'
            };
        }
        if (!type) {
            listErrors = {
                ...listErrors,
                type: 'Type cannot be blanked.'
            };
        }
        if (!startTime) {
            listErrors = {
                ...listErrors,
                startTime: 'Start Time cannot be blanked.'
            };
        }

        if (!endTime) {
            listErrors = {
                ...listErrors,
                endTime: 'End Time cannot be blanked.'
            };
        }

        //Start Time have to time range that event happen.
        if (
            !moment(Date.parse(startTime)).isBetween(
                Date.parse(state.startDate),
                Date.parse(state.endDate)
            )
        ) {
            listErrors = {
                ...listErrors,
                startTime:
                    'Start Time must have in a time range that event happen.'
            };
        }
        //End Time have to time range that event happen.
        if (
            !moment(Date.parse(endTime)).isBetween(
                Date.parse(state.startDate),
                Date.parse(state.endDate)
            )
        ) {
            listErrors = {
                ...listErrors,
                endTime: 'End Time must have in a time range that event happen.'
            };
        }

        /* Time Conflict Validation trigger when create multiple tasks for same users */
        if (
            taskState.tasks.some(
                (targetTask) => targetTask.email === email.email
            )
        ) {
            const targetFilter = !taskState.isTaskCreateMode
                ? tasks
                      .filter((targetTask) => targetTask.email === email.email)
                      .filter(
                          (targetTask) =>
                              !moment(Date.parse(taskState.startTime)).isSame(
                                  moment(Date.parse(targetTask.startTime))
                              ) ||
                              !moment(Date.parse(taskState.endTime)).isSame(
                                  moment(Date.parse(targetTask.endTime))
                              )
                      )
                : tasks.filter(
                      (targetTask) => targetTask.email === email.email
                  );
            if (startTime) {
                for (const task of targetFilter) {
                    if (
                        moment(Date.parse(task.startTime)).isBetween(
                            moment(Date.parse(startTime)),
                            moment(Date.parse(endTime))
                        ) ||
                        moment(Date.parse(startTime)).isBetween(
                            moment(Date.parse(task.startTime)),
                            moment(Date.parse(task.endTime))
                        )
                    ) {
                        listErrors = {
                            ...listErrors,
                            startTime:
                                'Time conflict to other tasks. Please double check!'
                        };
                        break;
                    }
                }
            }
            if (endTime) {
                for (const task of targetFilter) {
                    if (
                        moment(Date.parse(task.endTime)).isBetween(
                            moment(Date.parse(startTime)),
                            moment(Date.parse(endTime))
                        ) ||
                        moment(Date.parse(endTime)).isBetween(
                            moment(Date.parse(task.startTime)),
                            moment(Date.parse(task.endTime))
                        )
                    ) {
                        listErrors = {
                            ...listErrors,
                            endTime:
                                'Time conflict to other tasks. Please double check!'
                        };
                        break;
                    }
                }
            }
        }

        //end time can not smaller than start time
        if (moment(Date.parse(endTime)).isBefore(Date.parse(startTime))) {
            listErrors = {
                ...listErrors,
                endTime: 'End Time cannot be smaller than Start Time.'
            };
        }
        if (Object.keys(listErrors).length !== 0) {
            return dispatch({
                type: ERROR,
                payload: listErrors
            });
        }

        //generate new update when in edit mode
        let update;
        if (!taskState.isTaskCreateMode) {
            update = taskState.tasks.filter(
                (task) => task.name !== selectedTask[0]
            );
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
                        endTime: prevState.endTime
                    }
                ],
                name: '',
                email: '',
                type: '',
                startTime: null,
                endTime: null,
                openCreateAndUpdateDialogTask: false
            };
        });

        //clear error
        dispatch({
            type: ERROR_CLEAR,
            payload: null
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
                openDeleteDialogTask: false
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
            <CreateEventProvider
                handleUpdateOptionValues={handleUpdateOptionValues}
                startDate={startDate}
                endDate={endDate}
                handleCloseCreateDialog={handleCloseCreateDialog}
                listTag={listTag}
                optionValues={optionValues}
                fileInput={fileInput}
                eventTypes={eventTypes}
                errors={errors}
                eventTypeIsLoading={eventTypeIsLoading}
                createEventTypeSuccess={createEventTypeSuccess}
                createEventSuccess={createEventSuccess}
                facilities={facilities}
                user={user}
                users={users}
                eventIsLoading={eventIsLoading}
                facilityHistories={facilityHistories}
                state={state}
                selectedFacility={selectedFacility}
                borrowFacilityState={borrowFacilityState}
                selectedTask={selectedTask}
                taskState={taskState}
                handleChange={handleChange}
                handleCreateEventType={handleCreateEventType}
                handleToggleDialogCreateEventType={
                    handleToggleDialogCreateEventType
                }
                handleCreateEvent={handleCreateAndUpdateEvent}
                handleUpdateListTag={handleUpdateListTag}
                handleChangeBorrowFacility={handleChangeBorrowFacility}
                handleToggleDialogCreateAndUpdateBorrowFacility={
                    handleToggleDialogCreateAndUpdateBorrowFacility
                }
                handleToggleDialogDeleteBorrowFacility={
                    handleToggleDialogDeleteBorrowFacility
                }
                handleCreateAndUpdateBorrowFacility={
                    handleCreateAndUpdateBorrowFacility
                }
                setBorrowFacilityState={setBorrowFacilityState}
                handleDeleteBorrowFacility={handleDeleteBorrowFacility}
                handleChangeTask={handleChangeTask}
                handleToggleDialogCreateAndUpdateTask={
                    handleToggleDialogCreateAndUpdateTask
                }
                handleToggleDialogDeleteTask={handleToggleDialogDeleteTask}
                handleCreateAndUpdateTask={handleCreateAndUpdateTask}
                handleDeleteTask={handleDeleteTask}
                handleChangePhoto={handleChangePhoto}
                setState={setState}
                setSelectedFacility={setSelectedFacility}
                setSelectedTask={setSelectedTask}
                setTaskState={setTaskState}
                //Customize Fields
                selectedCustomizeField={selectedCustomizeField}
                setSelectedCustomizeField={setSelectedCustomizeField}
                customizeFieldState={customizeFieldState}
                setCustomizeFieldState={setCustomizeFieldState}
                handleChangeCustomizeField={handleChangeCustomizeField}
                handleToggleDialogCreateAndUpdateCustomizeField={
                    handleToggleDialogCreateAndUpdateCustomizeField
                }
                handleToggleDialogDeleteCustomizeField={
                    handleToggleDialogDeleteCustomizeField
                }
                handleCreateAndUpdateCustomizeField={
                    handleCreateAndUpdateCustomizeField
                }
                handleDeleteCustomizeField={handleDeleteCustomizeField}>
                <Paper className={css.paper} elevation={3}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        direction="column">
                        <Grid item>
                            <Typography
                                style={{ fontWeight: 'bold' }}
                                variant="h3">
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
                            style={{ margin: '20px 0' }}>
                            <div
                                style={{
                                    width: '100%',
                                    height: '500px',
                                    backgroundImage: `url(${
                                        !state.image ? blankPhoto : state.image
                                    })`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'contain'
                                }}></div>
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
                            xs={12}>
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
                                            image: null
                                        });
                                        fileInput.current.value = '';
                                    }}
                                    color="secondary"
                                    startIcon={<DeleteForever />}
                                    variant="contained"
                                    style={{ textTransform: 'none' }}>
                                    Remove
                                </Button>
                            )}
                            <label
                                className={css.btnChangePhoto}
                                htmlFor="change-image">
                                {state.image ? (
                                    <Button
                                        disabled={eventIsLoading}
                                        startIcon={<AddAPhoto />}
                                        variant="contained"
                                        style={{ textTransform: 'none' }}
                                        color="primary"
                                        component="span">
                                        Change Image
                                    </Button>
                                ) : (
                                    <Button
                                        disabled={eventIsLoading}
                                        startIcon={<AddAPhoto />}
                                        style={{
                                            backgroundColor: 'transparent',
                                            textTransform: 'none'
                                        }}
                                        component="span">
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
                            style={{ margin: '20px 0' }}>
                            {/* Create Event Input Group */}
                            <CreateEventInputGroup
                                isResetListTag={state.isResetListTag}
                                eventIsLoading={eventIsLoading}
                                errors={errors}
                                handleChange={handleChange}
                                state={state}
                                setState={setState}
                                eventTypes={eventTypes}
                                createEventSuccess={createEventSuccess}
                                updateEventSuccess={updateEventSuccess}
                                updateListTag={handleUpdateListTag}
                                defaultValueTags={defaultValueTags}
                            />

                            {/* Tasks Table */}
                            <Grid
                                style={{ marginTop: 24 }}
                                item
                                md={12}
                                lg={12}
                                xl={12}
                                sm={12}
                                xs={12}>
                                <Paper className={css.paper1} elevation={3}>
                                    <DataTable
                                        selectedName="name"
                                        constrainRangeDate={
                                            !!state.startDate && !!state.endDate
                                        }
                                        disabled={eventIsLoading}
                                        handleToggleDialogCreateAndUpdate={
                                            handleToggleDialogCreateAndUpdateTask
                                        }
                                        handleToggleDialogDelete={
                                            handleToggleDialogDeleteTask
                                        }
                                        take={1}
                                        selected={selectedTask}
                                        setSelected={setSelectedTask}
                                        data={taskState.tasks}
                                        isLoading={taskState.isLoading}
                                        createSuccess={
                                            taskState.taskCreatSucces
                                        }
                                        deleteSuccess={
                                            taskState.taskDeleteSucces
                                        }
                                        updateSuccess={
                                            taskState.taskUpdateSucces
                                        }
                                        tableName="Task Assign"
                                        headCells={headCellsTask}
                                    />
                                </Paper>
                                <FormControl
                                    error={errors?.taskListId ? true : false}>
                                    <FormHelperText>
                                        {errors?.taskListId
                                            ? errors?.taskListId
                                            : ''}
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
                                xs={12}>
                                <Paper className={css.paper1} elevation={3}>
                                    <DataTable
                                        selectedName="name"
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
                                        data={
                                            borrowFacilityState.borrowFacilities
                                        }
                                        isLoading={
                                            borrowFacilityState.borrowFacilityLoading
                                        }
                                        createSuccess={
                                            borrowFacilityState.borrowFacilityCreatSuccess
                                        }
                                        deleteSuccess={
                                            borrowFacilityState.borrowFacilityDeleteSuccess
                                        }
                                        updateSuccess={
                                            borrowFacilityState.borrowFacilityUpdateSuccess
                                        }
                                        tableName="Borrow Facility"
                                        headCells={headCellBorrowFacility}
                                    />
                                </Paper>
                                <FormControl
                                    error={
                                        errors?.facilityHistoryListId
                                            ? true
                                            : false
                                    }>
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
                                xs={12}>
                                <Typography
                                    style={{ fontWeight: 'bold' }}
                                    variant="h6">
                                    Event Description
                                </Typography>
                            </Grid>

                            {/* Description */}
                            <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
                                <RichTextEditor
                                    key={state.isResetListTag}
                                    disabled={eventIsLoading}
                                    value={defaultDescription}
                                    setState={setState}
                                />
                                <FormControl
                                    error={errors?.description ? true : false}>
                                    <FormHelperText>
                                        {errors?.description
                                            ? errors?.description
                                            : ''}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            {/* Customize Fields For Registration Portal  */}
                            <Grid item md={12} lg={12} xl={12} sm={12} xs={12}>
                                <Paper elevation={3}>
                                    <DataTable
                                        selectedName="title"
                                        disabled={eventIsLoading}
                                        handleToggleDialogCreateAndUpdate={
                                            handleToggleDialogCreateAndUpdateCustomizeField
                                        }
                                        handleToggleDialogDelete={
                                            handleToggleDialogDeleteCustomizeField
                                        }
                                        take={1}
                                        selected={selectedCustomizeField}
                                        setSelected={setSelectedCustomizeField}
                                        data={
                                            customizeFieldState.customizeFields
                                        }
                                        isLoading={
                                            customizeFieldState.isLoading
                                        }
                                        createSuccess={
                                            customizeFieldState.customizeFieldCreatSuccess
                                        }
                                        deleteSuccess={
                                            customizeFieldState.customizeFieldDeleteSuccess
                                        }
                                        updateSuccess={
                                            customizeFieldState.customizeFieldUpdateSuccess
                                        }
                                        tableName="Customize Fields For Registration Portal"
                                        headCells={headCellsCustomizeField}
                                    />
                                </Paper>
                            </Grid>
                            {/* Button Control */}
                            <Grid
                                container
                                justify="space-between"
                                alignItems="center"
                                item
                                md={12}
                                lg={12}
                                xl={12}
                                sm={12}
                                xs={12}>
                                <Grid item>
                                    <Button
                                        className={css.clearAllButton}
                                        disabled={eventIsLoading}
                                        size="large"
                                        color="default"
                                        style={{
                                            backgroundColor: 'transparent'
                                        }}
                                        onClick={() => handleClearFields(true)}>
                                        Clear all
                                    </Button>
                                </Grid>
                                <Grid item>
                                    {handleCloseCreateDialog ||
                                        (handleCloseUpdateDialog && (
                                            <Button
                                                className={css.clearAllButton}
                                                disabled={eventIsLoading}
                                                size="large"
                                                onClick={
                                                    handleCloseCreateDialog ||
                                                    handleCloseUpdateDialog
                                                }>
                                                Cancel
                                            </Button>
                                        ))}
                                    <Button
                                        disabled={eventIsLoading}
                                        style={{
                                            marginLeft: '20px',
                                            textTransform: 'none',
                                            width: '140px'
                                        }}
                                        size="large"
                                        onClick={handleCreateAndUpdateEvent}
                                        variant="contained"
                                        color="primary">
                                        {eventIsLoading ? (
                                            <CircularProgress
                                                size={26}
                                                color="inherit"
                                            />
                                        ) : isUpdateMode ? (
                                            'Update Event'
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
                    handleToggleDialogCreateEventType={
                        handleToggleDialogCreateEventType
                    }
                    handleChange={handleChange}
                    eventTypeTarget={state.eventTypeTarget}
                    eventTypeIsLoading={eventTypeIsLoading}
                    handleCreateEventType={handleCreateEventType}
                    errors={errors}
                />
                {/* Borrow Facility Dialog */}
                <BorrowFacilityDialog />
                {/* Task Dialog */}
                <TaskDialog />
                {/* Customize Field Dialog */}
                <CustomizeFieldDialog />
                {/* Notification */}
                <SystemNotification
                    openCreateSnackBar={state.openCreateSnackBar}
                />
            </CreateEventProvider>
        </div>
    );
};

export default CreateEvent;

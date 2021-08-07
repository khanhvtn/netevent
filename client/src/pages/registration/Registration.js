import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    Paper,
    Typography,
    Grid,
    FormControl,
    TextField,
    Container,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Chip,
    Select,
    InputLabel,
    CircularProgress,
    MenuItem,
    FormHelperText
} from '@material-ui/core';
import moment from 'moment';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistrationPageDetail } from '../../actions/eventActions';
import { registerParticipant } from '../../actions/participantActions';
import { useParams, useHistory } from 'react-router';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import SystemNotification from '../../components/Notification/Notification';
import { ERROR_CLEAR } from '../../constants';
import useStyles from './styles';
import { useForm, Controller } from 'react-hook-form';
import CustomizeForm from '../../components/CustomizeForm/CustomizeForm';

const eventInitialState = {
    event: null,
    isLoaded: false
};

const initialDescription =
    '{"blocks":[{"key":"4jrep","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';

const Registration = () => {
    const css = useStyles();
    const [state, setState] = useState(eventInitialState);

    const myRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();

    //use form hook
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setError,
        getValues,
        clearErrors
    } = useForm();

    // UseParams to get pathname
    const { code } = useParams();

    const isReviewed = history.location?.state?.isReviewed || false;

    const { isLoading, eventDetail, error, isRegistered, registerSuccess } =
        useSelector((state) => ({
            isLoading: state.event.isDetailLoading,
            eventDetail: state.event.eventDetail,
            error: state.error.errors,
            isRegistered: state.participant.isLoading,
            registerSuccess: state.participant.complete
        }));

    //useEffect to push error of global state to react-form-hook
    useEffect(() => {
        if (error) {
            for (const err in error) {
                setError(err, { type: 'manual', message: error[err] });
            }
        }
    }, [error, setError]);

    // UseEffect to scroll to top at the first mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // UseEffect to check review status and load the event detail from history
    useEffect(() => {
        if (eventDetail) {
            setState((prevState) => ({
                ...prevState,
                event: eventDetail,
                isLoaded: !prevState.isLoaded
            }));
        }
    }, [eventDetail]);

    // Call API to get current event by urlCode
    useEffect(() => {
        if (!isReviewed && !state.event && !state.isLoaded && !isLoading) {
            dispatch(getRegistrationPageDetail(code));
        }
    }, [dispatch, state.event, state.isLoaded, isLoading, isReviewed, code]);

    // Check if page is valid by event status
    useEffect(() => {
        if (!isReviewed && state.isLoaded && !state.event?.urlCode) {
            history.push('/404');
        }
    }, [state.event?.urlCode, isReviewed, state.isLoaded, history]);

    const contentState = convertFromRaw(
        JSON.parse(
            state.event?.description
                ? state.event?.description
                : initialDescription
        )
    );
    const editorState = EditorState.createWithContent(contentState);

    // handle clear all fields
    const handleClearField = useCallback(() => {
        //clear all error
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });
    }, [dispatch]);

    //func generate defaultValues
    const genDefaultValues = useCallback((customizeFields) => {
        let originalDefaultValues = {
            email: '',
            name: '',
            academic: '',
            school: '',
            major: '',
            phone: '',
            DOB: Date.now(),
            expectedGraduateDate: Date.now()
        };
        let dynamicDefaultValues = {};
        if (customizeFields) {
            for (const field of customizeFields) {
                switch (field.type) {
                    case 'Radio':
                    case 'Email':
                    case 'Number':
                    case 'Text':
                        dynamicDefaultValues = {
                            ...dynamicDefaultValues,
                            [field.title]: ''
                        };
                        break;
                    case 'Checkbox':
                        if (field.optionValues.length === 0) {
                            dynamicDefaultValues = {
                                ...dynamicDefaultValues,
                                [field.title]: false
                            };
                            break;
                        } else {
                            dynamicDefaultValues = {
                                ...dynamicDefaultValues,
                                [field.title]: []
                            };
                            break;
                        }
                    case 'DateTime':
                        dynamicDefaultValues = {
                            ...dynamicDefaultValues,
                            [field.title]: Date.now()
                        };
                        break;
                    default:
                        dynamicDefaultValues = {
                            ...dynamicDefaultValues,
                            [field.title]: ''
                        };
                        break;
                }
            }
        }
        return { ...originalDefaultValues, ...dynamicDefaultValues };
    }, []);

    // Handle success register
    useEffect(() => {
        if (registerSuccess) {
            handleClearField();
            clearErrors();
            reset(genDefaultValues(state.event?.customizeFields));
        }
    }, [
        dispatch,
        registerSuccess,
        handleClearField,
        reset,
        clearErrors,
        getValues,
        genDefaultValues,
        state.event?.customizeFields
    ]);
    // On scroll register button
    const executeScroll = () =>
        myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Back to detail page and set review to false
    const handleOnBackToDetailPage = () => {
        setState(eventInitialState);
        if (history.location?.state) {
            switch (history.location.state.from) {
                case '/dashboard/creator/event-detail':
                    return history.push({
                        pathname: `/dashboard/creator/event-detail/${code}`,
                        state: {
                            from: `/dashboard/creator/event-management`,
                            page: history.location.state?.page,
                            isReviewed: true
                        }
                    });
                case '/dashboard/reviewer/event-review':
                    return history.push({
                        pathname: `/dashboard/reviewer/event-review/${code}`,
                        state: {
                            from: `/dashboard/reviewer/event-request`,
                            page: history.location.state?.page,
                            isReviewed: true
                        }
                    });
            }
        }
    };

    // Handle On Click Register
    const handleOnRegister = (data) => {
        const {
            email,
            name,
            academic,
            school,
            major,
            phone,
            DOB,
            expectedGraduateDate,
            ...rest
        } = data;

        let customizeFieldData = [];

        for (let key in rest) {
            customizeFieldData.push({ title: key, value: rest[key] });
        }
        dispatch(
            registerParticipant({
                event: eventDetail._id,
                email,
                name,
                academic,
                school,
                major,
                phone,
                DOB,
                expectedGraduateDate,
                customizeFieldData
            })
        );
    };

    return isLoading ? (
        <div className={css.circularProgress} align="center">
            <CircularProgress color="primary" />
        </div>
    ) : (
        <>
            <Paper className={css.screen}>
                <div className={css.background}>
                    <img className={css.responsive} src={state.event?.image} />
                </div>
                <div className={css.root}>
                    <Paper className={css.wrapper} elevation={5}>
                        <Grid className={css.topDisplay} container>
                            <Grid item xs={12} sm={12} md={8} lg={8}>
                                <div
                                    className={css.image}
                                    style={{
                                        width: '100%',
                                        height: 345,
                                        maxHeight: 345,
                                        backgroundImage: `url(${state.event?.image})`
                                    }}
                                />
                            </Grid>
                            <Grid
                                className={css.register}
                                container
                                item
                                xs={12}
                                sm={12}
                                md={4}
                                lg={4}>
                                <Grid
                                    className={css.registerBottom}
                                    container
                                    direction="column"
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    item>
                                    <Typography style={{ fontWeight: 'bold' }}>
                                        {moment(state.event?.startDate).format(
                                            'MMM'
                                        )}
                                    </Typography>
                                    <Typography
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '1.5em'
                                        }}>
                                        {moment(state.event?.startDate).format(
                                            'DD'
                                        )}
                                    </Typography>
                                </Grid>

                                <Grid
                                    className={css.registerBottom}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={12}
                                    container
                                    direction="column"
                                    item>
                                    <Typography variant="h6">
                                        {state.event?.eventName}
                                    </Typography>
                                    <Typography variant="caption">
                                        Hosted by NetCompany
                                    </Typography>
                                </Grid>

                                <Grid
                                    container
                                    justify="flex-start"
                                    alignItems="flex-end"
                                    className={css.registerBottomButton}
                                    item>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        className={css.registerButtonTop}
                                        onClick={executeScroll}>
                                        Register Now
                                    </Button>
                                    {isReviewed && (
                                        <Button
                                            variant="outlined"
                                            onClick={handleOnBackToDetailPage}>
                                            Back to detail
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider style={{ height: '1px' }} flexItem />
                        </Grid>

                        <Grid container spacing={1}>
                            {/* Top side */}
                            <Grid
                                container
                                item
                                xs={12}
                                md={12}
                                lg={12}
                                alignItems="stretch"
                                direction="row-reverse">
                                {/* Right-side */}
                                <Grid
                                    className={css.detailWrapper}
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={4}
                                    container
                                    alignItems="flex-start"
                                    direction="column"
                                    item>
                                    {/* Date and time */}
                                    <Grid item>
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                            variant="h6">
                                            Date and time
                                        </Typography>
                                        <Typography variant="body2">
                                            {moment(
                                                state.event?.startDate
                                            ).format('DD MMM') ===
                                            moment(state.event?.endDate).format(
                                                'DD MMM'
                                            )
                                                ? `${moment(
                                                      state.event?.startDate
                                                  ).format('DD MMM, YYYY')}`
                                                : `${moment(
                                                      state.event?.startDate
                                                  ).format(
                                                      'DD MMM'
                                                  )} - ${moment(
                                                      state.event?.endDate
                                                  ).format('DD MMM')}`}
                                        </Typography>
                                        <Typography variant="body2">
                                            {`${moment(
                                                state.event?.startDate
                                            ).format('LT')} - ${moment(
                                                state.event?.endDate
                                            ).format('LT')}`}
                                        </Typography>
                                    </Grid>

                                    {/* Registration Close Date */}
                                    <Grid className={css.mt36} item>
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                            variant="h6">
                                            Registration deadline
                                        </Typography>
                                        <Typography variant="body2">
                                            {`${moment(
                                                state.event
                                                    ?.registrationCloseDate
                                            ).format('DD MMM, YYYY')}`}
                                        </Typography>
                                        <Typography variant="body2">
                                            {`${moment(
                                                state.event
                                                    ?.registrationCloseDate
                                            ).format('LT')}`}
                                        </Typography>
                                    </Grid>

                                    {/* Location */}
                                    <Grid className={css.mt36} item>
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                            variant="h6">
                                            Location
                                        </Typography>
                                        <Typography variant="body2">
                                            {state.event?.location}
                                        </Typography>
                                    </Grid>

                                    {/* Tags */}
                                    <Grid className={css.mt36} item>
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                            variant="h6">
                                            Tags
                                        </Typography>
                                        <div className={css.chipContainer}>
                                            {state.event?.tags?.map(
                                                (tag, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={tag}
                                                        size="small"
                                                        className={css.chip}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </Grid>
                                </Grid>

                                {/* Left Side */}
                                <Grid
                                    className={css.detailDescriptionWrapper}
                                    container
                                    alignItems="flex-start"
                                    direction="column"
                                    item
                                    xs={12}
                                    sm={12}
                                    md={8}
                                    lg={8}>
                                    <Grid item>
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                            variant="h6">
                                            About this event
                                        </Typography>

                                        <Editor
                                            className={css.eventDescription}
                                            editorState={editorState}
                                            readOnly={true}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider style={{ height: '1px' }} flexItem />
                            </Grid>

                            {/* Bottom side */}
                            <Grid container item xs={12} md={12} lg={12}>
                                <Grid container className={css.mtb36} item>
                                    <Container
                                        fixed
                                        className={css.bodyActivity}>
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                            align="center"
                                            variant="h4">
                                            Activities
                                        </Typography>
                                        <TableContainer>
                                            <Table
                                                className={css.table}
                                                aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            className={
                                                                css.tableText
                                                            }>
                                                            Tasks
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                css.tableText
                                                            }
                                                            align="left">
                                                            Start Time
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                css.tableText
                                                            }
                                                            align="left">
                                                            End Time
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {state.event?.taskListId?.map(
                                                        (task) => (
                                                            <TableRow
                                                                key={task._id}>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }
                                                                    component="th"
                                                                    scope="row">
                                                                    {task.name}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }
                                                                    align="left">
                                                                    {`${moment(
                                                                        task.startDate
                                                                    ).format(
                                                                        'DD MMM, YYYY, LT'
                                                                    )}`}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }
                                                                    align="left">
                                                                    {`${moment(
                                                                        task.endDate
                                                                    ).format(
                                                                        'DD MMM, YYYY, LT'
                                                                    )}`}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Container>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider
                                        style={{ height: '1px' }}
                                        flexItem
                                    />
                                </Grid>

                                <Grid
                                    container
                                    className={css.mtb36}
                                    item
                                    ref={myRef}>
                                    <Container
                                        fixed
                                        className={css.bodyRegistrationForm}>
                                        <Typography
                                            style={{ fontWeight: 'bold' }}
                                            align="center"
                                            variant="h4"
                                            id="registrationForm">
                                            Registration Form
                                        </Typography>

                                        <form
                                            noValidate
                                            onSubmit={handleSubmit(
                                                handleOnRegister
                                            )}>
                                            <FormControl fullWidth>
                                                <Controller
                                                    defaultValue=""
                                                    name="name"
                                                    control={control}
                                                    rules={{
                                                        validate: (value) =>
                                                            !!value ||
                                                            `Full Name can not be blanked`
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            disabled={
                                                                isReviewed
                                                            }
                                                            label="Full Name"
                                                            variant="outlined"
                                                            margin="none"
                                                            error={
                                                                errors['name']
                                                                    ? true
                                                                    : false
                                                            }
                                                            helperText={
                                                                errors['name']
                                                                    ? errors[
                                                                          'name'
                                                                      ].message
                                                                    : ''
                                                            }
                                                            required
                                                            fullWidth
                                                            className={
                                                                css.textField
                                                            }
                                                        />
                                                    )}
                                                />

                                                <Controller
                                                    defaultValue=""
                                                    name="email"
                                                    control={control}
                                                    rules={{
                                                        validate: (value) =>
                                                            !!value ||
                                                            `Email can not be blanked`
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            disabled={
                                                                isReviewed
                                                            }
                                                            label="Email"
                                                            variant="outlined"
                                                            margin="none"
                                                            error={
                                                                errors['email']
                                                                    ? true
                                                                    : false
                                                            }
                                                            helperText={
                                                                errors['email']
                                                                    ? errors[
                                                                          'email'
                                                                      ].message
                                                                    : ''
                                                            }
                                                            required
                                                            fullWidth
                                                            className={
                                                                css.textField
                                                            }
                                                        />
                                                    )}
                                                />
                                                <Controller
                                                    defaultValue=""
                                                    name="school"
                                                    control={control}
                                                    rules={{
                                                        validate: (value) =>
                                                            !!value ||
                                                            `University can not be blanked`
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            disabled={
                                                                isReviewed
                                                            }
                                                            label="University"
                                                            variant="outlined"
                                                            margin="none"
                                                            error={
                                                                errors['school']
                                                                    ? true
                                                                    : false
                                                            }
                                                            helperText={
                                                                errors['school']
                                                                    ? errors[
                                                                          'school'
                                                                      ].message
                                                                    : ''
                                                            }
                                                            required
                                                            fullWidth
                                                            className={
                                                                css.textField
                                                            }
                                                        />
                                                    )}
                                                />

                                                <Controller
                                                    defaultValue=""
                                                    name="academic"
                                                    control={control}
                                                    rules={{
                                                        validate: (value) =>
                                                            !!value ||
                                                            `Academic can not be blanked`
                                                    }}
                                                    render={({ field }) => (
                                                        <FormControl
                                                            error={
                                                                errors[
                                                                    'academic'
                                                                ]
                                                                    ? true
                                                                    : false
                                                            }
                                                            disabled={
                                                                isReviewed
                                                            }
                                                            margin="none"
                                                            className={
                                                                css.textField
                                                            }>
                                                            <InputLabel
                                                                id="demo-simple-select-outlined-label1"
                                                                className={
                                                                    css.academicField
                                                                }>
                                                                Academic *
                                                            </InputLabel>
                                                            <Select
                                                                {...field}
                                                                fullWidth
                                                                variant="outlined"
                                                                label="Academic">
                                                                <MenuItem value="">
                                                                    <em>
                                                                        None
                                                                    </em>
                                                                </MenuItem>
                                                                <MenuItem value="Bachelor">
                                                                    <em>
                                                                        Bachelor
                                                                    </em>
                                                                </MenuItem>
                                                                <MenuItem value="Master">
                                                                    <em>
                                                                        Master
                                                                    </em>
                                                                </MenuItem>
                                                                <MenuItem value="Phd">
                                                                    <em>Phd</em>
                                                                </MenuItem>
                                                            </Select>
                                                            <FormHelperText>
                                                                {errors[
                                                                    'academic'
                                                                ]
                                                                    ? errors[
                                                                          'academic'
                                                                      ].message
                                                                    : ''}
                                                            </FormHelperText>
                                                        </FormControl>
                                                    )}
                                                />

                                                <Controller
                                                    defaultValue=""
                                                    name="major"
                                                    control={control}
                                                    rules={{
                                                        validate: (value) =>
                                                            !!value ||
                                                            `Major can not be blanked`
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            disabled={
                                                                isReviewed
                                                            }
                                                            label="Major"
                                                            variant="outlined"
                                                            margin="none"
                                                            error={
                                                                errors['major']
                                                                    ? true
                                                                    : false
                                                            }
                                                            helperText={
                                                                errors['major']
                                                                    ? errors[
                                                                          'major'
                                                                      ].message
                                                                    : ''
                                                            }
                                                            required
                                                            fullWidth
                                                            className={
                                                                css.textField
                                                            }
                                                        />
                                                    )}
                                                />

                                                <Controller
                                                    defaultValue=""
                                                    name="phone"
                                                    control={control}
                                                    rules={{
                                                        validate: (value) =>
                                                            !!value ||
                                                            `Phone can not be blanked`
                                                    }}
                                                    render={({ field }) => (
                                                        <TextField
                                                            {...field}
                                                            disabled={
                                                                isReviewed
                                                            }
                                                            label="Phone"
                                                            variant="outlined"
                                                            margin="none"
                                                            error={
                                                                errors['phone']
                                                                    ? true
                                                                    : false
                                                            }
                                                            helperText={
                                                                errors['phone']
                                                                    ? errors[
                                                                          'phone'
                                                                      ].message
                                                                    : ''
                                                            }
                                                            required
                                                            fullWidth
                                                            className={
                                                                css.textField
                                                            }
                                                        />
                                                    )}
                                                />

                                                <MuiPickersUtilsProvider
                                                    utils={DateFnsUtils}>
                                                    <Controller
                                                        defaultValue={Date.now()}
                                                        rules={{
                                                            validate: (
                                                                targetValue
                                                            ) =>
                                                                !!targetValue ||
                                                                `Date of Birth can not be blanked`
                                                        }}
                                                        name="DOB"
                                                        control={control}
                                                        render={({ field }) => {
                                                            delete field.ref;
                                                            return (
                                                                <KeyboardDatePicker
                                                                    disabled={
                                                                        isReviewed
                                                                    }
                                                                    error={
                                                                        errors[
                                                                            'DOB'
                                                                        ]
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    helperText={
                                                                        errors[
                                                                            'DOB'
                                                                        ]
                                                                            ? errors[
                                                                                  'DOB'
                                                                              ]
                                                                                  .message
                                                                            : ''
                                                                    }
                                                                    inputVariant="outlined"
                                                                    required
                                                                    className={
                                                                        css.textField
                                                                    }
                                                                    margin="normal"
                                                                    id="date-picker-dialog"
                                                                    label="Date of Birth"
                                                                    format="dd/MM/yyyy"
                                                                    KeyboardButtonProps={{
                                                                        'aria-label':
                                                                            'change date'
                                                                    }}
                                                                    {...field}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                    <Controller
                                                        defaultValue={Date.now()}
                                                        rules={{
                                                            validate: (
                                                                targetValue
                                                            ) =>
                                                                !!targetValue ||
                                                                `Graduation Date can not be blanked`
                                                        }}
                                                        name="expectedGraduateDate"
                                                        control={control}
                                                        render={({ field }) => {
                                                            delete field.ref;
                                                            return (
                                                                <KeyboardDatePicker
                                                                    disabled={
                                                                        isReviewed
                                                                    }
                                                                    error={
                                                                        errors[
                                                                            'expectedGraduateDate'
                                                                        ]
                                                                            ? true
                                                                            : false
                                                                    }
                                                                    helperText={
                                                                        errors[
                                                                            'expectedGraduateDate'
                                                                        ]
                                                                            ? errors[
                                                                                  'expectedGraduateDate'
                                                                              ]
                                                                                  .message
                                                                            : ''
                                                                    }
                                                                    inputVariant="outlined"
                                                                    required
                                                                    className={
                                                                        css.textField
                                                                    }
                                                                    margin="normal"
                                                                    id="date-picker-dialog"
                                                                    label="Graduation Date"
                                                                    format="dd/MM/yyyy"
                                                                    KeyboardButtonProps={{
                                                                        'aria-label':
                                                                            'change date'
                                                                    }}
                                                                    {...field}
                                                                />
                                                            );
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                                <CustomizeForm
                                                    disabled={isReviewed}
                                                    getValues={getValues}
                                                    globalError={error}
                                                    errors={errors}
                                                    control={control}
                                                    fieldList={
                                                        state.event
                                                            ?.customizeFields
                                                            ? state.event
                                                                  ?.customizeFields
                                                            : []
                                                    }
                                                />

                                                <Button
                                                    disabled={
                                                        isRegistered ||
                                                        isReviewed
                                                    }
                                                    className={
                                                        css.registerButton
                                                    }
                                                    type="submit"
                                                    color="primary"
                                                    variant="contained">
                                                    {isRegistered ? (
                                                        <CircularProgress
                                                            size={26}
                                                            color="inherit"
                                                        />
                                                    ) : (
                                                        'Register Now'
                                                    )}
                                                </Button>
                                            </FormControl>
                                        </form>
                                    </Container>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider style={{ height: '1px' }} flexItem />
                            </Grid>

                            {/* Footer */}
                            <Grid container item xs={12} md={12} lg={12}>
                                <Grid container className={css.mtb36} item>
                                    <Container
                                        fixed
                                        className={css.bodyActivity}>
                                        <Typography
                                            style={{
                                                fontWeight: 'bold',
                                                marginBottom: 8
                                            }}
                                            align="center"
                                            variant="subtitle2">
                                            {state.event?.eventName}
                                        </Typography>
                                        <Typography
                                            align="center"
                                            variant="body2">
                                            at
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontWeight: 'bold',
                                                marginTop: 8
                                            }}
                                            align="center"
                                            variant="subtitle2">
                                            {state.event?.location}
                                        </Typography>
                                    </Container>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    <SystemNotification
                        openRegisterParticipantSnackBar={registerSuccess}
                    />
                </div>
            </Paper>
        </>
    );
};

export default Registration;

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    Paper,
    FormControl,
    TextField,
    Grid,
    Button,
    Typography,
    Container,
    CircularProgress,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Select,
    InputLabel,
    MenuItem
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

const participantInitialState = {
    event: null,
    email: '',
    name: '',
    academic: '',
    school: '',
    major: '',
    phone: '',
    DOB: new Date(Date.now()),
    expectedGraduateDate: new Date(Date.now())
};

const eventInitialState = {
    event: null,
    isLoaded: false
};

const initialDescription =
    '{"blocks":[{"key":"4jrep","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';

const Registration = () => {
    const css = useStyles();
    const [state, setState] = useState(eventInitialState);
    const [participant, setParticipant] = useState(participantInitialState);

    const myRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();

    // UseParams to get pathname
    const { code } = useParams();

    const isReviewed = history.location?.state?.isReviewed || false;

    const { isLoading, eventDetail, error, isRegistered, registerSuccess } =
        useSelector((state) => ({
            isLoading: state.event.isDetailLoading,
            eventDetail: state.event.eventDetail,
            error: state.error,
            isRegistered: state.participant.isLoading,
            registerSuccess: state.participant.complete
        }));

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
        if (!isReviewed && !state.event && !isLoading) {
            dispatch(getRegistrationPageDetail(code));
        }
    }, [dispatch, state.event, isLoading, isReviewed, code]);

    // Check if page is valid by event status
    useEffect(() => {
        if (!isReviewed && state.isLoaded && !state.event?.urlCode) {
            history.push('/404');
        }
    }, [state.event?.urlCode, isReviewed, state.isLoaded, history]);

    // UseEffect to set current event for participant when get the event state
    useEffect(() => {
        if (state.event?._id) {
            setParticipant((prevState) => ({
                ...prevState,
                event: state.event?._id
            }));
        }
    }, [state.event?._id]);

    const contentState = convertFromRaw(
        JSON.parse(
            state.event?.description
                ? state.event?.description
                : initialDescription
        )
    );
    const editorState = EditorState.createWithContent(contentState);

    // handle clear all fields
    const handleClearField = useCallback(
        (action) => {
            setParticipant(participantInitialState);

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

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setParticipant((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle success register
    useEffect(() => {
        if (registerSuccess) {
            handleClearField();
        }
    }, [dispatch, registerSuccess, handleClearField]);

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
                            isReviewed: true
                        }
                    });
                case '/dashboard/reviewer/event-review':
                    return history.push({
                        pathname: `/dashboard/reviewer/event-review/${code}`,
                        state: {
                            from: `/dashboard/reviewer/event-request`,
                            isReviewed: true
                        }
                    });
            }
        }
    };

    // Handle On Click Register
    const handleOnRegister = (e) => {
        e.preventDefault();
        dispatch(registerParticipant(participant));
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

                                {/* <Grid container direction="row" item>
                                        <LocationOnIcon style={{ marginRight: 8 }} />
                                        <Typography >
                                            {state.event?.location}
                                        </Typography>
                                    </Grid> */}
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
                                                                    {moment(
                                                                        task.startDate
                                                                    ).format(
                                                                        'LLLL'
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }
                                                                    align="left">
                                                                    {moment(
                                                                        task.endDate
                                                                    ).format(
                                                                        'LLLL'
                                                                    )}
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

                                        <FormControl fullWidth>
                                            <TextField
                                                disabled={isReviewed}
                                                label="Full Name"
                                                variant="outlined"
                                                margin="none"
                                                name="name"
                                                error={
                                                    error.errors?.name
                                                        ? true
                                                        : false
                                                }
                                                value={participant.name}
                                                onChange={handleOnChange}
                                                required
                                                fullWidth
                                                className={
                                                    css.textField
                                                }></TextField>
                                            {error.errors !== null ? (
                                                error.errors.name && (
                                                    <Typography
                                                        className={
                                                            css.errorStyle
                                                        }>
                                                        {error.errors.name}
                                                    </Typography>
                                                )
                                            ) : (
                                                <></>
                                            )}

                                            <TextField
                                                disabled={isReviewed}
                                                label="Email"
                                                type="email"
                                                name="email"
                                                margin="none"
                                                variant="outlined"
                                                error={
                                                    error.errors?.email
                                                        ? true
                                                        : false
                                                }
                                                value={participant.email}
                                                onChange={handleOnChange}
                                                required
                                                fullWidth
                                                className={
                                                    css.textField
                                                }></TextField>
                                            {error.errors !== null ? (
                                                error.errors.email && (
                                                    <Typography
                                                        className={
                                                            css.errorStyle
                                                        }>
                                                        {error.errors.email}
                                                    </Typography>
                                                )
                                            ) : (
                                                <></>
                                            )}

                                            <TextField
                                                disabled={isReviewed}
                                                label="University"
                                                margin="none"
                                                variant="outlined"
                                                name="school"
                                                error={
                                                    error.errors?.school
                                                        ? true
                                                        : false
                                                }
                                                value={participant.school}
                                                onChange={handleOnChange}
                                                required
                                                fullWidth
                                                className={
                                                    css.textField
                                                }></TextField>
                                            {error.errors !== null ? (
                                                error.errors.school && (
                                                    <Typography
                                                        className={
                                                            css.errorStyle
                                                        }>
                                                        {error.errors.school}
                                                    </Typography>
                                                )
                                            ) : (
                                                <></>
                                            )}

                                            <FormControl
                                                disabled={isReviewed}
                                                margin="none"
                                                className={css.textField}>
                                                <InputLabel
                                                    id="demo-simple-select-outlined-label1"
                                                    error={
                                                        error.errors?.academic
                                                            ? true
                                                            : false
                                                    }
                                                    className={
                                                        css.academicField
                                                    }>
                                                    Academic *
                                                </InputLabel>
                                                <Select
                                                    fullWidth
                                                    labelId="demo-simple-select-outlined-label1"
                                                    id="demo-simple-select-outlined"
                                                    name="academic"
                                                    error={
                                                        error.errors?.academic
                                                            ? true
                                                            : false
                                                    }
                                                    variant="outlined"
                                                    value={participant.academic}
                                                    onChange={handleOnChange}
                                                    label="Academic">
                                                    <MenuItem value="Bachelor">
                                                        <em>Bachelor</em>
                                                    </MenuItem>
                                                    <MenuItem value="Master">
                                                        <em>Master</em>
                                                    </MenuItem>
                                                    <MenuItem value="Phd">
                                                        <em>Phd</em>
                                                    </MenuItem>
                                                </Select>
                                                {error.errors !== null ? (
                                                    error.errors.academic && (
                                                        <Typography
                                                            className={
                                                                css.errorStyle
                                                            }>
                                                            {
                                                                error.errors
                                                                    .academic
                                                            }
                                                        </Typography>
                                                    )
                                                ) : (
                                                    <></>
                                                )}
                                            </FormControl>

                                            <TextField
                                                disabled={isReviewed}
                                                name="major"
                                                label="Major"
                                                margin="none"
                                                variant="outlined"
                                                error={
                                                    error.errors?.major
                                                        ? true
                                                        : false
                                                }
                                                value={participant.major}
                                                onChange={handleOnChange}
                                                required
                                                fullWidth
                                                className={
                                                    css.textField
                                                }></TextField>
                                            {error.errors !== null ? (
                                                error.errors.major && (
                                                    <Typography
                                                        className={
                                                            css.errorStyle
                                                        }>
                                                        {error.errors.major}
                                                    </Typography>
                                                )
                                            ) : (
                                                <></>
                                            )}

                                            <TextField
                                                disabled={isReviewed}
                                                name="phone"
                                                label="Phone"
                                                type="number"
                                                margin="none"
                                                variant="outlined"
                                                error={
                                                    error.errors?.phone
                                                        ? true
                                                        : false
                                                }
                                                value={participant.phone}
                                                onChange={handleOnChange}
                                                required
                                                fullWidth
                                                className={
                                                    css.textField
                                                }></TextField>
                                            {error.errors !== null ? (
                                                error.errors.phone && (
                                                    <Typography
                                                        className={
                                                            css.errorStyle
                                                        }>
                                                        {error.errors.phone}
                                                    </Typography>
                                                )
                                            ) : (
                                                <></>
                                            )}

                                            <MuiPickersUtilsProvider
                                                utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    disabled={isReviewed}
                                                    inputVariant="outlined"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    id="date-picker-inline-DOB"
                                                    error={
                                                        error.errors?.DOB
                                                            ? true
                                                            : false
                                                    }
                                                    label="Date of Birth"
                                                    value={participant.DOB}
                                                    onChange={(date) => {
                                                        setParticipant(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                DOB: date
                                                                    ? date
                                                                    : null
                                                            })
                                                        );
                                                    }}
                                                    KeyboardButtonProps={{
                                                        'aria-label':
                                                            'change date'
                                                    }}
                                                />
                                                {error.errors !== null ? (
                                                    error.errors.DOB && (
                                                        <Typography
                                                            className={
                                                                css.errorStyle
                                                            }>
                                                            {error.errors.DOB}
                                                        </Typography>
                                                    )
                                                ) : (
                                                    <></>
                                                )}

                                                <KeyboardDatePicker
                                                    disabled={isReviewed}
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    inputVariant="outlined"
                                                    id="date-picker-inline-expectedGraduateDate"
                                                    label="Graduation Date"
                                                    error={
                                                        error.errors
                                                            ?.expectedGraduateDate
                                                            ? true
                                                            : false
                                                    }
                                                    value={
                                                        participant.expectedGraduateDate
                                                    }
                                                    onChange={(date) => {
                                                        setParticipant(
                                                            (prevState) => ({
                                                                ...prevState,
                                                                expectedGraduateDate:
                                                                    date
                                                                        ? date
                                                                        : null
                                                            })
                                                        );
                                                    }}
                                                    KeyboardButtonProps={{
                                                        'aria-label':
                                                            'change date'
                                                    }}
                                                />
                                                {error.errors !== null ? (
                                                    error.errors
                                                        .expectedGraduateDate && (
                                                        <Typography
                                                            className={
                                                                css.errorStyle
                                                            }>
                                                            {
                                                                error.errors
                                                                    .expectedGraduateDate
                                                            }
                                                        </Typography>
                                                    )
                                                ) : (
                                                    <></>
                                                )}
                                            </MuiPickersUtilsProvider>
                                            <Button
                                                disabled={
                                                    isRegistered || isReviewed
                                                }
                                                className={css.registerButton}
                                                color="primary"
                                                variant="contained"
                                                onClick={handleOnRegister}>
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

import React, { useState, useEffect } from 'react';
import {
    Paper,
    Container,
    Typography,
    RadioGroup,
    Radio,
    FormControlLabel,
    Checkbox,
    FormGroup,
    TableContainer,
    TableCell,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TextField,
    Button,
    CircularProgress,
    FormHelperText
} from '@material-ui/core';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedback, submitFeedback } from '../../actions/participantActions';
import { useHistory, useParams } from 'react-router-dom';
import { ERROR, ERROR_CLEAR } from '../../constants';

const radioGroup = [
    { id: 1, label: 'Absolutely not' },
    { id: 2, label: '' },
    { id: 3, label: '' },
    { id: 4, label: '' },
    { id: 5, label: '' },
    { id: 6, label: '' },
    { id: 7, label: 'Extremely yes' }
];

const checkboxGroup = [
    { id: 1, label: 'Yes', value: 1 },
    { id: 2, label: 'No', value: 0 }
];

const questionGroup = [
    {
        id: 'Question1',
        name: 'question1',
        title: 'How likely are you to recommend Netcompany as a workplace to your friend/colleague?'
    },
    {
        id: 'Question2',
        name: 'question2',
        title: 'Do you find the content of the seminar helpful?'
    },
    {
        id: 'Question3',
        name: 'question3',
        title: 'What is your willingness to recommend a future NC seminar to a friend or a colleague?'
    }
];

const bulletGroup = [
    { id: 1, title: 'Presentation quality', name: 'presentationQuality' },
    { id: 2, title: 'Speaker knowledge', name: 'speakerKnowledge' }
];

const radioBulletGroup = [
    { id: 1, value: 'Very poor' },
    { id: 2, value: 'Poor' },
    { id: 3, value: 'Moderate' },
    { id: 4, value: 'Good' },
    { id: 5, value: 'Excellent' }
];

const initialState = {
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: {
        presentationQuality: null,
        speakerKnowledge: null
    },
    question6: ''
};

const initialFeedback = {
    data: null,
    isLoaded: false
};

const Feedback = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [state, setState] = useState(initialState);
    const [feedback, setFeedback] = useState(initialFeedback);
    const { code } = useParams();

    const { isLoading, isSubmittedLoading, feedbackDetail, errors } =
        useSelector((state) => ({
            isLoading: state.participant.isLoading,
            isSubmittedLoading: state.participant.isSubmittedLoading,
            feedbackDetail: state.participant.feedback,
            errors: state.error.errors
        }));

    // UseEffect to check review status and load the event detail from history
    useEffect(() => {
        if (feedbackDetail) {
            setFeedback((prevState) => ({
                ...prevState,
                data: feedbackDetail,
                isLoaded: !prevState.isLoaded
            }));
        }
    }, [feedbackDetail]);

    useEffect(() => {
        if (!feedback.data && !isLoading) {
            dispatch(getFeedback(code));
        }
    }, [dispatch, code, isLoading, feedback.data]);

    useEffect(() => {
        if (feedback.isLoaded && !feedback.data?.urlCode) {
            history.push('/404');
        }
    }, [dispatch, feedback.isLoaded, feedback.data?.urlCode, history]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeBullet = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            question5: {
                ...prevState.question5,
                [name]: value
            }
        }));
    };

    const handleSubmitFeedback = () => {
        if (handleValidateFeedback()) {
            return;
        }

        const submitDetail = {
            question: [
                {
                    title: '#1',
                    value: parseInt(state.question1)
                },
                {
                    title: '#2',
                    value: parseInt(state.question2)
                },
                {
                    title: '#3',
                    value: parseInt(state.question3)
                },
                {
                    title: '#4',
                    value: parseInt(state.question4)
                },
                {
                    title: '#5',
                    value: {
                        presentationQuality:
                            state.question5.presentationQuality,
                        speakerKnowledge: state.question5.speakerKnowledge
                    }
                },
                {
                    title: '#6',
                    value: state.question6
                }
            ],
            urlCode: code
        };

        dispatch(submitFeedback(submitDetail));

        //clear error after submit
        dispatch({
            type: ERROR_CLEAR,
            payload: null
        });
    };

    const handleValidateFeedback = () => {
        let listErrors = {};
        if (!state.question1) {
            listErrors = {
                ...listErrors,
                question1: 'Required*'
            };
        }
        if (!state.question2) {
            listErrors = {
                ...listErrors,
                question2: 'Required*'
            };
        }
        if (!state.question3) {
            listErrors = {
                ...listErrors,
                question3: 'Required*'
            };
        }
        if (!state.question4) {
            listErrors = {
                ...listErrors,
                question4: 'Required*'
            };
        }
        if (
            !state.question5.presentationQuality ||
            !state.question5.speakerKnowledge
        ) {
            listErrors = {
                ...listErrors,
                question5: 'Required*'
            };
        }
        if (!state.question6) {
            listErrors = {
                ...listErrors,
                question6: 'Required*'
            };
        }

        if (Object.keys(listErrors).length !== 0) {
            dispatch({
                type: ERROR,
                payload: listErrors
            });
            return true;
        }
        return false;
    };

    return isLoading ? (
        <div className={css.main}>
            <div className={css.circularProgress} align="center">
                <CircularProgress color="primary" />
            </div>
        </div>
    ) : feedback.data?.urlCode ? (
        <>
            <div className={css.main}>
                {feedback.data?.isCompleted ? (
                    <Container
                        className={css.wrapper}
                        maxWidth="md"
                        disableGutters>
                        <Paper className={css.paper}>
                            <Typography variant="h4">
                                You are submitted!
                            </Typography>
                            <div style={{ marginTop: 16 }}>
                                <Typography variant="body1">
                                    Thank you for your feedback!
                                </Typography>
                            </div>
                        </Paper>
                    </Container>
                ) : (
                    <Container
                        className={css.wrapper}
                        maxWidth="md"
                        disableGutters>
                        {/* Header feedback */}
                        <Paper className={css.paper}>
                            <Typography variant="h4">Feedback Form</Typography>
                            <div style={{ marginTop: 16 }}>
                                <Typography variant="body1">
                                    Để cải thiện và mang đến chất lượng cho các
                                    event. Netcompany thực hiện khảo sát ý kiến
                                    của người dùng về chất lượng và hiệu quả của
                                    sự kiện vừa được tổ chức. Mong sẽ nhận được
                                    nhiều ý kiến hay và hữu ích để có thể đem
                                    tới các sự kiện tương lai kết quả tốt đẹp
                                    hơn.
                                </Typography>
                            </div>
                            <div style={{ marginTop: 16 }}>
                                <Typography color="secondary" variant="body1">
                                    * Required
                                </Typography>
                            </div>
                        </Paper>

                        {/* Radio button question */}
                        <Paper className={css.paper}>
                            {questionGroup.map((question, index) => {
                                const questionIndex = `${index}-${question.id}`;
                                const questionState =
                                    question.name === 'question1'
                                        ? state.question1
                                        : question.name === 'question2'
                                        ? state.question2
                                        : question.name === 'question3' &&
                                          state.question3;
                                return (
                                    <div
                                        className={css.radioFormGroup}
                                        key={questionIndex}>
                                        <Typography variant="h6">
                                            {question.title} *{' '}
                                            <FormHelperText error>
                                                {errors
                                                    ? errors[question.name]
                                                    : ''}
                                            </FormHelperText>
                                        </Typography>
                                        <RadioGroup
                                            style={{
                                                justifyContent: 'space-between',
                                                marginTop: 16
                                            }}
                                            aria-label={question.id}
                                            name={question.name}
                                            value={questionState}
                                            onChange={handleChange}
                                            row>
                                            {radioGroup.map((radio, index) => {
                                                const radioIndex = `${index}-${question.name}`;
                                                return (
                                                    <FormControlLabel
                                                        key={radioIndex}
                                                        label={radio.label}
                                                        labelPlacement="bottom"
                                                        control={
                                                            <Radio
                                                                color="primary"
                                                                value={radio.id}
                                                                checked={
                                                                    questionState ===
                                                                    `${radio.id}`
                                                                }
                                                            />
                                                        }
                                                    />
                                                );
                                            })}
                                        </RadioGroup>
                                    </div>
                                );
                            })}
                        </Paper>

                        {/* Checkbox question */}
                        <Paper className={css.paper}>
                            <div>
                                <Typography variant="h6">
                                    Would you like us to send you upcoming
                                    events and seminar notification? *
                                    <FormHelperText error>
                                        {errors ? errors['question4'] : ''}
                                    </FormHelperText>
                                </Typography>
                                <FormGroup
                                    className={css.checkboxFormGroup}
                                    aria-label="Question4"
                                    value={state.question4}>
                                    {checkboxGroup.map((checkbox, index) => {
                                        const radioIndex = `${index}-question4`;
                                        return (
                                            <FormControlLabel
                                                key={radioIndex}
                                                label={checkbox.label}
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        name="question4"
                                                        onChange={handleChange}
                                                        value={checkbox.value}
                                                        checked={
                                                            state.question4 ===
                                                            `${checkbox.value}`
                                                        }
                                                    />
                                                }
                                            />
                                        );
                                    })}
                                </FormGroup>
                            </div>
                        </Paper>

                        {/* Rate question */}
                        <Paper className={css.paper}>
                            <div>
                                <Typography variant="h6">
                                    Please rate the following as you see fit on
                                    the seminar: *
                                </Typography>
                                <FormHelperText error>
                                    {errors ? errors['question5'] : ''}
                                </FormHelperText>
                                <TableContainer>
                                    <Table
                                        className={css.table}
                                        aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell align="center">
                                                    Very poor
                                                </TableCell>
                                                <TableCell align="center">
                                                    Poor
                                                </TableCell>
                                                <TableCell align="center">
                                                    Moderate
                                                </TableCell>
                                                <TableCell align="center">
                                                    Good
                                                </TableCell>
                                                <TableCell align="center">
                                                    Excellent
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bulletGroup.map((row, index) => {
                                                const bulletKey = `${index}-question5`;
                                                return (
                                                    <TableRow key={bulletKey}>
                                                        <TableCell
                                                            component="th"
                                                            scope="row">
                                                            {row.title}
                                                        </TableCell>
                                                        {radioBulletGroup.map(
                                                            (cell) => {
                                                                const bulletCellKey = `cell-${cell.id}`;
                                                                const checked =
                                                                    row.name ===
                                                                    'presentationQuality'
                                                                        ? state
                                                                              .question5
                                                                              .presentationQuality
                                                                        : state
                                                                              .question5
                                                                              .speakerKnowledge;

                                                                return (
                                                                    <TableCell
                                                                        key={
                                                                            bulletCellKey
                                                                        }
                                                                        align="center">
                                                                        <Radio
                                                                            name={
                                                                                row.name
                                                                            }
                                                                            color="primary"
                                                                            onChange={
                                                                                handleChangeBullet
                                                                            }
                                                                            value={
                                                                                cell.value
                                                                            }
                                                                            checked={
                                                                                checked ===
                                                                                `${cell.value}`
                                                                            }
                                                                        />
                                                                    </TableCell>
                                                                );
                                                            }
                                                        )}
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Paper>

                        {/* Free text question */}
                        <Paper className={css.paper}>
                            <div>
                                <Typography variant="h6">
                                    Please provide any suggestions to help us
                                    improve the quality of future event. *
                                    <FormHelperText error>
                                        {errors ? errors['question6'] : ''}
                                    </FormHelperText>
                                </Typography>
                                <TextField
                                    className={css.mt8}
                                    fullWidth
                                    label="Your answer"
                                    type="text"
                                    color="primary"
                                    name="question6"
                                    onChange={handleChange}
                                />
                            </div>
                        </Paper>

                        <Button
                            disabled={isSubmittedLoading}
                            className={css.submitButton}
                            onClick={handleSubmitFeedback}
                            variant="contained"
                            color="primary">
                            {isSubmittedLoading ? (
                                <CircularProgress size={22} color="inherit" />
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </Container>
                )}
            </div>
        </>
    ) : null;
};

export default Feedback;

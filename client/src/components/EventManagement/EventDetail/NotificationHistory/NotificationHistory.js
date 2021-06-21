import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationHistoryByEventCode } from '../../../../actions/notificationHistoryActions';
import {
    CircularProgress,
    Dialog,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Collapse,
    Box,
    Toolbar,
    Button
} from '@material-ui/core';
import moment from 'moment';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useStyles from './styles';
import SendNotification from '../SendNotification/SendNotification';
import { ContentState, convertFromHTML, Editor, EditorState } from 'draft-js';
import SystemNotification from '../../../Notification/Notification';

const CollapseRow = ({ notification }) => {
    const [open, setOpen] = useState(false);
    const css = useStyles();

    const blocksFromHTML = convertFromHTML(notification.description);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
    );
    const editorState = EditorState.createWithContent(state);

    return (
        <>
            <TableRow>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell className={css.tableText} component="th" scope="row">
                    {notification.title}
                </TableCell>
                <TableCell className={css.tableText} align="left">
                    {moment(notification.createdAt).calendar()}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={css.colapseWrapper} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={5}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div">
                                {notification.title}
                            </Typography>
                            <Editor editorState={editorState} readOnly={true} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

const initialState = {
    openSendNotificationSnackbar: false,
    openSendNotificationDialog: false
};

const NotificationHistory = ({
    eventCode,
    eventName,
    eventId,
    tabs,
    isReviewer
}) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const { sendEmailSuccess } = useSelector((state) => ({
        sendEmailSuccess: state.event.sendNotiSuccess
    }));

    // Use Effect to get notification history by urlCode from Creator
    useEffect(() => {
        if (eventCode && tabs === 3) {
            dispatch(getNotificationHistoryByEventCode(eventCode));
        }
    }, [dispatch, eventCode, tabs]);

    // Use Effect to get notification history by urlCode from Reviewer
    useEffect(() => {
        if (eventCode && tabs === 2 && isReviewer) {
            dispatch(getNotificationHistoryByEventCode(eventCode));
        }
    }, [dispatch, eventCode, tabs, isReviewer]);

    // Use Effect popup send notification snackbar and update new notfication history
    useEffect(() => {
        if (sendEmailSuccess) {
            dispatch(getNotificationHistoryByEventCode(eventCode));
            setState((prevState) => ({
                ...prevState,
                openSendNotificationSnackbar: sendEmailSuccess
            }));
        }
        setState((prevState) => ({
            ...prevState,
            openSendNotificationSnackbar: sendEmailSuccess
        }));
    }, [dispatch, sendEmailSuccess, eventCode]);

    const { isLoading, notifications } = useSelector((state) => ({
        isLoading: state.notificationHistory.isLoading,
        notifications: state.notificationHistory.notificationHistories
    }));

    const handleToggleSendNotificationDialog = () => {
        setState((prevState) => ({
            ...prevState,
            openSendNotificationDialog: !prevState.openSendNotificationDialog
        }));
    };

    return (
        <>
            {isLoading ? (
                <div className={css.contentWrapper} align="center">
                    <CircularProgress color="primary" />
                </div>
            ) : notifications.length === 0 ? (
                <>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '50vh' }}>
                        <Typography align="center">
                            There is no history for email. Would you like to
                            send new?
                        </Typography>
                        <Button
                            fullWidth
                            onClick={handleToggleSendNotificationDialog}
                            disabled={isLoading}
                            className={css.sendEmailButton}
                            variant="contained"
                            color="primary"
                            size="small">
                            Send Email
                        </Button>
                    </Grid>
                </>
            ) : (
                <>
                    <Paper elevation={0} className={css.paper}>
                        <Grid container direction="column">
                            <Toolbar>
                                <Typography
                                    className={css.title}
                                    style={{ fontWeight: 'bold' }}
                                    align="left"
                                    variant="h4">
                                    Email Notifications
                                </Typography>
                                <Button
                                    fullWidth
                                    onClick={handleToggleSendNotificationDialog}
                                    disabled={isLoading}
                                    className={css.sendEmailButton}
                                    variant="contained"
                                    color="primary">
                                    Send Email
                                </Button>
                            </Toolbar>

                            <TableContainer>
                                <Table
                                    className={css.table}
                                    aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                className={css.tableText}
                                                align="left">
                                                Title
                                            </TableCell>
                                            <TableCell
                                                className={css.tableText}
                                                align="left">
                                                Created At
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {notifications.map((notification) => (
                                            <CollapseRow
                                                notification={notification}
                                                key={notification._id}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Paper>
                </>
            )}
            {/* Event Update Dialog */}
            <Dialog
                fullWidth
                maxWidth="lg"
                open={state.openSendNotificationDialog}
                onClose={handleToggleSendNotificationDialog}
                aria-labelledby="max-width-dialog-title">
                <SendNotification
                    eventId={eventId}
                    eventName={eventName}
                    onClose={handleToggleSendNotificationDialog}
                />
            </Dialog>

            {/* Notification */}
            <SystemNotification
                openSendSnackBar={state.openSendNotificationSnackbar}
            />
        </>
    );
};

export default NotificationHistory;

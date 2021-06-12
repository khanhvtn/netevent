import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationHistoryByEventCode } from '../../../../actions/notificationHistoryActions';
import {
    AppBar,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import moment from 'moment'
import useStyles from './styles'



const NotificationHistory = ({ eventCode, tabs }) => {
    const css = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (eventCode && tabs === 4) {
            dispatch(getNotificationHistoryByEventCode(eventCode))
        }
    }, [dispatch, eventCode, tabs])

    const { isLoading, notifications } = useSelector((state) => ({
        isLoading: state.notificationHistory.isLoading,
        notifications: state.notificationHistory.notificationHistories
    }))

    console.log("Notification: ", notifications)

    return (
        <>
            {isLoading ?
                <div className={css.contentWrapper} align="center">
                    <CircularProgress color="primary" />
                </div>
                :
                notifications.length === 0
                    ?
                    <>
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: '50vh' }}
                        >
                            <Typography>No data matched</Typography>
                        </Grid>
                    </>
                    :
                    <>
                        <Paper elevation={0} className={css.paper} elevation={0}>
                            <Grid container direction="column">
                                <Typography style={{ fontWeight: 'bold' }} align="flex-start" variant="h4">
                                    Activities
                                </Typography>
                                <TableContainer>
                                    <Table className={css.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={css.tableText} align="left">Title</TableCell>
                                                <TableCell className={css.tableText} align="left">Description</TableCell>
                                                <TableCell className={css.tableText} align="left">Created At</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {notifications.map((notification) => (
                                                <TableRow key={notification._id}>
                                                    <TableCell className={css.tableText} component="th" scope="row">
                                                        {notification.title}
                                                    </TableCell>
                                                    <TableCell className={css.tableText} align="left">
                                                        {notification.description}
                                                    </TableCell>
                                                    <TableCell className={css.tableText} align="left">
                                                        {moment(notification.createdAt).startOf('day').fromNow()}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Paper>
                    </>
            }
        </>
    )
}

export default NotificationHistory;
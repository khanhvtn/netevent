import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTasks } from '../../actions/taskActions';
import { CircularProgress, Typography, Paper, Grid, Box, Divider } from '@material-ui/core';
import moment from 'moment'
import useStyles from './styles'

const MemberTask = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { userId, tasks, isLoading } = useSelector((state) => ({
        userId: state.user.user.id,
        tasks: state.task.tasks,
        isLoading: state.task.isLoading
    }))

    useEffect(() => {
        dispatch(getTasks(userId))
    }, [dispatch])

    console.log(tasks)

    return (
        isLoading ?
            <div className={css.circularProgress} align="center">
                <CircularProgress color="primary" />
            </div>
            :
            
            tasks.map((task, index) => {
                return (
                    <Box key={task.startDate} className={css.paper} color="inherit" elevation={3}>
                        {/* Grid view of Event */}
                        {/* Event Header */}
                        <Typography
                            className={css.title}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            {moment(task.eventId?.startDate).format('LL')}
                        </Typography>
                        <Box border={0.1}>
                            <Grid container>
                                <Grid xs={2} container item>
                                    <Grid alignItems="center" justify="center" container item>
                                        <Typography
                                            className={css.title}
                                            variant="body2"
                                            component="div"
                                        >
                                            {task.eventId?.urlCode}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid xs={10} justify="center" direction="column" container item>
                                    <Box borderLeft={0.1}>
                                        <Grid alignItems="center" justify="center" container item>
                                            <Typography
                                                className={css.title}
                                                variant="h6"
                                                component="div"
                                            >
                                                {task.eventId?.eventName}
                                            </Typography>
                                        </Grid>
                                        <Grid direction="column" container item>
                                            <Typography
                                                className={css.title}
                                                variant="h6"
                                                component="div"
                                            >
                                                Task title: {task.name}
                                            </Typography>
                                            <Typography
                                                className={css.title}
                                                variant="h6"
                                                component="div"
                                            >
                                                Task type: {task.type}
                                            </Typography>
                                            <Typography
                                                className={css.title}
                                                variant="h6"
                                                component="div"
                                            >
                                                Start time: {moment(task.startDate).format('LT')}
                                            </Typography>
                                            <Typography
                                                className={css.title}
                                                variant="h6"
                                                component="div"
                                            >
                                                End time: {moment(task.endDate).format('LT')}
                                            </Typography>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                )
            })
    );
}

export default MemberTask;
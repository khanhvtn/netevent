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
                            {moment(task.startDate).format('LL')}
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
                                            {task.code}
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
                                                {task.eventName}
                                            </Typography>
                                        </Grid>
                                        {task.tasks.map((block) => {
                                            return (
                                                <div key={block._id}>

                                                    <Grid direction="column" container item>
                                                        <Typography
                                                            className={css.title}
                                                            variant="h6"
                                                            component="div"
                                                        >
                                                            Task title: {block.name}
                                                        </Typography>
                                                        <Typography
                                                            className={css.title}
                                                            variant="h6"
                                                            component="div"
                                                        >
                                                            Task type: {block.type}
                                                        </Typography>
                                                        <Typography
                                                            className={css.title}
                                                            variant="h6"
                                                            component="div"
                                                        >
                                                            Start time: {moment(block.startDate).format('LT')}
                                                        </Typography>
                                                        <Typography
                                                            className={css.title}
                                                            variant="h6"
                                                            component="div"
                                                        >
                                                            End time: {moment(block.endDate).format('LT')}
                                                        </Typography>
                                                    </Grid>
                                                </div>
                                            )
                                        })
                                        }
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
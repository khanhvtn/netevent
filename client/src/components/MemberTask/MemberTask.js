import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByEvent } from '../../actions/taskActions';
import {
    CircularProgress,
    Typography,
    Paper,
    Grid,
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    TableContainer,
    Table,
    Toolbar,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core';
import moment from 'moment';
import useStyles from './styles';

const MemberTask = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const { userId, tasks, isLoading } = useSelector((state) => ({
        userId: state.user.user.id,
        tasks: state.task.tasksByEvent,
        isLoading: state.task.isLoading
    }));

    useEffect(() => {
        dispatch(getTasksByEvent(userId));
    }, [dispatch, userId]);

    return isLoading ? (
        <div className={css.circularProgress} align="center">
            <CircularProgress color="primary" />
        </div>
    ) : tasks.length === 0 ? (
        <div className={css.noTask} align="center">
            <Typography className={css.title} align="left" variant="caption">
                Currently, there is no task assigned to you!
            </Typography>
        </div>
    ) : (
        <Paper className={css.paper} color="inherit" elevation={0}>
            <Grid container alignItems="center" direction="column">
                {tasks?.filter((task) => new Date() <= new Date(task.startDate))
                    .length !== 0 ? (
                    <Toolbar>
                        <Typography
                            className={css.title}
                            style={{ fontWeight: 'bold' }}
                            align="left"
                            variant="h4">
                            Incoming task
                        </Typography>
                    </Toolbar>
                ) : null}
            </Grid>
            <Grid>
                {tasks
                    ?.filter((task) => new Date() <= new Date(task.startDate))
                    .map((task, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Typography
                                    className={css.title}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div">
                                    {moment(task.startDate).format('LL')}
                                </Typography>

                                {/* Grid view of Event */}
                                {/* Event Header */}
                                <Accordion
                                    style={{ margin: '8px 0 16px' }}
                                    key={task.startDate}
                                    expanded={
                                        expanded ===
                                        `task-panel${task.startDate}`
                                    }
                                    onChange={handleChange(
                                        `task-panel${task.startDate}`
                                    )}>
                                    <AccordionSummary
                                        aria-controls="panel1d-content"
                                        id="panel1d-header">
                                        <Typography>
                                            {task.eventName}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer>
                                            <Table
                                                className={css.table}
                                                aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className={
                                                                css.tableText
                                                            }
                                                            align="left">
                                                            Task Name
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                css.tableText
                                                            }
                                                            align="left">
                                                            Type
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                css.tableText
                                                            }
                                                            align="left">
                                                            Start Date
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                css.tableText
                                                            }
                                                            align="left">
                                                            End Date
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                {task.tasks?.map((block) => {
                                                    return (
                                                        <TableBody
                                                            key={block._id}>
                                                            <TableRow>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }
                                                                    component="th"
                                                                    scope="row">
                                                                    {block.name}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }
                                                                    align="left">
                                                                    {block.type}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }>
                                                                    {moment(
                                                                        block.startDate
                                                                    ).format(
                                                                        'llll'
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }>
                                                                    {moment(
                                                                        block.endDate
                                                                    ).format(
                                                                        'llll'
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    );
                                                })}
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            </React.Fragment>
                        );
                    })}
            </Grid>
            <Grid
                container
                style={{ marginTop: 64 }}
                alignItems="center"
                direction="column">
                {tasks?.filter((task) => new Date() > new Date(task.startDate))
                    .length !== 0 ? (
                    <Toolbar>
                        <Typography
                            className={css.title}
                            style={{ fontWeight: 'bold' }}
                            align="left"
                            variant="h4">
                            Finish task
                        </Typography>
                    </Toolbar>
                ) : null}
            </Grid>
            <Grid>
                {tasks
                    ?.filter((task) => new Date() > new Date(task.startDate))
                    .map((task, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Typography
                                    className={css.title}
                                    variant="h6"
                                    id="tableTitle"
                                    component="div">
                                    {moment(task.startDate).format('LL')}
                                </Typography>

                                {/* Grid view of Event */}
                                {/* Event Header */}
                                <Accordion
                                    style={{ margin: '8px 0 16px' }}
                                    key={task.startDate}
                                    expanded={
                                        expanded ===
                                        `task-panel${task.startDate}`
                                    }
                                    onChange={handleChange(
                                        `task-panel${task.startDate}`
                                    )}>
                                    <AccordionSummary
                                        aria-controls="panel1d-content"
                                        id="panel1d-header">
                                        <Typography>
                                            {task.eventName}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer>
                                            <Table
                                                className={css.table}
                                                aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            className={
                                                                css.tableText
                                                            }
                                                            align="left">
                                                            Task Name
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                css.tableText
                                                            }
                                                            align="left">
                                                            Type
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                css.tableText
                                                            }
                                                            align="left">
                                                            Start Date
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                css.tableText
                                                            }
                                                            align="left">
                                                            End Date
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                {task.tasks?.map((block) => {
                                                    return (
                                                        <TableBody
                                                            key={block._id}>
                                                            <TableRow>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }
                                                                    component="th"
                                                                    scope="row">
                                                                    {block.name}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }
                                                                    align="left">
                                                                    {block.type}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }>
                                                                    {moment(
                                                                        block.startDate
                                                                    ).format(
                                                                        'llll'
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    className={
                                                                        css.tableText
                                                                    }>
                                                                    {moment(
                                                                        block.endDate
                                                                    ).format(
                                                                        'llll'
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    );
                                                })}
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            </React.Fragment>
                        );
                    })}
            </Grid>
        </Paper>
    );
};

export default MemberTask;

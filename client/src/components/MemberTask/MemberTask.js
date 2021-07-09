import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksByEvent } from '../../actions/taskActions';
import {
    CircularProgress,
    Typography,
    Paper,
    Grid,
    Button,
    Divider,
    ListItem,
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    TableContainer,
    Table,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core';
import moment from 'moment';
import useStyles from './styles';
import TaskPagination from './TaskPagination/TaskPagination';

const initialState = {
    take: 5,
    page: 1
};

const MemberTask = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const [expanded, setExpanded] = useState(false);

    const { userId, tasks, totalPages, isLoading } = useSelector((state) => ({
        userId: state.user.user.id,
        tasks: state.task.tasksByEvent,
        totalPages: state.task.totalPages,
        isLoading: state.task.isLoading
    }));

    useEffect(() => {
        dispatch(
            getTasksByEvent({
                take: state.take,
                page: state.page,
                userId: userId
            })
        );
    }, [dispatch, userId, state.take, state.page]);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleChangePage = (event, newPage) => {
        setState((prevState) => ({ ...prevState, page: newPage }));
    };

    const handleChangeRowsPerPage = (event) => {
        setState((prevState) => ({
            ...prevState,
            take: parseInt(event.target.value),
            page: 1
        }));
    };

    return isLoading ? (
        <div className={css.circularProgress} align="center">
            <CircularProgress color="primary" />
        </div>
    ) : (
        <Paper className={css.paper} color="inherit" elevation={0}>
            {tasks.length === 0 ? (
                <div className={css.noTask} align="center">
                    <Typography
                        className={css.title}
                        align="left"
                        variant="caption">
                        Currently, there is no task assigned to you!
                    </Typography>
                </div>
            ) : (
                <Grid container direction="row">
                    <Grid xs={12} md={8} container item direction="column">
                        <Typography
                            className={css.title}
                            style={{ fontWeight: 'bold' }}
                            align="center"
                            variant="h4">
                            Incoming task
                        </Typography>

                        {tasks.map((task, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Typography
                                        className={css.title}
                                        variant="h6"
                                        id="tableTitle"
                                        component="div">
                                        {moment(task.endDate).format('LL')}
                                    </Typography>

                                    {/* Grid view of Event */}
                                    {/* Event Header */}
                                    <Accordion
                                        className={css.accordianStyle}
                                        key={task._id}
                                        expanded={
                                            expanded === `task-panel${task._id}`
                                        }
                                        onChange={handleChange(
                                            `task-panel${task._id}`
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
                                                    {task.taskListId?.map(
                                                        (block) => {
                                                            return (
                                                                <TableBody
                                                                    key={
                                                                        block._id
                                                                    }>
                                                                    <TableRow>
                                                                        <TableCell
                                                                            className={
                                                                                css.tableText
                                                                            }
                                                                            component="th"
                                                                            scope="row">
                                                                            {
                                                                                block.name
                                                                            }
                                                                        </TableCell>
                                                                        <TableCell
                                                                            className={
                                                                                css.tableText
                                                                            }
                                                                            align="left">
                                                                            {
                                                                                block.type
                                                                            }
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
                                                        }
                                                    )}
                                                </Table>
                                            </TableContainer>
                                        </AccordionDetails>
                                    </Accordion>
                                </React.Fragment>
                            );
                        })}

                        {/* Event Pagination */}
                        <TaskPagination
                            totalPages={totalPages}
                            page={state.page}
                            take={state.take}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            handleChangePage={handleChangePage}
                        />
                    </Grid>
                    <Grid xs={12} md={4} container item direction="column">
                        <Paper
                            className={css.filterBox}
                            color="inherit"
                            elevation={1}>
                            <Typography
                                style={{ fontWeight: 'bold', padding: 16 }}
                                align="center"
                                variant="h6">
                                Filter Task
                            </Typography>
                            <Divider />
                            <ListItem
                                disableGutters
                                className={css.sidebarListItem}
                                style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <Button
                                    style={{
                                        textTransform: 'none',
                                        fontWeight: 'medium',
                                        justifyContent: 'flex-start',
                                        letterSpacing: 0,
                                        padding: 12
                                    }}
                                    fullWidth>
                                    <span>Incoming Task</span>
                                </Button>
                            </ListItem>
                            <Divider />
                            <ListItem
                                disableGutters
                                className={css.sidebarListItem}
                                style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <Button
                                    style={{
                                        textTransform: 'none',
                                        fontWeight: 'medium',
                                        justifyContent: 'flex-start',
                                        letterSpacing: 0,
                                        padding: 12
                                    }}
                                    fullWidth>
                                    <span>Assigned Task</span>
                                </Button>
                            </ListItem>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Paper>
    );
};

export default MemberTask;

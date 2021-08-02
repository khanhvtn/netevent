import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Toolbar,
    Paper,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Checkbox,
    TableHead,
    TableSortLabel,
    Typography,
    Button,
    Chip,
    CircularProgress,
    IconButton,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import { useSelector } from 'react-redux';

//import makeStyles in the last
import useStyles from './styles';
import { Skeleton } from '@material-ui/lab';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Full name'
    },
    {
        id: 'school',
        numeric: false,
        disablePadding: false,
        label: 'University'
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email'
    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: false,
        label: 'Phone'
    },
    {
        id: 'other',
        numeric: false,
        disablePadding: false,
        label: 'Other'
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status'
    }
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        reviewerMode
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {!reviewerMode && (
                    <TableCell TableCell padding="checkbox">
                        <Checkbox
                            size="small"
                            color="primary"
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                        />
                    </TableCell>
                )}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            style={{ fontWeight: 'bold' }}
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc'
                                        ? 'sorted descending'
                                        : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.primary.dark
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark
              },
    title: {
        flex: '1 1 100%',
        fontWeight: 'bold'
    },
    normalText: {
        textTransform: 'none'
    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        checkInMode,
        reviewerMode,
        numSelected,
        handleSetInvalid,
        handleSetVerified,
        handleSetAttended,
        handleToggleDialogInvitation,
        eventDetail,
        isLoading
    } = props;

    return reviewerMode ? (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0
            })}>
            <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div">
                {checkInMode
                    ? 'List of check-in participants'
                    : 'List of participants'}
            </Typography>
        </Toolbar>
    ) : (
        <>
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: numSelected > 0
                })}>
                {numSelected > 0 ? (
                    <Typography
                        className={classes.title}
                        color="inherit"
                        variant="subtitle1"
                        component="div">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        className={classes.title}
                        variant="h6"
                        id="tableTitle"
                        component="div">
                        {checkInMode
                            ? 'List of check-in participants'
                            : 'List of participants'}
                    </Typography>
                )}

                {checkInMode ? (
                    numSelected > 0 && (
                        <>
                            <Button
                                className={classes.normalText}
                                disabled={isLoading}
                                onClick={() => handleSetAttended(false)}
                                endIcon={<CloseOutlinedIcon />}
                                style={{ marginLeft: '8px' }}
                                variant="contained"
                                color="secondary">
                                {isLoading ? (
                                    <CircularProgress
                                        size={26}
                                        color="inherit"
                                    />
                                ) : (
                                    'Absent'
                                )}
                            </Button>
                            <Button
                                className={classes.normalText}
                                disabled={isLoading}
                                onClick={() => handleSetAttended(true)}
                                endIcon={<VerifiedUserOutlinedIcon />}
                                style={{ marginLeft: '8px' }}
                                variant="contained"
                                color="primary">
                                {isLoading ? (
                                    <CircularProgress
                                        size={26}
                                        color="inherit"
                                    />
                                ) : (
                                    'Attend'
                                )}
                            </Button>
                        </>
                    )
                ) : numSelected > 0 ? (
                    <>
                        <Button
                            className={classes.normalText}
                            disabled={isLoading}
                            onClick={handleSetInvalid}
                            endIcon={<CloseOutlinedIcon />}
                            variant="contained"
                            color="secondary">
                            {isLoading ? (
                                <CircularProgress size={26} color="inherit" />
                            ) : (
                                'Invalid'
                            )}
                        </Button>
                        <Button
                            className={classes.normalText}
                            disabled={isLoading}
                            onClick={handleSetVerified}
                            endIcon={<VerifiedUserOutlinedIcon />}
                            style={{ marginLeft: '8px' }}
                            variant="contained"
                            color="primary">
                            {isLoading ? (
                                <CircularProgress size={26} color="inherit" />
                            ) : (
                                'Verify'
                            )}
                        </Button>
                    </>
                ) : (
                    !eventDetail.isFinished &&
                    eventDetail.isApproved && (
                        <Button
                            className={classes.normalText}
                            disabled={isLoading}
                            onClick={handleToggleDialogInvitation}
                            endIcon={<MailOutlineOutlinedIcon />}
                            style={{ marginLeft: '8px' }}
                            variant="contained"
                            color="primary">
                            {isLoading ? (
                                <CircularProgress size={26} color="inherit" />
                            ) : (
                                'Invitation'
                            )}
                        </Button>
                    )
                )}
            </Toolbar>
        </>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

const ParticipantTable = ({
    checkInMode,
    reviewerMode,
    take,
    selected,
    setSelected,
    handleSetInvalid,
    handleSetVerified,
    handleSetAttended,
    handleToggleDialogInvitation,
    handleToggleDialogReviewParticipant
}) => {
    const css = useStyles();

    const { participants, isLoading, eventDetail } = useSelector((state) => ({
        participants: state.participant.participants,
        isLoading: state.participant.isLoading,
        eventDetail: state.event.eventDetail
    }));

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = participants.map(
                (participant) => participant._id
            );
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, _id) => {
        if (!reviewerMode) {
            const selectedIndex = selected.indexOf(_id);
            let newSelected = [];

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, _id);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1)
                );
            }

            setSelected(newSelected);
        }
    };

    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    const emptyRows = take - participants.length;

    return (
        <Paper className={css.paper1} elevation={0}>
            <EnhancedTableToolbar
                reviewerMode={reviewerMode}
                checkInMode={checkInMode}
                numSelected={selected.length}
                handleSetInvalid={handleSetInvalid}
                handleSetVerified={handleSetVerified}
                handleSetAttended={handleSetAttended}
                handleToggleDialogInvitation={handleToggleDialogInvitation}
                eventDetail={eventDetail}
                isLoading={isLoading}
            />
            <TableContainer>
                <Table
                    className={css.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label="enhanced table">
                    <EnhancedTableHead
                        reviewerMode={reviewerMode}
                        classes={css}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={participants.length}
                    />
                    <TableBody>
                        {isLoading ? (
                            <>
                                {Array.apply(null, { length: take + 1 }).map(
                                    (row, index) => {
                                        return (
                                            <TableRow key={`${index}-skeleton`}>
                                                {!reviewerMode && (
                                                    <TableCell>
                                                        <Skeleton />
                                                    </TableCell>
                                                )}
                                                {headCells.map((row, index) => {
                                                    return (
                                                        <TableCell
                                                            key={`${index}-skeleton-row`}>
                                                            <Skeleton />
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    }
                                )}
                            </>
                        ) : participants.length === 0 ? (
                            <>
                                <TableRow
                                    key={'NoDataMatched'}
                                    style={{
                                        height: 50 * take
                                    }}>
                                    <TableCell
                                        key="noData"
                                        colSpan={headCells.length + 1}
                                        align="center">
                                        <Typography>No Data Matched</Typography>
                                    </TableCell>
                                </TableRow>
                            </>
                        ) : (
                            <>
                                {stableSort(
                                    participants,
                                    getComparator(order, orderBy)
                                ).map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(event, row._id)
                                            }
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            classes={{ selected: css.selected }}
                                            selected={isItemSelected}>
                                            {!reviewerMode && (
                                                <TableCell
                                                    key="checkbox"
                                                    padding="checkbox">
                                                    <Checkbox
                                                        size="small"
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby':
                                                                labelId
                                                        }}
                                                    />
                                                </TableCell>
                                            )}
                                            <TableCell
                                                key="name"
                                                component="th"
                                                scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                key="school"
                                                component="th"
                                                scope="row">
                                                {row.school}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row">
                                                <div
                                                    className={
                                                        css.textContainer
                                                    }>
                                                    {row.email}
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                key="phone"
                                                component="th"
                                                scope="row">
                                                {row.phone}
                                            </TableCell>
                                            <TableCell
                                                key="more-detail"
                                                component="th"
                                                scope="row">
                                                <Tooltip title="More Detail">
                                                    <IconButton
                                                        onClick={(e) =>
                                                            handleToggleDialogReviewParticipant(
                                                                e,
                                                                row
                                                            )
                                                        }
                                                        size="small">
                                                        <AccountCircleIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell
                                                key="status"
                                                component="th"
                                                scope="row">
                                                {checkInMode ? (
                                                    <>
                                                        {row.isAttended ? (
                                                            <Chip
                                                                className={
                                                                    css.fixedWidthChip
                                                                }
                                                                size="small"
                                                                label="Checked"
                                                                style={{
                                                                    backgroundColor:
                                                                        '#4caf50'
                                                                }}
                                                                color="primary"
                                                            />
                                                        ) : (
                                                            <Chip
                                                                className={
                                                                    css.fixedWidthChip
                                                                }
                                                                size="small"
                                                                label="Verified"
                                                                color="primary"
                                                            />
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {row.isValid ===
                                                        null ? (
                                                            <Chip
                                                                className={
                                                                    css.fixedWidthChip
                                                                }
                                                                size="small"
                                                                label="Pending"
                                                                color="default"
                                                            />
                                                        ) : row.isValid ? (
                                                            <Chip
                                                                className={
                                                                    css.fixedWidthChip
                                                                }
                                                                size="small"
                                                                label="Verified"
                                                                color="primary"
                                                            />
                                                        ) : (
                                                            <Chip
                                                                className={
                                                                    css.fixedWidthChip
                                                                }
                                                                size="small"
                                                                label="Invalid"
                                                                color="secondary"
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        key={'emptyRowKey'}
                                        style={{
                                            height: 50 * emptyRows
                                        }}>
                                        <TableCell
                                            key="empty"
                                            component="th"
                                            scope="row"
                                            colSpan={headCells.length + 1}
                                        />
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ParticipantTable;

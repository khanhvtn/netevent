import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment'
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
} from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';

import { useSelector } from 'react-redux';

//import makeStyles in the last
import useStyles from './styles';
import { Skeleton } from '@material-ui/lab';

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
        label: 'Full name',
    },
    {
        id: 'school',
        numeric: false,
        disablePadding: false,
        label: 'University',
    },
    {
        id: 'major',
        numeric: false,
        disablePadding: false,
        label: 'Major',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'phone',
        numeric: false,
        disablePadding: false,
        label: 'Phone',
    },
    {
        id: 'dob',
        numeric: false,
        disablePadding: false,
        label: 'DOB',
    },
    {
        id: 'academic',
        numeric: false,
        disablePadding: false,
        label: 'Academic',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
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
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            style={{ fontWeight: 'bold' }}
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
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
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
        fontWeight: 'bold'
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        numSelected,
        handleSetInvalid,
        handleSetVerified,
        isLoading
    } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography
                        className={classes.title}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        List of participants
                    </Typography>
                )}

            {numSelected > 0  &&
                <>
                    <Button
                        disabled={isLoading}
                        onClick={handleSetInvalid}
                        variant="contained"
                        color="secondary"
                    >
                        {isLoading ? <CircularProgress size={26} color="inherit" /> : 'Invalid'}

                    </Button>
                    <Button
                        disabled={isLoading}
                        onClick={handleSetVerified}
                        style={{ marginLeft: '8px' }}
                        variant="contained"
                        color="primary"
                    >
                        {isLoading ? <CircularProgress size={26} color="inherit" /> : 'Verify'}
                    </Button>
                </>
            }
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const ParticipantTable = ({
    take,
    selected,
    setSelected,
    handleSetInvalid,
    handleSetVerified,
}) => {
    const css = useStyles();

    const {
        participants,
        isLoading,
    } = useSelector((state) => ({
        participants: state.participant.participants,
        isLoading: state.participant.isLoading
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
            const newSelecteds = participants.map((participant) => participant._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, _id) => {
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
    };

    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    const emptyRows = take - participants.length;



    return (
        <Paper className={css.paper1} elevation={0}>
            <EnhancedTableToolbar
                numSelected={selected.length}
                handleSetInvalid={handleSetInvalid}
                handleSetVerified={handleSetVerified}
                isLoading={isLoading}
            />
            <TableContainer>
                <Table
                    className={css.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={css}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={participants.length}
                    />
                    <TableBody>
                        {isLoading ?
                            <>
                                {Array.apply(null, { length: take + 1 }).map((row, index) => {
                                    return (
                                        <>
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Skeleton />
                                                </TableCell>
                                                {headCells.map((row, index) => {
                                                    return (
                                                        <TableCell key={index}>
                                                            <Skeleton />
                                                        </TableCell>
                                                    )
                                                })}
                                            </TableRow>
                                        </>
                                    )
                                })}
                            </>
                            : participants.length === 0 ?
                                <>
                                    <TableRow
                                        style={{
                                            height: 50 * take,
                                        }}
                                    >
                                        <TableCell colSpan={headCells.length + 1} align="center">
                                            <Typography>No Data Matched</Typography>
                                        </TableCell>
                                    </TableRow>
                                </>
                                :
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
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell>
                                                    {row.school}
                                                </TableCell>
                                                <TableCell>
                                                    {row.major}
                                                </TableCell>
                                                <TableCell>
                                                    <div className={css.textContainer}>
                                                        {row.email}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {row.phone}
                                                </TableCell>
                                                <TableCell>
                                                    {moment(row.DOB).format('L')}
                                                </TableCell>
                                                <TableCell>
                                                    {row.academic}
                                                </TableCell>
                                                <TableCell>
                                                    {row.isValid === null ?
                                                        <Chip
                                                            className={css.fixedWidthChip}
                                                            size="small"
                                                            label="Pending"
                                                            color="default"
                                                        />
                                                        : row.isValid
                                                            ?
                                                            <Chip
                                                                className={css.fixedWidthChip}
                                                                size="small"
                                                                label="Verified"
                                                                color="primary"
                                                            />
                                                            :
                                                            <Chip
                                                                className={css.fixedWidthChip}
                                                                size="small"
                                                                label="Invalid"
                                                                color="secondary"
                                                            />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: 50 * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={headCells.length + 1} />
                                        </TableRow>
                                    )}
                                </>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ParticipantTable;
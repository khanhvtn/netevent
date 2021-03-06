import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
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
    Tooltip,
    Button,
    Chip
} from '@material-ui/core';
import { Delete, Create, Edit } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email'
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        label: 'Role'
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status'
    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'Created At'
    },
    {
        id: 'updatedAt',
        numeric: false,
        disablePadding: false,
        label: 'Updated At'
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
        onRequestSort
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
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
        numSelected,
        handleToggleDialogCreateAndUpdate,
        handleToggleDialogDelete
    } = props;

    return (
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
                    List of Users
                </Typography>
            )}

            {numSelected === 0 ? (
                <Tooltip title="Create User">
                    <Button
                        className={classes.normalText}
                        onClick={handleToggleDialogCreateAndUpdate}
                        endIcon={<Create />}
                        variant="contained"
                        color="primary">
                        Create
                    </Button>
                </Tooltip>
            ) : numSelected === 1 ? (
                <>
                    <Button
                        className={classes.normalText}
                        onClick={handleToggleDialogDelete}
                        endIcon={<Delete />}
                        variant="contained"
                        color="secondary">
                        Delete
                    </Button>
                    <Button
                        className={classes.normalText}
                        style={{
                            marginLeft: 8
                        }}
                        onClick={(e) =>
                            handleToggleDialogCreateAndUpdate(e, 'edit')
                        }
                        endIcon={<Edit />}
                        variant="contained"
                        color="primary">
                        Edit
                    </Button>
                </>
            ) : (
                <Button
                    className={classes.normalText}
                    onClick={handleToggleDialogDelete}
                    endIcon={<Delete />}
                    variant="contained"
                    color="secondary">
                    Delete
                </Button>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired
};

const UserTable = ({
    handleToggleDialogCreateAndUpdate,
    handleToggleDialogDelete,
    take,
    selected,
    setSelected
}) => {
    const css = useStyles();
    const { users, isLoading, isCreated, isDeleted, isUpdated } = useSelector(
        (state) => ({
            users: state.user.users,
            isLoading: state.user.isLoading,
            isCreated: state.user.isCreated,
            isDeleted: state.user.isDeleted,
            isUpdated: state.user.isUpdated
        })
    );

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => n.email);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, email) => {
        const selectedIndex = selected.indexOf(email);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, email);
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

    const isSelected = (email) => selected.indexOf(email) !== -1;

    const emptyRows = take - users.length;
    return (
        <Paper className={css.paper1} elevation={0}>
            <EnhancedTableToolbar
                handleToggleDialogCreateAndUpdate={
                    handleToggleDialogCreateAndUpdate
                }
                handleToggleDialogDelete={handleToggleDialogDelete}
                numSelected={selected.length}
            />
            <TableContainer>
                <Table
                    className={css.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label="enhanced table">
                    <EnhancedTableHead
                        classes={css}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={users.length}
                    />
                    <TableBody>
                        {isLoading || isCreated || isUpdated || isDeleted ? (
                            <>
                                {Array.apply(null, { length: take + 1 }).map(
                                    (row, index) => {
                                        return (
                                            <TableRow key={`skeleton-${index}`}>
                                                <TableCell>
                                                    <Skeleton />
                                                </TableCell>
                                                {headCells.map(
                                                    (cell, index) => {
                                                        return (
                                                            <TableCell
                                                                key={index + 1}>
                                                                <Skeleton />
                                                            </TableCell>
                                                        );
                                                    }
                                                )}
                                            </TableRow>
                                        );
                                    }
                                )}
                            </>
                        ) : users.length === 0 ? (
                            <>
                                <TableRow
                                    style={{
                                        height: 50 * take
                                    }}>
                                    <TableCell colSpan={7} align="center">
                                        <Typography>No Data Matched</Typography>
                                    </TableCell>
                                </TableRow>
                            </>
                        ) : (
                            <>
                                {stableSort(
                                    users,
                                    getComparator(order, orderBy)
                                ).map((row, index) => {
                                    const isItemSelected = isSelected(
                                        row.email
                                    );
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(event, row.email)
                                            }
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            classes={{ selected: css.selected }}
                                            selected={isItemSelected}>
                                            <TableCell padding="checkbox">
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
                                            <TableCell
                                                component="th"
                                                scope="row">
                                                {row.email}
                                            </TableCell>
                                            <TableCell>
                                                {row.role.map((eachRole) =>
                                                    eachRole === '1'
                                                        ? 'Admin '
                                                        : eachRole === '2'
                                                        ? 'Reviewer '
                                                        : eachRole === '3'
                                                        ? 'Creator '
                                                        : 'Team Member'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {row.isConfirmed ? (
                                                    <Chip
                                                        className={
                                                            css.fixedWidthChip
                                                        }
                                                        size="small"
                                                        label="Active"
                                                        color="primary"
                                                    />
                                                ) : (
                                                    <Chip
                                                        className={
                                                            css.fixedWidthChip
                                                        }
                                                        size="small"
                                                        label="Pending"
                                                        color="default"
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {moment(row.createdAt).format(
                                                    'LL'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {moment(row.updatedAt).format(
                                                    'LL'
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 50 * emptyRows
                                        }}>
                                        <TableCell colSpan={6} />
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

export default UserTable;

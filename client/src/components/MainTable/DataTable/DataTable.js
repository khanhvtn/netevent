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
    Button,
} from '@material-ui/core';
import { Delete, DeleteForever, Create, Edit } from '@material-ui/icons';
import { lighten, makeStyles } from '@material-ui/core/styles';

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

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headCells,
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
        fontWeight: 'bold',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        numSelected,
        handleToggleDialogCreateAndUpdate,
        handleToggleDialogDelete,
        tableName,
        disabled,
        constrainRangeDate,
        recoveryMode,
        setIsRecoveryMode,
        isRecoveryMode,
        handleRecovery,
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
                    {tableName}
                </Typography>
            )}

            {numSelected === 0 ? (
                <>
                    {recoveryMode && (
                        <Button
                            disabled={
                                constrainRangeDate === undefined ||
                                disabled === undefined
                                    ? false
                                    : !constrainRangeDate
                                    ? true
                                    : disabled
                                    ? true
                                    : false
                            }
                            onClick={() =>
                                setIsRecoveryMode((prevState) => !prevState)
                            }
                            endIcon={!isRecoveryMode && <Delete />}
                            variant="contained"
                            color={isRecoveryMode ? 'default' : 'secondary'}
                        >
                            {isRecoveryMode ? 'Close' : 'Recycle'}
                        </Button>
                    )}

                    {!isRecoveryMode && (
                        <Button
                            disabled={
                                constrainRangeDate === undefined ||
                                disabled === undefined
                                    ? false
                                    : !constrainRangeDate
                                    ? true
                                    : disabled
                                    ? true
                                    : false
                            }
                            style={{ marginLeft: '20px' }}
                            onClick={handleToggleDialogCreateAndUpdate}
                            endIcon={<Create />}
                            variant="contained"
                            color="primary"
                        >
                            Create
                        </Button>
                    )}
                </>
            ) : numSelected === 1 ? (
                <>
                    {isRecoveryMode && (
                        <>
                            <Button
                                onClick={handleToggleDialogDelete}
                                endIcon={<DeleteForever />}
                                variant="contained"
                                color="secondary"
                            >
                                Delete
                            </Button>
                            <Button
                                style={{ marginLeft: '8px' }}
                                onClick={handleRecovery}
                                variant="contained"
                                color="primary"
                            >
                                Recover
                            </Button>
                        </>
                    )}
                    {!isRecoveryMode && (
                        <Button
                            onClick={handleToggleDialogDelete}
                            endIcon={<DeleteForever />}
                            variant="contained"
                            color="secondary"
                        >
                            Delete
                        </Button>
                    )}
                    {!isRecoveryMode && (
                        <Button
                            onClick={(e) =>
                                handleToggleDialogCreateAndUpdate(e, 'edit')
                            }
                            style={{ marginLeft: '8px' }}
                            endIcon={<Edit />}
                            variant="contained"
                            color="primary"
                        >
                            Edit
                        </Button>
                    )}
                </>
            ) : isRecoveryMode ? (
                <>
                    <Button
                        onClick={handleToggleDialogDelete}
                        endIcon={<DeleteForever />}
                        variant="contained"
                        color="secondary"
                    >
                        Delete
                    </Button>
                    <Button
                        style={{ marginLeft: '8px' }}
                        onClick={handleRecovery}
                        variant="contained"
                        color="primary"
                    >
                        Recover
                    </Button>
                </>
            ) : (
                <Button
                    onClick={handleToggleDialogDelete}
                    endIcon={<Delete />}
                    variant="contained"
                    color="secondary"
                >
                    Delete
                </Button>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const DataTable = ({
    handleToggleDialogCreateAndUpdate,
    handleToggleDialogDelete,
    take,
    selected,
    setSelected,
    data,
    isLoading,
    createSuccess,
    deleteSuccess,
    updateSuccess,
    headCells,
    tableName,
    disabled,
    constrainRangeDate,
    recoveryMode,
    handleRecovery,
    isRecoveryMode,
    setIsRecoveryMode,
}) => {
    const css = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const dataFilter = data;
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = dataFilter.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = take - dataFilter.length;
    return (
        <Paper className={css.paper1} elevation={0}>
            <EnhancedTableToolbar
                setIsRecoveryMode={setIsRecoveryMode}
                handleToggleDialogCreateAndUpdate={
                    handleToggleDialogCreateAndUpdate
                }
                handleToggleDialogDelete={handleToggleDialogDelete}
                numSelected={selected.length}
                tableName={tableName}
                disabled={disabled}
                constrainRangeDate={constrainRangeDate}
                recoveryMode={recoveryMode}
                isRecoveryMode={isRecoveryMode}
                handleRecovery={handleRecovery}
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
                        rowCount={dataFilter.length}
                        headCells={headCells}
                    />
                    <TableBody>
                        {isLoading ||
                        createSuccess ||
                        updateSuccess ||
                        deleteSuccess ? (
                            <>
                                {Array.apply(null, { length: take + 1 }).map(
                                    (row, index) => {
                                        return (
                                            <>
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Skeleton />
                                                    </TableCell>
                                                    {headCells.map(
                                                        (row, index) => {
                                                            return (
                                                                <TableCell
                                                                    key={index}
                                                                >
                                                                    <Skeleton />
                                                                </TableCell>
                                                            );
                                                        }
                                                    )}
                                                </TableRow>
                                            </>
                                        );
                                    }
                                )}
                            </>
                        ) : dataFilter.length === 0 ? (
                            <>
                                <TableRow
                                    style={{
                                        height: 50 * take,
                                    }}
                                >
                                    <TableCell
                                        colSpan={headCells.length + 1}
                                        align="center"
                                    >
                                        <Typography>No Data</Typography>
                                    </TableCell>
                                </TableRow>
                            </>
                        ) : (
                            <>
                                {stableSort(
                                    dataFilter,
                                    getComparator(order, orderBy)
                                ).map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) =>
                                                handleClick(event, row.name)
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
                                                        'aria-labelledby':
                                                            labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            {headCells.map((cell, index) => {
                                                if (
                                                    cell.id === 'createdAt' ||
                                                    cell.id === 'updatedAt' ||
                                                    cell.id.includes('Date') ||
                                                    cell.id.includes('Time')
                                                ) {
                                                    return (
                                                        <TableCell key={index}>
                                                            {moment(
                                                                row[cell.id]
                                                            ).format('LL')}
                                                        </TableCell>
                                                    );
                                                }
                                                return (
                                                    <TableCell key={index}>
                                                        {row[cell.id]}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 50 * emptyRows,
                                        }}
                                    >
                                        <TableCell
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

export default DataTable;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Paper,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    TableSortLabel,
    Typography
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

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
    const { classes, order, orderBy, onRequestSort, headCells } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
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

const FacilityHistoryTable = ({
    take,
    data,
    isLoading,
    headCells,
    selectedFacility
}) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const css = useStyles();
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const emptyRows = take - data.length;
    return (
        <Paper className={css.paper1} elevation={0}>
            <Typography
                className={css.title}
                variant="h6"
                id="tableTitle"
                component="div">
                List of Facility Usage Histories
            </Typography>
            <Chip
                label={`Name: ` + selectedFacility.name}
                className={css.selectedFacility}
            />
            <Chip
                label={`Code: ` + selectedFacility.code}
                className={css.selectedFacility}
            />
            <Chip
                label={`Type: ` + selectedFacility.type}
                className={css.selectedFacility}
            />

            <TableContainer>
                <Table
                    className={css.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label="enhanced table">
                    <EnhancedTableHead
                        classes={css}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                        headCells={headCells}
                    />
                    <TableBody>
                        {isLoading ? (
                            // ||
                            // createSuccess ||
                            // updateSuccess ||
                            // deleteSuccess
                            <>
                                {Array.apply(null, { length: take + 1 }).map(
                                    (row, index) => {
                                        return (
                                            <>
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Skeleton />
                                                    </TableCell>
                                                    {headCells.map(() => {
                                                        return (
                                                            <TableCell
                                                                key={index}>
                                                                <Skeleton />
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            </>
                                        );
                                    }
                                )}
                            </>
                        ) : data.length === 0 ? (
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
                                    data,
                                    getComparator(order, orderBy)
                                ).map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row._id}>
                                            <TableCell
                                                component="th"
                                                scope="row">
                                                {row.eventId.eventName}
                                            </TableCell>

                                            <TableCell>
                                                {moment(row.borrowDate).format(
                                                    'LL'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {moment(row.returnDate).format(
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
                                        <TableCell colSpan={7} />
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

export default FacilityHistoryTable;

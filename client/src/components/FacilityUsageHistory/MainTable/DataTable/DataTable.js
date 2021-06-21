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
import { useHistory } from 'react-router-dom'

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
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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



const DataTable = ({

  take,
  data,
  isLoading,
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
  const history = useHistory();
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleGoToHistory = (id, row) => {
    history.push({
      pathname: `/dashboard/usage/${id}`,
      state: { data: row }
    })
  }



  const emptyRows = take - dataFilter.length;
  return (
    <Paper className={css.paper1} elevation={0}>
      <Typography
        className={css.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        List of Facilities
                </Typography>
      <TableContainer>
        <Table
          className={css.table}
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={css}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={dataFilter.length}
            headCells={headCells}
          />
          <TableBody>
            {isLoading ? (
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
                          );
                        })}
                      </TableRow>
                    </>
                  );
                })}
              </>
            ) : dataFilter.length === 0 ? (
              <>
                <TableRow
                  style={{
                    height: 50 * take,
                  }}
                >
                  <TableCell colSpan={headCells.length + 1} align="center">
                    <Typography>No Data</Typography>
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                {stableSort(dataFilter, getComparator(order, orderBy)).map(
                  (row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                        onClick={() => handleGoToHistory(row._id, row)}
                      >

                        {headCells.map((cell, index) => {
                          if (
                            cell.id === 'createdAt' ||
                            cell.id === 'updatedAt' ||
                            cell.id.includes('Date') ||
                            cell.id.includes('Time')
                          ) {
                            return (
                              <TableCell key={index}>
                                {moment(row[cell.id]).format('LL')}
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell key={index}>{row[cell.id]}</TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  }
                )}
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
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper >
  );
};

export default DataTable;

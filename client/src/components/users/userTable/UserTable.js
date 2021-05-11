import React, { useEffect, useState } from "react";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

//Timestamp converting
import Moment from 'react-moment';
import 'moment-timezone';

//CSS makeStyles at the last
import { CircularProgress, Grid, Table, Typography } from "@material-ui/core";
import useStyles from './styles'
import UserTableToolbar from "./UserTableToolbar";
import UserTableHead from "./UserTableHead";

//Descend Sorting
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
  return order === "desc"
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


const UserTable = ({ userData, loading }) => {
  const css = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("role");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user) => user.email);
      setSelected(newSelecteds);
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


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;


  useEffect(() => {
    if (userData) {
      setUsers(userData);
    }
  }, [userData])

  return (
    <>
      {loading ? (
        <Grid container justify="center" alignItems="center">
          <CircularProgress
            style={{
              height: '100%',
              margin: '10%'
            }}
          />
        </Grid>
      ) :
        users.length === 0 ?
          <Grid container justify="center" alignItems="center">
            <Typography color="textSecondary" style={{
              height: '100%',
              margin: '10%'
            }}>
              Cannot found users.
            </Typography>
          </Grid>
          :
          <Paper className={css.paper}>
            <UserTableToolbar
              setSelected={setSelected}
              numSelected={selected.length}
              selected={selected}
              users={users}
            />
            <TableContainer>
              <Table
                className={css.table}
                aria-labelledby="tableTitle"
                size='medium'
                aria-label="enhanced table"
              >
                <UserTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={users.length}
                />
                <TableBody>
                  {stableSort(users, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user, index) => {

                      const isItemSelected = isSelected(user.email);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, user.email)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {user.email}
                          </TableCell>
                          <TableCell>
                            {user.role.map((eachRole) => (
                              <>{eachRole === "1" ? "Admin " : eachRole === "2" ? "Reviewer " : eachRole === "3" ? "Creator " : "Team Member"}</>
                            ))}

                          </TableCell>
                          <TableCell>
                            <Moment format="DD/MM/YYYY" className={css.moment} >{user.createdAt}</Moment>
                          </TableCell>
                          <TableCell>
                            <Moment format="DD/MM/YYYY" className={css.moment}>{user.updatedAt}</Moment>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
      }
    </>
  );
}

export default UserTable;
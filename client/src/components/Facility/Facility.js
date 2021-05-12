import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Paper,
    AppBar,
    Toolbar,
    InputBase,
    IconButton,
    Grid,
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
    CircularProgress,
    Button,
    Select,
    MenuItem,
    TableFooter,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Collapse,
    DialogContentText,
    Slide,
    Snackbar,
    Drawer,
    InputLabel,
    FormControl,
} from '@material-ui/core';
import { Pagination, Alert } from '@material-ui/lab';
import { FilterList, Delete, Create, Edit } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
    getFacilities,
    createFacility,
    deleteFacilities,
    updateFacility,
} from '../../actions/facilityActions';
import { useDispatch, useSelector } from 'react-redux';

//import makeStyles in the last
import useStyles from './styles';
import { ERROR_CLEAR } from '../../constants';

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
        label: 'Name',
    },
    {
        id: 'code',
        numeric: false,
        disablePadding: false,
        label: 'Code',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
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
        paddingRight: theme.spacing(1),
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
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {
        numSelected,
        handleToggleDialogCreateAndUpdate,
        handleToggleDialogDelete,
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
                    Facility List
                </Typography>
            )}

            {numSelected === 0 ? (
                <Tooltip title="Create Facility">
                    <Button
                        onClick={handleToggleDialogCreateAndUpdate}
                        endIcon={<Create />}
                        variant="contained"
                        color="primary"
                    >
                        Create
                    </Button>
                </Tooltip>
            ) : numSelected === 1 ? (
                <>
                    <Button
                        onClick={handleToggleDialogDelete}
                        endIcon={<Delete />}
                        variant="contained"
                        color="secondary"
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={(e) =>
                            handleToggleDialogCreateAndUpdate(e, 'edit')
                        }
                        style={{ marginLeft: '20px' }}
                        endIcon={<Edit />}
                        variant="contained"
                        color="primary"
                    >
                        Edit
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
    search: '',
    take: 5,
    page: 1,
    openCreateAndUpdateDialog: false,
    name: '',
    code: '',
    type: '',
    openAlert: false,
    openDeleteDialog: false,
    openDeleteSnackBar: false,
    openUpdateSnackBar: false,
    isCreateMode: true,
    openFilter: false,
    status: '',
};

const filterState = {
    statusFilter: '',
};

const Facility = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const {
        facilities,
        isLoading,
        totalPages,
        errors,
        createSuccess,
        deleteSuccess,
        updateSuccess,
    } = useSelector((state) => ({
        facilities: state.facility.facilities,
        isLoading: state.facility.isLoading,
        totalPages: state.facility.totalPages,
        errors: state.error.errors,
        createSuccess: state.facility.createSuccess,
        deleteSuccess: state.facility.deleteSuccess,
        updateSuccess: state.facility.updateSuccess,
    }));

    const [state, setState] = useState(initialState);
    const [filters, setFilters] = useState(filterState);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);

    //refreshTable func is to reload all data
    const refreshTable = () => {
        setState((prevState) => ({
            ...prevState,
            search: '',
            take: 5,
            page: 1,
        }));
    };
    //useEffect for update sucess.
    useEffect(() => {
        //clear all fields in form creating and toggle Snackbar
        setState((prevState) => ({
            ...prevState,
            openUpdateSnackBar: updateSuccess,
            openCreateAndUpdateDialog: false,
            isCreateMode: true,
            name: '',
            code: '',
            type: '',
        }));
        //clear selected item
        setSelected(() => []);

        //refresh table
        refreshTable();
    }, [updateSuccess]);
    //useEffect for delete sucess.
    useEffect(() => {
        //toggle Snackbar
        setState((prevState) => ({
            ...prevState,
            openDeleteSnackBar: deleteSuccess,
            openDeleteDialog: false,
        }));
        //clear selected item
        setSelected(() => []);
        //refresh Table
        refreshTable();
    }, [deleteSuccess]);

    //useEffect for enable alert success and clear form for form creating.
    useEffect(() => {
        //clear all fields in form creating and toggle Snackbar
        setState((prevState) => ({
            ...prevState,
            openAlert: createSuccess,
            name: '',
            code: '',
            type: '',
        }));
        //refresh Table
        refreshTable();
    }, [createSuccess]);

    //useEffect
    useEffect(() => {
        dispatch(
            getFacilities(state.search, state.take, state.page, state.status)
        );
        return () => {
            dispatch({
                type: ERROR_CLEAR,
                payload: null,
            });
        };
    }, [dispatch, state.search, state.take, state.page, state.status]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'search' || name === 'take') {
            return setState((prevState) => ({
                ...prevState,
                [name]: value,
                page: 1,
            }));
        }
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = facilities.map((n) => n.name);
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
        setState((prevState) => ({ ...prevState, page: newPage }));
    };

    const handleChangeRowsPerPage = (event) => {
        setState((prevState) => ({
            ...prevState,
            take: parseInt(event.target.value),
            page: 1,
        }));
    };

    const handleCreateAndUpdate = () => {
        const { name, code, type } = state;
        //create
        if (state.isCreateMode) {
            const userReq = {
                name,
                code,
                type,
            };
            dispatch(createFacility(userReq));
            return;
        }
        //edit
        dispatch(
            updateFacility({
                filter: selected[0],
                update: { name, code, type },
            })
        );
    };

    const handleDelete = () => {
        dispatch(
            deleteFacilities({
                deleteList: selected,
            })
        );
    };

    const handleToggleDialogCreateAndUpdate = (event, mode) => {
        let targetEdit;
        console.log(mode);
        if (mode) {
            targetEdit = facilities.find(
                (facility) => facility.name === selected[0]
            );
        }
        setState((prevState) => ({
            ...prevState,
            name: mode ? targetEdit.name : prevState.name,
            code: mode ? targetEdit.code : prevState.code,
            type: mode ? targetEdit.type : prevState.type,
            openCreateAndUpdateDialog: !prevState.openCreateAndUpdateDialog,
            isCreateMode: mode ? false : true,
        }));
    };

    const handleToggleDialogDelete = () => {
        setState((prevState) => ({
            ...prevState,
            openDeleteDialog: !prevState.openDeleteDialog,
        }));
    };

    //handle ToggleFilter
    const handleToggleFilter = () => {
        setState((prevState) => ({
            ...prevState,
            openFilter: !prevState.openFilter,
        }));
    };

    //handle Apply Filter
    const handleApplyFilter = () => {
        setState((prevState) => ({
            ...prevState,
            status: filters.statusFilter,
            openFilter: !prevState.openFilter,
        }));
    };

    //handle Clear Filter
    const handleClearFilter = () => {
        setFilters((prevState) => ({
            ...prevState,
            statusFilter: '',
        }));
        setState((prevState) => ({
            ...prevState,
            status: '',
            openFilter: !prevState.openFilter,
        }));
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = state.take - facilities.length;

    return (
        <div className={css.grow}>
            <Paper className={css.paper} color="inherit">
                <div className={css.grow}>
                    <AppBar position="static" color="default">
                        <Grid container direction="column">
                            <Toolbar>
                                <div className={css.search}>
                                    <div className={css.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        onChange={handleChange}
                                        className={css.inputInput}
                                        placeholder="Search by name, code, type"
                                        name="search"
                                        value={state.search}
                                        inputProps={{
                                            'aria-label': 'search',
                                        }}
                                    />
                                </div>
                                <div className={css.grow} />
                                <IconButton
                                    color="inherit"
                                    onClick={handleToggleFilter}
                                >
                                    <FilterList />
                                </IconButton>
                            </Toolbar>
                            {/* Table */}
                            <Paper className={css.paper1} elevation={0}>
                                <EnhancedTableToolbar
                                    handleToggleDialogCreateAndUpdate={
                                        handleToggleDialogCreateAndUpdate
                                    }
                                    handleToggleDialogDelete={
                                        handleToggleDialogDelete
                                    }
                                    numSelected={selected.length}
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
                                            onSelectAllClick={
                                                handleSelectAllClick
                                            }
                                            onRequestSort={handleRequestSort}
                                            rowCount={facilities.length}
                                        />
                                        <TableBody>
                                            {isLoading ? (
                                                <TableRow
                                                    style={{
                                                        height: 50 * state.take,
                                                    }}
                                                >
                                                    <TableCell
                                                        colSpan={5}
                                                        align="center"
                                                    >
                                                        <CircularProgress />
                                                    </TableCell>
                                                </TableRow>
                                            ) : facilities.length === 0 ? (
                                                <TableRow
                                                    style={{
                                                        height: 50 * state.take,
                                                    }}
                                                >
                                                    <TableCell
                                                        colSpan={5}
                                                        align="center"
                                                    >
                                                        <Typography>
                                                            No Data Matched
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                stableSort(
                                                    facilities,
                                                    getComparator(
                                                        order,
                                                        orderBy
                                                    )
                                                ).map((row, index) => {
                                                    const isItemSelected = isSelected(
                                                        row.name
                                                    );
                                                    const labelId = `enhanced-table-checkbox-${index}`;

                                                    return (
                                                        <TableRow
                                                            hover
                                                            onClick={(event) =>
                                                                handleClick(
                                                                    event,
                                                                    row.name
                                                                )
                                                            }
                                                            role="checkbox"
                                                            aria-checked={
                                                                isItemSelected
                                                            }
                                                            tabIndex={-1}
                                                            key={row.name}
                                                            selected={
                                                                isItemSelected
                                                            }
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    checked={
                                                                        isItemSelected
                                                                    }
                                                                    inputProps={{
                                                                        'aria-labelledby': labelId,
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                {row.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.code}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.type}
                                                            </TableCell>
                                                            <TableCell>
                                                                {row.status
                                                                    ? 'Active'
                                                                    : 'Expired'}
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })
                                            )}
                                            {emptyRows > 0 && (
                                                <TableRow
                                                    style={{
                                                        height: 50 * emptyRows,
                                                    }}
                                                >
                                                    <TableCell colSpan={6} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                    <TableFooter></TableFooter>
                                </TableContainer>
                            </Paper>
                            <div className={css.paginationWrapper}>
                                <div className={css.selectRowNumWrapper}>
                                    <Typography>Rows per page: </Typography>
                                    <Select
                                        labelId="takeFilterLabel"
                                        id="takeFiler"
                                        className={css.selectRowNum}
                                        variant="standard"
                                        value={state.take}
                                        name="take"
                                        onChange={handleChangeRowsPerPage}
                                    >
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={25}>25</MenuItem>
                                    </Select>
                                </div>
                                <div>
                                    <Pagination
                                        page={state.page}
                                        shape="rounded"
                                        variant="text"
                                        count={parseInt(totalPages)}
                                        color="primary"
                                        className={css.pagination}
                                        onChange={handleChangePage}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </AppBar>
                </div>
            </Paper>

            {/* Dialog Create and Update */}
            <Dialog
                TransitionComponent={Transition}
                maxWidth="sm"
                open={state.openCreateAndUpdateDialog}
                onClose={handleToggleDialogCreateAndUpdate}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {state.isCreateMode
                        ? 'Create New Facility'
                        : 'Update a Facility'}
                </DialogTitle>
                <DialogContent>
                    <Collapse in={state.openAlert} className={css.textField}>
                        <Alert severity="success">
                            Create New Facility Success!
                        </Alert>
                    </Collapse>
                    <TextField
                        disabled={isLoading || createSuccess ? true : false}
                        className={css.textField}
                        helperText={errors?.name ? errors?.name : ''}
                        error={errors?.name ? true : false}
                        variant="outlined"
                        onChange={handleChange}
                        id="name"
                        value={state.name}
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        disabled={isLoading || createSuccess ? true : false}
                        className={css.textField}
                        helperText={errors?.code ? errors?.code : ''}
                        error={errors?.code ? true : false}
                        variant="outlined"
                        onChange={handleChange}
                        id="code"
                        value={state.code}
                        name="code"
                        label="Code"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        disabled={isLoading || createSuccess ? true : false}
                        className={css.textField}
                        helperText={errors?.type ? errors?.type : ''}
                        error={errors?.type ? true : false}
                        variant="outlined"
                        onChange={handleChange}
                        id="type"
                        value={state.type}
                        name="type"
                        label="Type"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions className={css.dialogActions}>
                    <Button
                        disabled={isLoading || createSuccess ? true : false}
                        variant="contained"
                        onClick={handleToggleDialogCreateAndUpdate}
                        color="default"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading || createSuccess ? true : false}
                        variant="contained"
                        onClick={handleCreateAndUpdate}
                        color="primary"
                    >
                        {isLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : state.isCreateMode ? (
                            'Create'
                        ) : (
                            'Update'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog Confirm Delete */}
            <Dialog
                TransitionComponent={Transition}
                open={state.openDeleteDialog}
                onClose={handleToggleDialogDelete}
                aria-labelledby="delete-dialog"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog">{'Warning!!!'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure with your action ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={isLoading ? true : false}
                        variant="contained"
                        onClick={handleDelete}
                        color="secondary"
                    >
                        {isLoading ? (
                            <CircularProgress size={25} color="inherit" />
                        ) : (
                            'Delete'
                        )}
                    </Button>
                    <Button
                        disabled={isLoading ? true : false}
                        variant="outlined"
                        onClick={handleToggleDialogDelete}
                        color="default"
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Snackbar Delete Success */}
            <Snackbar
                TransitionComponent={Slide}
                open={state.openDeleteSnackBar}
            >
                <Alert severity="success">Delete Sucess</Alert>
            </Snackbar>
            {/* Snackbar Update Success */}
            <Snackbar
                TransitionComponent={Slide}
                open={state.openUpdateSnackBar}
            >
                <Alert severity="success">Update Sucess</Alert>
            </Snackbar>

            {/* Filter Sidebar */}

            <Drawer
                anchor="right"
                open={state.openFilter}
                onClose={handleToggleFilter}
            >
                <div className={css.filterWrapper}>
                    <Typography variant="h6">Filter List</Typography>
                    <div className={css.filterInputs}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="statusFilterLabel">
                                Status
                            </InputLabel>
                            <Select
                                labelId="statusFilterLabel"
                                id="statusFiler"
                                value={filters.statusFilter}
                                onChange={handleFilterChange}
                                label="Status"
                                inputProps={{
                                    name: 'statusFilter',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>Expired</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={css.filterActions}>
                        <Button
                            onClick={handleClearFilter}
                            variant="contained"
                            color="default"
                        >
                            Clear Filter
                        </Button>
                        <Button
                            onClick={handleApplyFilter}
                            variant="contained"
                            color="primary"
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Facility;

import React, { useEffect, useState } from 'react';
import {
  Paper,
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Grid,
  Tooltip,
} from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import {
  getFacilities,
  createFacility,
  deleteFacilities,
  updateFacility,
  recoveryFacilities,
} from '../../../actions/facilityActions';
import { useDispatch, useSelector } from 'react-redux';

//import makeStyles in the last
import useStyles from './styles';
import { ERROR_CLEAR } from '../../../constants';
import FacilityFilter from './FacilityFilter/FacilityFilter';
import PaginationTable from '../MainTable/PaginationTable/PaginationTable';
import DataTable from '../MainTable/DataTable/DataTable';

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
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Created At',
  },
  {
    id: 'updatedAt',
    numeric: false,
    disablePadding: false,
    label: 'Updated At',
  },
];

const initialState = {
  search: '',
  take: 10,
  page: 1,
  openCreateAndUpdateDialog: false,
  name: '',
  code: '',
  type: '',
  openAlert: false,
  isCreateMode: true,
  openFilter: false,
  createdFrom: null,
  createdTo: null,
  updatedFrom: null,
  updatedTo: null,
};

const filterState = {
  createdFrom: null,
  createdTo: null,
  updatedFrom: null,
  updatedTo: null,
};

const Facility = () => {
  const css = useStyles();
  const dispatch = useDispatch();
  const {
    facilities,
   
    totalPages,
    isLoading,
  } = useSelector((state) => ({
    facilities: state.facility.facilities,
    isLoading: state.facility.isLoading,
    totalPages: state.facility.totalPages,
    
  }));

  const [state, setState] = useState(initialState);
  const [filters, setFilters] = useState(filterState);
  const [selected, setSelected] = useState([]);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);  

  //useEffect
  useEffect(() => {
    dispatch(
      getFacilities({
        search: state.search,
        take: state.take,
        page: state.page,
        createdFrom: state.createdFrom,
        createdTo: state.createdTo,
        updatedFrom: state.updatedFrom,
        updatedTo: state.updatedTo,
        isDeleted: isRecoveryMode,
      })
    );
    //clear selected item
    setSelected(() => []);
    return () => {
      dispatch({
        type: ERROR_CLEAR,
        payload: null,
      });
    };
  }, [
    dispatch,
    state.search,
    state.take,
    state.page,
    state.createdFrom,
    state.createdTo,
    state.updatedFrom,
    state.updatedTo,
    isRecoveryMode,
  ]);

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

  
  const handleRecovery = () => {
    dispatch(
      recoveryFacilities({
        recoveryList: selected,
      })
    );
  };

  const handleToggleDialogCreateAndUpdate = (event, mode) => {
    let targetEdit;
    if (mode) {
      targetEdit = facilities.find((facility) => facility.name === selected[0]);
    }
    setState((prevState) => ({
      ...prevState,
      name: mode ? targetEdit.name : '',
      code: mode ? targetEdit.code : '',
      type: mode ? targetEdit.type : '',
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
      ...filters,
      openFilter: !prevState.openFilter,
    }));
  };

  //handle Clear Filter
  const handleClearFilter = () => {
    setFilters((prevState) => ({
      ...prevState,
      ...filterState,
    }));
    setState((prevState) => ({
      ...prevState,
      ...filterState,
      openFilter: !prevState.openFilter,
    }));
  };

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
                <Tooltip title="Filter">
                  <IconButton color="inherit" onClick={handleToggleFilter}>
                    <FilterList />
                  </IconButton>
                </Tooltip>
              </Toolbar>

              {/* Facility Table */}
              <DataTable
                isRecoveryMode={isRecoveryMode}
                setIsRecoveryMode={setIsRecoveryMode}
                handleRecovery={handleRecovery}
                recoveryMode={true}
                take={state.take}
                data={facilities}
                isLoading={isLoading}
                tableName="List of Facilities"
                headCells={headCells}
              />
              {/* Facility Pagination */}
              <PaginationTable
                page={state.page}
                take={state.take}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
                totalPages={totalPages}
              />
            </Grid>
          </AppBar>
        </div>
      </Paper>

     

      {/* Filter Sidebar */}
      <FacilityFilter
        openFilter={state.openFilter}
        handleToggleFilter={handleToggleFilter}
        handleFilterChange={handleFilterChange}
        createdFrom={filters.createdFrom}
        createdTo={filters.createdTo}
        setFilters={setFilters}
        updatedFrom={filters.updatedFrom}
        updatedTo={filters.updatedTo}
        handleApplyFilter={handleApplyFilter}
        handleClearFilter={handleClearFilter}
      />
    </div>
  );
};

export default Facility;

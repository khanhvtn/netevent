import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Snackbar from '@material-ui/core/Snackbar';

import { FACILITY_CREATE_SUCCESS, FACILITY_UPDATE_SUCCESS } from '../../constants';
import FacilityTable from '../../components/Facilities/FacilityTable/FacilityTable';
import { getFacilities, searchFacilities } from '../../actions/facilityActions'
import { Alert } from '@material-ui/lab';


const facilityInitialState = {
    isAlertSuccess: false
}

const FacilityApp = () => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const { facility } = useSelector((state) => state);
    const [facilityTableData, setFacilityTableData] = useState([]);
    const [tableRefresh, setTableRefresh] = useState(false);
    const [facilityState, setFacilityState] = useState(facilityInitialState);

    useEffect(() => {
        dispatch(getFacilities());
    }, [dispatch, tableRefresh]);

    
    useEffect(() => {
        setFacilityState((prevState) => ({ ...prevState, isAlertSuccess: facility.isCreated }))
    }, [facility.isCreated])
    
    const handleCreateSnackbarClose = () => {
        setFacilityState((prevState) => ({ ...prevState, isAlertSuccess: false }))
        //set isSuccessPurchase == false
        dispatch({ type: FACILITY_CREATE_SUCCESS, payload: false })
    }
    
    useEffect(() => {
        setFacilityState((prevState) => ({ ...prevState, isAlertSuccess: facility.isUpdated }))
    }, [facility.isUpdated])
    
    const handleUpdateSnackbarClose = () => {
        setFacilityState((prevState) => ({ ...prevState, isAlertSuccess: false }))
        //set isSuccessPurchase == false
        dispatch({ type: FACILITY_UPDATE_SUCCESS, payload: false })
    }
    
    const handleSearchFacility = (e) => {
        if (e.key === 'Enter') {
            if (searchTerm) {
                dispatch(searchFacilities(searchTerm));
            } else {
                setTableRefresh(!tableRefresh);
            }
            e.preventDefault();
        }
    };

    useEffect(() => {
        if (facility.facilities) {
            setFacilityTableData(facility.facilities);
        }
    }, [facility.facilities]);
    
    const handleChangeSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={facility.isCreated}
                autoHideDuration={3000}
                color="primary"
                className={css.snackBar}
                onClose={handleCreateSnackbarClose}
            >
                <Alert severity="success">Create facility Successful</Alert>
            </Snackbar>

            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={facility.isUpdated}
                autoHideDuration={3000}
                color="primary"
                className={css.snackBar}
                onClose={handleUpdateSnackbarClose}
            >
                <Alert severity="success">Update facility Successful</Alert>
            </Snackbar>

            <div className={css.main}>
                <Paper className={css.paper}>
                    <AppBar
                        className={css.searchBar}
                        position="static"
                        color="default"
                        elevation={0}
                    >
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <SearchIcon
                                        className={css.block}
                                        color="inherit"
                                    />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        value={searchTerm}
                                        onChange={handleChangeSearch}
                                        onKeyPress={(e) => handleSearchFacility(e)}
                                        placeholder="Search by name"
                                        InputProps={{
                                            disableUnderline: true,
                                            className: css.searchInput,
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Reload">
                                        <IconButton
                                            onClick={() =>
                                                setTableRefresh(!tableRefresh)
                                            }
                                        >
                                            <RefreshIcon
                                                className={css.block}
                                                color="inherit"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Paper elevation={0} className={css.root}>
                        <FacilityTable
                            facilityData={facilityTableData}
                            loading={facility.isLoading}
                        />
                    </Paper>
                </Paper>
            </div>
        </>
    );
}

export default FacilityApp;
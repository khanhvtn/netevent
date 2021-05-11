import React, { useState } from 'react';
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { createFacility, deleteFacility, updateFacility } from '../../../actions/facilityActions';
import UpdateFacilityDialog from './UpdateFacilityDialog/UpdateFacilityDialog';

const initialState = {
    name: '',
    code: '',
    type: ''
}

const FacilityTableToolbar = (props) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const { numSelected, selected, facilities, setSelected } = props;
    const [openDeleteFacilityDialog, setOpenDeleteFacilityDialog] = useState(false);
    const [openCreaterFacilityDialog, setOpenCreaterFacilityDialog] = useState(false);
    const [openUpdateFacilityDialog, setOpenUpdateFacilityDialog] = useState(false);
    const [facilityData, setFacilityData] = useState(initialState);

    const handleOnChangeText = (event) => {
        setFacilityData({ ...facilityData, [event.target.name]: event.target.value });
    };

    // Handle Open & Close Create Dialog
    const handleOpenCreateFacilityDialog = () => {
        setOpenCreaterFacilityDialog(true);
    };

    const handleCloseCreateFacilityDialog = () => {
        setFacilityData(initialState);
        setOpenCreaterFacilityDialog(false);
    };

    //Handle the Update button.
    const handleOpenUpdateFacilityDialog = () => {
        setOpenUpdateFacilityDialog(true)
    }

    const handleCloseUpdateFacilityDialog = () => {
        setOpenUpdateFacilityDialog(false);
    }

    const handleUpdateFacility = (id, newUpdateData) => {
        dispatch(updateFacility(id, newUpdateData));
    };

    const handleUpdateButton = (newUpdateData) => {
        facilities.forEach((facility) => {
            if (selected.indexOf(facility.name) !== -1) handleUpdateFacility(facility._id, newUpdateData);
        });
    };

    //Handle the Delete button
    const handleDeleteFacility = (id) => {
        dispatch(deleteFacility(id));
    };

    const handleDeleteButton = () => {
        facilities.forEach((facility) => {
            if (selected.indexOf(facility.name) !== -1) {
                handleDeleteFacility(facility._id)
                setSelected([])
            };
        });
    };

    const onCreateFacility = (e) => {
        e.preventDefault();
        dispatch(createFacility(facilityData))
        handleCloseCreateFacilityDialog();
    }



    return (
        <>
            <UpdateFacilityDialog
                openUpdateFacilityDialog={openUpdateFacilityDialog}
                closeUpdateFacilityDialog={handleCloseUpdateFacilityDialog}
                updateFacilityDialog={handleUpdateButton}
            />
            <Toolbar
                className={clsx(css.rootEnhanceTableToolbar, {
                    [css.highlight]: numSelected > 0,
                })}
            >
                {numSelected > 0 ?
                    <>
                        <Typography
                            className={css.title}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >
                            {numSelected} selected
                        </Typography>
                    </>
                    :
                    <>
                        <Typography
                            className={css.title}
                            variant="h4"
                            id="tableTitle"
                            component="div"
                        >
                            Facility List
                        </Typography>
                    </>
                }

                {numSelected > 0 ? numSelected === 1 ?
                    <>
                        <Tooltip title="Edit">
                            <Button
                                variant="contained"
                                color="primary"
                                className={css.editButton}
                                startIcon={<EditIcon />}
                                onClick={handleOpenUpdateFacilityDialog}
                            >
                                Edit
                            </Button>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button
                                variant="contained"
                                color="secondary"
                                className={css.deleteButton}
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteButton}
                            >
                                Delete
                            </Button>
                        </Tooltip>
                    </>
                    :
                    <Tooltip title="Delete">
                        <Button
                            variant="contained"
                            color="secondary"
                            className={css.deleteButton}
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteButton}
                        >
                            Delete
                        </Button>
                    </Tooltip>
                    :
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            className={css.addFacility}
                            onClick={handleOpenCreateFacilityDialog}
                        >
                            Add Facility
                        </Button>

                        <Dialog open={openCreaterFacilityDialog} onClose={handleCloseCreateFacilityDialog} aria-labelledby="form-dialog-title" className={css.dialogCreate} fullWidth>
                            <DialogTitle id="form-dialog-title">Facility Creation</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Fill the form to create new facility.
                                </DialogContentText>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="text"
                                    value={facilityData.name}
                                    onChange={handleOnChangeText}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="code"
                                    name="code"
                                    label="Code"
                                    type="text"
                                    value={facilityData.code}
                                    onChange={handleOnChangeText}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    id="type"
                                    name="type"
                                    label="Type"
                                    type="text"
                                    value={facilityData.type}
                                    onChange={handleOnChangeText}
                                    fullWidth
                                />

                            </DialogContent>
                            <DialogActions className={css.m2}>
                                <Button onClick={handleCloseCreateFacilityDialog} color="default">
                                    Cancel
                                </Button>
                                <Button onClick={onCreateFacility} variant="contained" color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                }
            </Toolbar>
        </>
    );
};

FacilityTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default FacilityTableToolbar;

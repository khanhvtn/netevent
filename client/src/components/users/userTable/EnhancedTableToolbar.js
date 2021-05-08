import React, { useState } from 'react';
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../actions/userActions';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import useStyles from './styles'

const EnhancedTableToolbar = (props) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const { numSelected, selected, users } = props;
    const [openDeleteUserDialog, setOpenDeleteUserDialog] = useState(false);


    const handleOpenDeleteUserDialog = () => {
        setOpenDeleteUserDialog(true)
    }

    const handleCloseDeleteUserDialog = () => {
        setOpenDeleteUserDialog(false);
    }


    //Handle the Delete button
    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id))
    };

    const handleDeleteButton = () => {
        users.forEach((user) => {
            if (selected.indexOf(user.email) !== -1) {
                handleDeleteUser(user._id)
                handleCloseDeleteUserDialog();
            };
        });
    };

    return (
        <Toolbar
            className={clsx(css.rootEnhanceTableToolbar, {
                [css.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography
                    className={css.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography
                        className={css.title}
                        variant="h4"
                        id="tableTitle"
                        component="div"
                    >
                        User List
                    </Typography>
                )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={css.button}
                            startIcon={<DeleteIcon />}
                            onClick={handleOpenDeleteUserDialog}
                        >
                            Delete
                            </Button>
                        <Dialog open={openDeleteUserDialog} onClose={handleCloseDeleteUserDialog} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title" className={css.popup} >Warning!</DialogTitle>
                            <DialogContentText id="form-dialog-title" className={css.popup1} >
                                    Are you sure to delete this user?
                            </DialogContentText>
                            <DialogActions>
                                <Button onClick={handleCloseDeleteUserDialog} fullWidth color="default" >
                                    Cancel
                            </Button>
                                <Button onClick={handleDeleteButton} fullWidth color="default">
                                    Submit
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </Tooltip>
            ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
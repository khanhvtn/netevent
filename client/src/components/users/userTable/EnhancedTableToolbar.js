import React from 'react';
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
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../actions/userActions';

const EnhancedTableToolbar = (props) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const { numSelected, selected, users } = props;

    //Handle the Delete button
    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id))
    };

    const handleDeleteButton = () => {
        users.forEach((user) => {
            if (selected.indexOf(user.email) !== -1) handleDeleteUser(user._id);
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
                    <Button
                        variant="contained"
                        color="secondary"
                        className={css.button}
                        startIcon={<DeleteIcon />}
                        onClick={handleDeleteButton}
                    >
                        Delete
                    </Button>
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
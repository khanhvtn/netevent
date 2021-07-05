import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { userLogout } from '../../../actions/userActions';
import InputIcon from '@material-ui/icons/Input';
import useStyles from './styles';
import logo from '../../../images/logo.png';
import { useDispatch } from 'react-redux';

const DashboardNavbar = ({ onMobileNavOpen, onPickRole, ...rest }) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(userLogout(history));
    };

    return (
        <div>
            <AppBar
                className={css.navbarColor}
                color="default"
                elevation={1}
                {...rest}>
                <Toolbar>
                    <div className={css.imageSize} align="center">
                        <Link to="/">
                            <img className={css.image} alt="Logo" src={logo} />
                        </Link>
                    </div>
                    <Box className={css.leftSide} />
                    {onPickRole ? (
                        <IconButton onClick={handleLogout} color="inherit">
                            <InputIcon />
                        </IconButton>
                    ) : (
                        <Hidden lgUp>
                            <IconButton
                                color="inherit"
                                onClick={() => onMobileNavOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

DashboardNavbar.propTypes = {
    onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;

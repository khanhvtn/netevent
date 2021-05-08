import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { userLogout } from '../../../actions/userActions';
import InputIcon from '@material-ui/icons/Input';
import useStyles from './styles';
import logo from '../../../images/logo.png';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
    const css = useStyles();

    const handleOpenSidebar = () => {};

    return (
        <div>
            <AppBar
                className={css.navbarColor}
                color="default"
                elevation={1}
                {...rest}
            >
                <Toolbar>
                    {/* <Hidden mdDown>
                        <div className={css.imageSize} align="center">
                            <Link to="/">
                                <img className={css.image} alt="Logo" src={logo} />
                            </Link>
                        </div>
                        <Box className={css.leftSide} />

                        <Typography>{user.email}</Typography>
                        <IconButton onClick={handleLogout} color="inherit">
                            <InputIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden lgUp>
                        <IconButton color="inherit" onClick={onMobileNavOpen}> */}
                    <div className={css.imageSize} align="center">
                        <Link to="/">
                            <img className={css.image} alt="Logo" src={logo} />
                        </Link>
                    </div>
                    <Box className={css.leftSide} />
                    <Hidden lgUp>
                        <IconButton color="inherit" onClick={onMobileNavOpen}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        </div>
    );
};

DashboardNavbar.propTypes = {
    onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;

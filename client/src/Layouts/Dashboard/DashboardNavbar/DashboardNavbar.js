import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
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
                    <div className={css.imageSize} align="center">
                        <Link to="/">
                            <img className={css.image} alt="Logo" src={logo} />
                        </Link>
                    </div>
                    <Box className={css.leftSide} />
                    <Hidden lgUp>
                        <IconButton color="inherit" onClick={handleOpenSidebar}>
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

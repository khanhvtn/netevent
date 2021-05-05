import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    AppBar,
    Badge,
    Box,
    Hidden,
    IconButton,
    Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import useStyles from './styles'
import logo from '../../../images/logo.png'

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
    const [notifications] = useState([]);
    const css = useStyles();

    return (
        <AppBar
            className={css.appbar}
            color="default"
            elevation={1}
            {...rest}
        >
            <Toolbar>
                <RouterLink to="/">
                    <img
                        className={css.image}
                        alt="Logo"
                        src={logo}
                    />
                </RouterLink>
                <Box className={css.leftSide} />
                <Hidden lgDown>
                    <IconButton color="inherit">
                        <Badge
                            badgeContent={notifications.length}
                            color="primary"
                            variant="dot"
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit">
                        <InputIcon />
                    </IconButton>
                </Hidden>
                <Hidden lgUp>
                    <IconButton
                        color="inherit"
                        onClick={onMobileNavOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

DashboardNavbar.propTypes = {
    onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;

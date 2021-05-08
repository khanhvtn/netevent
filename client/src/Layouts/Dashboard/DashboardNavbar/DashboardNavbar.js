import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    AppBar,
    Badge,
    Box,
    Hidden,
    IconButton,
    Toolbar,
    Menu,
    MenuItem,
    Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { userLogout } from '../../../actions/userActions';
import InputIcon from '@material-ui/icons/Input';
import useStyles from './styles';
import logo from '../../../images/logo.png';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
    const css = useStyles();
    const { user } = useSelector((state) => ({
        user: state.user.user,
    }));
    const dispatch = useDispatch();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(userLogout(history));
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>{user.email}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    return (
        <div>
            <AppBar
                className={css.navbarColor}
                color="default"
                elevation={1}
                {...rest}
            >
                <Toolbar>
                    <Hidden mdDown>
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
                        <IconButton color="inherit" onClick={onMobileNavOpen}>
                            <MenuIcon />
                        </IconButton>
                        <div className={css.imageSize} align="center">
                            <Link to="/">
                                <img className={css.image} alt="Logo" src={logo} />
                            </Link>
                        </div>
                        <Box className={css.leftSide} />
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <AccountCircleIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
};

DashboardNavbar.propTypes = {
    onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;

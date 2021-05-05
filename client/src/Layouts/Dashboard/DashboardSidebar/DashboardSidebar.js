import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography
} from '@material-ui/core';
// import {
//     AlertCircle as AlertCircleIcon,
//     BarChart as BarChartIcon,
//     Lock as LockIcon,
//     Settings as SettingsIcon,
//     ShoppingBag as ShoppingBagIcon,
//     User as UserIcon,
//     UserPlus as UserPlusIcon,
//     Users as UsersIcon
// } from 'react-feather';
import NavItem from './NavItem';
import useStyles from './styles'

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith'
};

const items = [
    {
        href: '/app/dashboard',
        // icon: BarChartIcon,
        title: 'Dashboard'
    },
    {
        href: '#',
        // icon: UsersIcon,
        title: 'Customers'
    },
    {
        href: '#',
        // icon: ShoppingBagIcon,
        title: 'Products'
    },
    {
        href: '#',
        // icon: UserIcon,
        title: 'Account'
    },
    {
        href: '#',
        // icon: SettingsIcon,
        title: 'Settings'
    },
    {
        href: '#',
        // icon: LockIcon,
        title: 'Login'
    },
    {
        href: '#',
        // icon: UserPlusIcon,
        title: 'Register'
    },
    {
        href: '#',
        // icon: AlertCircleIcon,
        title: 'Error'
    }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
    const location = useLocation();
    const css = useStyles();

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname]);

    const content = (
        <Box className={css.box1}>
            <Box className={css.box2} >
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    {user.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.jobTitle}
                </Typography>
            </Box>
            <Divider />
            <Box className={css.p_2}>
                <List>
                    {items.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden mdUp >
                <Drawer
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    PaperProps={{ style: { width: 256 } }}
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{
                        style: {
                            width: 256,
                            top: 66,
                            height: 'calc(100% - 64px)'
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
    onMobileClose: () => { },
    openMobile: false
};

export default DashboardSidebar;

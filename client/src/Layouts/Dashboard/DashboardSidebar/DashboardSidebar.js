import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Box,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { LogOut as LogOutIcon } from 'react-feather';
import EventIcon from '@material-ui/icons/Event';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { DevicesOther, People } from '@material-ui/icons';
import ReplayIcon from '@material-ui/icons/Replay';
import NavItem from './NavItem';
import useStyles from './styles';

const roleName = {
    1: 'Admin',
    2: 'Reviewer',
    3: 'Creator',
    4: 'Team Member',
};

const roleActions = {
    1: [
        {
            title: 'User',
            icon: People,
            href: '/dashboard/user',
        },
        {
            title: 'Facility',
            icon: DevicesOther,
            href: '/dashboard/facility',
        },
    ],
    2: [],
    3: [
        {
            title: 'Create Event',
            icon: EventIcon,
            href: '/dashboard/create-event',
        },
        {
            title: 'Event Type',
            icon: EventNoteIcon,
            href: '/dashboard/event-type',
        },
    ],
    4: [],
};

const defaultActions = [

    {
        title: "Switch Role",
        icon: ReplayIcon,
        href: 'pickrole'
    },
    {
        title: 'Logout',
        icon: LogOutIcon,
        href: 'logout',
    },

   
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
    const location = useLocation();
    const css = useStyles();
    const { user, roleNum } = useSelector((state) => ({
        user: state.user.user,
        roleNum: state.user.pickedRoleNum,
    }));
    const renderListActions = roleActions[roleNum].map((action, index) => {
        return (
            <NavItem
                key={index}
                title={action.title}
                icon={action.icon}
                href={action.href}
            />
        );
    });
    const renderDefaultActions = defaultActions.map((action, index) => {
        return (
            <NavItem
                key={index}
                title={action.title}
                icon={action.icon}
                href={action.href}
            />
        );
    });

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname, openMobile, onMobileClose]);

    const content = (
        <Box className={css.sidebarWrapper}>
            <Box className={css.sidebarAccountWrapper}>
                <Typography color="textPrimary" variant="body1">
                    {user.email}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {roleName[roleNum]}
                </Typography>
            </Box>
            <Divider />
            <Box className={css.p2}>
                <List>
                    {renderListActions}
                    {renderDefaultActions}
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
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
                    open={!openMobile}
                    variant="persistent"
                    PaperProps={{
                        style: {
                            width: 256,
                            top: 66,
                            height: 'calc(100% - 64px)',
                        },
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
    openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
    onMobileClose: () => {},
    openMobile: false,
};

export default DashboardSidebar;

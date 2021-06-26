import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Box,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { LogOut as LogOutIcon } from 'react-feather';
import EventIcon from '@material-ui/icons/Event';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { CalendarToday } from '@material-ui/icons';
import { DevicesOther, People } from '@material-ui/icons';
import ReplayIcon from '@material-ui/icons/Replay';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import NavItem from './NavItem';
import useStyles from './styles';

const roleName = {
    1: 'Admin',
    2: 'Reviewer',
    3: 'Creator',
    4: 'Team Member'
};

const roleActions = {
    1: [
        {
            title: 'User',
            icon: People,
            href: ['/dashboard/admin/user']
        },
        {
            title: 'Facility',
            icon: DevicesOther,
            href: ['/dashboard/admin/facility']
        }
    ],
    2: [
        {
            title: 'Event Request',
            icon: EventAvailableIcon,
            href: ['/dashboard/reviewer/event-request']
        },
        {
            title: 'Calendar',
            icon: CalendarToday,
            href: ['/dashboard/reviewer/calendar']
        },
        {
            title: 'Event Analysis',
            icon: EventIcon,
            href: ['/dashboard/reviewer/event-analysis']
        },
        {
            title: 'Facility Usage',
            icon: WorkOutlineOutlinedIcon,
            href: ['/dashboard/reviewer/facility-usage']
        },
        {
            title: 'Task',
            icon: AssignmentOutlinedIcon,
            href: ['/dashboard/reviewer/task']
        }
    ],
    3: [
        {
            title: 'Event Management',
            icon: EventAvailableIcon,
            href: ['/dashboard/creator/event-management']
        },
        {
            title: 'Create Event',
            icon: EventIcon,
            href: ['/dashboard/creator/create-event']
        },
        {
            title: 'Event Type',
            icon: EventNoteIcon,
            href: ['/dashboard/creator/event-type']
        },
        {
            title: 'Calendar',
            icon: CalendarToday,
            href: ['/dashboard/creator/calendar']
        },
        {
            title: 'Task',
            icon: AssignmentOutlinedIcon,
            href: ['/dashboard/creator/task']
        }
    ],
    4: [
        {
            title: 'Task',
            icon: AssignmentOutlinedIcon,
            href: ['/dashboard/member/task']
        },
        {
            title: 'Calendar',
            icon: CalendarToday,
            href: ['/dashboard/member/calendar']
        }
    ]
};

const defaultActions = [
    {
        title: 'Switch Role',
        icon: ReplayIcon,
        href: 'pickrole'
    },
    {
        title: 'Logout',
        icon: LogOutIcon,
        href: 'logout'
    }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
    const location = useLocation();
    const css = useStyles();
    const { user, roleNum } = useSelector((state) => ({
        user: state.user.user,
        roleNum: state.user.pickedRoleNum
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
        /* eslint-disable-next-line */
    }, [location.pathname]);

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
                    PaperProps={{ style: { width: 256 } }}>
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
                            height: 'calc(100% - 64px)'
                        }
                    }}>
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
    onMobileClose: () => {},
    openMobile: false
};

export default DashboardSidebar;

import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import adminIcon from '../../images/admin-color-icon.png';
import reviewerIcon from '../../images/reviewer-color-icon.png';
import creatorIcon from '../../images/creator-color-icon.png';
import memberIcon from '../../images/member-color-icon.png';
import { useSelector } from 'react-redux';

//import makeStyles in the last
import makeStyles from './styles';
import RoleCard from './RoleCard/RoleCard';
import DashboardNavbar from '../../Layouts/Dashboard/DashboardNavbar/DashboardNavbar';

/* Default path is used to enable the first actions in user dashboard based on their role */
const roleInfo = {
    1: {
        roleName: 'Admin',
        icon: adminIcon,
        defaultPath: 'dashboard/user',
    },
    2: {
        roleName: 'Reviewer',
        icon: reviewerIcon,
        defaultPath: 'dashboard/event-reviewer',
    },
    3: {
        roleName: 'Creator',
        icon: creatorIcon,
        defaultPath: 'dashboard/event-management',
    },
    4: {
        roleName: 'Team Member',
        icon: memberIcon,
        defaultPath: 'dashboard/task',
    },
};

const PickRole = () => {
    const css = makeStyles();
    const { userInfo } = useSelector((state) => ({
        userInfo: state.user.user,
    }));
    const renderRoleCard = userInfo.role.map((roleNum, index) => {
        const { roleName, icon, defaultPath } = roleInfo[roleNum];
        return (
            <RoleCard
                key={index}
                roleNum={roleNum}
                roleName={roleName}
                icon={icon}
                delay={(index + 1) * 600}
                defaultPath={defaultPath}
            />
        );
    });
    return (
        <div className={css.main}>
            <Container maxWidth="lg" style={{ margin: 'auto' }}>
                <DashboardNavbar onPickRole={true} />
                <Typography
                    style={{ textAlign: 'center', marginBottom: '30px' }}
                    variant="h4"
                >
                    Choose your role to continue...
                </Typography>

                <Grid
                    item
                    container
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    {renderRoleCard}
                </Grid>
            </Container>
        </div>
    );
};

export default PickRole;

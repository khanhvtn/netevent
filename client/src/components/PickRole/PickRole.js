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

const roleInfo = {
    1: {
        roleName: 'Admin',
        icon: adminIcon,
        path: '/app/admin/dashboard',
    },
    2: {
        roleName: 'Reviewer',
        icon: reviewerIcon,
        path: '/reviewer',
    },
    3: {
        roleName: 'Creator',
        icon: creatorIcon,
        path: '/creator',
    },
    4: {
        roleName: 'Team Member',
        icon: memberIcon,
        path: '/teamMember',
    },
};

const PickRole = () => {
    const css = makeStyles();
    const { userInfo } = useSelector((state) => ({
        userInfo: state.user.user,
    }));
    const renderRoleCard = userInfo.role.map((roleNum, index) => {
        const { roleName, icon, path } = roleInfo[roleNum];
        return (
            <RoleCard
                key={index}
                roleName={roleName}
                icon={icon}
                path={path}
                delay={(index + 1) * 600}
            />
        );
    });
    return (
        <div className={css.main}>
            <Container maxWidth="lg" style={{ margin: 'auto' }}>
                <Typography
                    style={{ textAlign: 'center', marginBottom: '40px' }}
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

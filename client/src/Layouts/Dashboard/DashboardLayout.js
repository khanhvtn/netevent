import React, { useCallback, useState } from 'react';
import DashboardNavbar from './DashboardNavbar/DashboardNavbar';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import { Redirect, useHistory } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    const css = useStyles();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const { user } = useSelector((state) => ({
        user: state.user.user
    }));
    const history = useHistory();

    const handleToggleSideBard = useCallback((status) => {
        setIsMobileNavOpen(() => status);
    }, []);

    //prevent user refresh the page
    if (!user) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: {
                        prevPath: history.location.pathname
                    }
                }}
            />
        );
    }

    return (
        <>
            <div className={css.dashboardLayoutRoot}>
                <DashboardNavbar onMobileNavOpen={handleToggleSideBard} />
                <DashboardSidebar
                    onMobileClose={handleToggleSideBard}
                    openMobile={isMobileNavOpen}
                />
                <div className={css.dashboardLayoutWrapper}>
                    <div className={css.dashboardLayoutContainer}>
                        <div className={css.dashboardLayoutContent}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;

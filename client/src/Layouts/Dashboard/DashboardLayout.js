import React, { useState } from 'react';
import DashboardNavbar from './DashboardNavbar/DashboardNavbar';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import { Redirect, useHistory } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
    const css = useStyles();
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);
    const { user } = useSelector((state) => ({
        user: state.user.user,
    }));
    const history = useHistory();
    const roleNum = history.location.state?.roleNum;

    //prevent user refresh the page
    if (!user) {
        return <Redirect to="/login" />;
    }
    return (
        <>
            <div className={css.dashboardLayoutRoot}>
                <DashboardNavbar
                    onMobileNavOpen={() => setMobileNavOpen(true)}
                />
                <DashboardSidebar
                    roleNum={roleNum}
                    onMobileClose={() => setMobileNavOpen(false)}
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

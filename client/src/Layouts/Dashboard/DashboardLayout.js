import React, { useState } from 'react';
import DashboardNavbar from './DashboardNavbar/DashboardNavbar';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';
import useStyles from './styles'

const DashboardLayout = ({ children }) => {
    const css = useStyles();
    const [isMobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <>
            <div className={css.dashboardLayoutRoot}>
                <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
                <DashboardSidebar
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
}

export default DashboardLayout;
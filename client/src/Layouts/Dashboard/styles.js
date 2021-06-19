import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    dashboardLayoutRoot: {
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
    },
    dashboardLayoutWrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,

        [theme.breakpoints.up('lg')]: {
            paddingLeft: 256
        }
    },
    dashboardLayoutContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    dashboardLayoutContent: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto'
    }
}));

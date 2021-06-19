import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paginationWrapper: {
        display: 'flex',
        flex: '1 1 100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        minHeight: 52,
        paddingRight: 2,
        backgroundColor: theme.palette.background.paper,
        [theme.breakpoints.down('sm')]: {
            paddingTop: 4,
            paddingBottom: 8,
            minHeight: 52,
            paddingRight: 2,
            justifyContent: 'center',
            flexDirection: 'column'
        }
    },
    selectRowNumWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
            marginBottom: 8
        }
    },
    selectRowNum: {
        marginLeft: 8,
        outline: 'none'
    },
    pagination: {
        marginRight: 8,
        [theme.breakpoints.down('sm')]: {
            marginRight: 0
        }
    }
}));

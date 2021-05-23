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
        backgroundColor: theme.palette.background.paper
    },
    selectRowNumWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    selectRowNum: {
        marginLeft: 8,
        backgroundColor: 'transparent',
        outline: 'none',
    },
    pagination: { marginRight: 8 },
}));

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    paginationWrapper: {
        display: 'flex',
        flex: '1 1 100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    selectRowNumWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    selectRowNum: {
        marginLeft: 8,
        backgroundColor: 'transparent',
        outline: 'none'
    },
    pagination: { marginRight: 8 }
}));

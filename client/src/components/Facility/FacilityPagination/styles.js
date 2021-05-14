import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    paginationWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '20px',
    },
    selectRowNumWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '20px',
    },
    selectRowNum: {
        marginLeft: '10px',
        backgroundColor: 'transparent',
        outline: 'none',
    },
    pagination: { marginRight: '10px' },
}));

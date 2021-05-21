import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    filterActions: {
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterInputs: {
        marginTop: '20px',
    },
    filterWrapper: {
        width: '250px',
        padding: '20px',
    },
    handleFilterButton: {
        textTransform: "none"
    },
    handleClearButton:{
        textTransform: "none",
        textDecoration: 'underline',
    }
}));

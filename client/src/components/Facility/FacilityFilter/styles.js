import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
    handleClearButton: {
        textTransform: "none",
        textDecoration: 'underline',
    },
    filterTitle: {
        padding: '16px 0',
        backgroundColor: theme.palette.background.default
    }
}));
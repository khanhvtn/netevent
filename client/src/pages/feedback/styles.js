import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    main: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default
    },
    wrapper: {
        padding: 16
    },
    paper: {
        margin: 32,
        padding: 32
    },
    submitButton: {
        textTransform: 'none',
        margin: '0 32px 64px 32px',
        float: 'right'
    },
    mt8: {
        marginTop: 8
    },
    checkboxFormGroup: {
        justifyContent: 'space-between',
        marginTop: 16
    },
    radioFormGroup: {
        marginBottom: 32,
        backgroundColor: '#fafafa',
        padding: 8
    },
    circularProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    }
}));

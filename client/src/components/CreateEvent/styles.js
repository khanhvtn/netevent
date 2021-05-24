import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    formControl: { margin: theme.spacing(1) },
    paper: {
        margin: '18px 180px',
        padding: '18px 180px',
        // backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('lg')]: {
            margin: '18px 80px',
            padding: '18px 80px'
        },
        [theme.breakpoints.down('md')]: {
            margin: '18px',
            padding: '18px'
        },
    },
    paper1: {
        width: '100%',
        borderStartStartRadius: 16,
        borderTopRightRadius: 16
    },
    inputImage: {
        display: 'none',
    },
    cardMedia: {
        height: '345px',
        width: '100%',
        marginLeft: '12px',
        marginRight: '12px',
        [theme.breakpoints.down('lg')]: {
            marginLeft: 0,
            marginRight: 0
        },
    },
    btnRemovePhoto: {
        marginRight: '8px',
    },
    btnChangePhoto: {
        marginLeft: '8px',
    },
    clearAllButton: {
        textTransform: "none",
        textDecoration: 'underline',
        fontWeight: 'bold'
    },
}));

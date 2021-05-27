import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    formControl: { margin: theme.spacing(1) },
    paper: {
        margin: '20px',
        padding: '20px',
        // // backgroundColor: theme.palette.background.default,
        // [theme.breakpoints.down('lg')]: {
        //     margin: '18px 80px',
        //     padding: '18px 80px'
        // },
        // [theme.breakpoints.down('md')]: {
        //     margin: '18px',
        //     padding: '18px'
        // },
    },
    paper1: {
        width: '100%',
        borderStartStartRadius: 16,
        borderTopRightRadius: 16,
    },
    inputImage: {
        display: 'none',
    },
    btnRemovePhoto: {
        marginRight: '8px',
    },
    btnChangePhoto: {
        marginLeft: '8px',
    },
    clearAllButton: {
        textTransform: 'none',
        fontWeight: 'bold',
    },
}));

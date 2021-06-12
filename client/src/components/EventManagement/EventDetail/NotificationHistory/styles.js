import { makeStyles, fade } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    paper: {
        margin: '40px 80px',
        minHeight: '70vh',
        [theme.breakpoints.down('md')]: {
            margin: '20px',
        },
    },
    contentWrapper: {
        marginTop: '20%',
        minHeight: '40vh'
    },
    bodyActivity: {
        margin: 36
    },
    tableText: {
        fontSize: "14pt"
    },
    mtb36: {
        margin: 36
    },
    table:{
        
    }
}));

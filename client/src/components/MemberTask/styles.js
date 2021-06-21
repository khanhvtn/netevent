import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    circularProgress: {
        position: 'absolute',
        top: '50%',
        left: '55%',
        [theme.breakpoints.down('md')]:{
            left: '50%',
        }
    },
    noTask: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
    grow: {
        flexGrow: 1
    },
    paper: {
        margin: '18px 80px',
        padding: 16,
        minHeight: '86vh',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('md')]: {
            margin: '20px'
        }
    },
    tableText: {
        fontSize: '11pt',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 150,
        [theme.breakpoints.down('xs')]: {
            fontSize: '15px'
        }
    }
}));

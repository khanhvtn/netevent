import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    circularProgress: {
        position: "absolute",
        top: "50%",
        left: "55%",
    },
    grow: {
        flexGrow: 1,
    },
    paper: {
        margin: '18px 80px',
        [theme.breakpoints.down('md')]: {
            margin: '20px',
        },
    },
}));
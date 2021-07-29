import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    tmp: {
        marginTop: '20%'
    },
    paper: {
        margin: '40px 80px',
        paddingBottom: 80,
        minHeight: '38vh',
        [theme.breakpoints.down('md')]: {
            margin: '20px'
        }
    }
}));

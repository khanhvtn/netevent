import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    circularProgress: {
        position: 'absolute',
        top: '50%',
        left: '55%',
        [theme.breakpoints.down('md')]:{
            left: '50%',
        }
    }
}));

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    errorBox: {
        position: 'absolute',
        width: '150px',
        height: '50px',
        top: '50%',
        left: '50%',
        marginLeft: '-50px' /* margin is -0.5 * dimension */,
        marginTop: '-25px'
    }
}));

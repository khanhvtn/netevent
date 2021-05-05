import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    leftSide: {
        flexGrow: 1
    },
    image: {
        width: 200,
        height: 60,
        objectFit: 'cover'
    },
    appbar: {
        backgroundColor: theme.palette.background.default,
    }
}));

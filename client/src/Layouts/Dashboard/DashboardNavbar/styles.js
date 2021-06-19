import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    leftSide: {
        flexGrow: 1
    },
    image: {
        width: 232,
        height: 64,
        objectFit: 'cover'
    },
    imageSize: {
        width: 232,
        height: 64,
        marginRight: 24
    },
    navbarColor: {
        backgroundColor: theme.palette.background.default,
        paddingLeft: 0
    }
}));

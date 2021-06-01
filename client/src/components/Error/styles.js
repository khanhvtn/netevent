import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    errorBox: {
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        margin: 200
    },
    imageAlign: {
        textAlign: 'center'
    },
    handleImage: {
        marginTop: 100,
        display: 'inline-block',
        maxWidth: '100%',
        width: 560
    }
}));
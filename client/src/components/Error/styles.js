import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    errorBox: {
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        marginTop:200
    },
    imageAlign: {
        textAlign: 'center'
    },
    handleImage: {
        marginTop: 80,
        display: 'inline-block',
        maxWidth: '100%',
        width: 560,
        [theme.breakpoints.down('sm')]:{
            marginTop: 10
        }
    },
    pnf:{
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]:{
            fontSize: '4em'
        }
    }
}));


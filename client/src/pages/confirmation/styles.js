import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    main: {
        minHeight: '100vh',
        display: 'flex',
    },
    wrapper: {
        width: '350px',
        margin: 'auto',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        width: '90%',
        margin: ' 20px 0',
    },
    btnSubmit: {
        margin: '20px 0',
        width: '90%',
    },
    media: {
        height: 100,
    },
    errorPasswordText: {
        color: "red",
        fontSize: 14
    },
    errorDrop: {
        width: '90%',
        margin: '0 auto'
    },
    info: {
        textAlign: "center"
    },
    contentWrapper: {
        marginTop: '20%'
    }
}));
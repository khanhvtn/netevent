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
        width: '90%',
        margin: 'auto',
    },
    textField: {
        margin: '20px 0',
    },
    btnSubmit: {
        margin: '20px 0',
    },
    media: {
        height: 100,
    },
    errorDrop: { width: '90%', margin: '0 auto' },
}));
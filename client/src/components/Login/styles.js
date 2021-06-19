import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    main: {
        minHeight: '100vh',
        display: 'flex'
    },
    wrapper: {
        width: '350px',
        margin: 'auto',
        padding: 32
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        margin: 'auto'
    },
    emailField: {
        margin: '40px 0 0 0',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: 8
            }
        }
    },
    passwordField: {
        margin: '20px 0',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: 8
            }
        }
    },
    btnSubmit: {
        margin: '20px 0',
        textTransform: 'none',
        borderRadius: 8,
        minHeight: 48
    },
    media: {
        height: 100
    },
    errorDrop: { width: '90%', margin: '0 auto' },
    loginWrapper: {
        borderRadius: 16
    }
}));

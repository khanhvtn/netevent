import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    box1: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme.palette.background.default,
    },
    box2: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: 18
    },
    p_2: {
        padding: 16,
    },
    avatarHandle: {
        cursor: 'pointer',
        width: 64,
        height: 64
    },
    listItem1: {
        display: 'flex'
    },
    button1: {
        color: 'text.secondary',
        fontWeight: 'medium',
        justifyContent: 'flex-start',
        letterSpacing: 0,
        paddingTop: 12,
        paddingBottom: 12,
        textTransform: 'none',
        width: '100%',
        // ...(active && {
        //     color: 'primary.main'
        // }),
        '& svg': {
            mr: 1
        }
    }
}));

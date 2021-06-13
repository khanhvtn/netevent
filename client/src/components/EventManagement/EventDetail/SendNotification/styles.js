import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    paper: {
        padding: '36px 72px',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.default,
        minHeight: '78vh',
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(4),
            minHeight: 0,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 500,
        [theme.breakpoints.down('xs')]: {
            minWidth: 0
        }
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    notificationDescription: {
        paddingTop: 20
    },
    dialogAction: {
        marginTop: theme.spacing(2),
    },
    contentWrapper: {
        marginTop: '20%'
    },
    contentWrapper1: {
        width: '10%',
        height: '10%'
    },
    buttonSend: {
        textTransform: 'none'
    },
    errorStyle: {
        color: "red",
        fontSize: 14
    },
    buttonCancel: {
        marginRight: 16,
        textTransform: 'none'
    },
    eventTitle: {
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.5em'
        },
    },
    eventNameButton: {
        textTransform: 'none',
        backgroundColor: '#eceef7',
        color: '#3f51b5',
        marginRight: 8,
        "&:hover": {
            backgroundColor: "#eceef7"
        }
    }
}))
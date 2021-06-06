import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 500
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    notificationDescription: {
        paddingTop: 20
    },
    buttonSend: {
        padding: theme.spacing(2),
    },
    contentWrapper: {
        marginTop: '20%'
    },
    contentWrapper1: {
        width: '10%',
        height: '10%'
    },
    buttonSend1: {
        minWidth: 40
    },
    errorStyle: {
        color: "red",
        fontSize: 14
    }
}))
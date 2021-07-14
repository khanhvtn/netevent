import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    dialogActions: {
        marginRight: 16,
        marginBottom: 8
    },

    dialogInviation: {
        minWidth: 500,
        [theme.breakpoints.down('sm')]: {
            minWidth: 0
        }
    },

    dialogPaper: {
        height: 600
    },

    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },

    inviteButton: {
        textTransform: 'none',
        backgroundColor: '#eceef7',
        color: '#3f51b5',
        '&:hover': {
            backgroundColor: '#c5cae9'
        }
    },

    sentButton: {
        textTransform: 'none',
        backgroundColor: '#e8f5e9',
        color: '#4caf50',
        '&:hover': {
            backgroundColor: '#c8e6c9'
        }
    },

    closeButton: {
        float: 'right',
        margin: 0,
        minWidth: 32,
        minHeight: 32,
        '&:hover': {
            background: 'none'
        }
    }
}));

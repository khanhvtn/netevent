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

    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },

    inviteButton: {
        textTransform: 'none'
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

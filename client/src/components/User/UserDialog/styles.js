import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    textField: {
        marginBottom: '20px'
    },
    dialogActions: {
        marginRight: 16,
        marginBottom: 8,
        marginTop: 8
    },
    chips: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5)
        }
    },

    dialogCreateUpdateUser: {
        minWidth: 500,
        [theme.breakpoints.down('sm')]: {
            minWidth: 0
        }
    },

    dialogDeleteUser: {
        minWidth: 500,
        [theme.breakpoints.down('sm')]: {
            minWidth: 0
        }
    }
}));

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    textField: {
        marginBottom: '20px',
    },
    dialogActions: {
        marginRight: '20px',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },

    dialogCreateUpdateUser: {
        minWidth: 500,
        [theme.breakpoints.down('sm')]: {
            minWidth: 0,
        }
    },

    dialogDeleteUser: {
        minWidth: 500,
        [theme.breakpoints.down('sm')]: {
            minWidth: 0,
        }
    }
}));

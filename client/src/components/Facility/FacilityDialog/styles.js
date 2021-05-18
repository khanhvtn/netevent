import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    textField: {
        marginBottom: '20px',
    },
    dialogActions: {
        marginRight: '20px',
    },

    dialogCreateUpdateFac: {
        minWidth: 500,
        [theme.breakpoints.down('sm')]: {
            minWidth: 0,
        }
    },

    dialogDeleteFac: {
        minWidth: 500,
        [theme.breakpoints.down('sm')]: {
            minWidth: 0,
        }
    }
}));

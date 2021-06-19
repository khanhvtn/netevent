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

    dialogCreateUpdateFac: {
        minWidth: 500,
        [theme.breakpoints.down('sm')]: {
            minWidth: 0
        }
    },

    dialogDeleteFac: {
        minWidth: 500,
        [theme.breakpoints.down('sm')]: {
            minWidth: 0
        }
    }
}));

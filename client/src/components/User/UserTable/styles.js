import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper1: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    fixedWidthChip: {
        minWidth: 60,
        fontSize: '0.875em'
    },
}));

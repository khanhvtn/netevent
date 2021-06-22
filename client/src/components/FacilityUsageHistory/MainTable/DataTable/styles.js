import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper1: {
        width: '100%',
        borderStartStartRadius: 16,
        borderTopRightRadius: 16
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    title: {
        flex: '1 1 100%',
        fontWeight: 'bold',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    tableRow: {
        cursor: "pointer"
    }
}));

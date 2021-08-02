import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    tmp: {
        marginTop: '10%'
    },
    paper: {
        margin: '40px 30px',
        paddingBottom: 80,
        minHeight: '38vh',
        [theme.breakpoints.down('md')]: {
            margin: '20px'
        }
    },
    labelChart: {
        fontSize: 15,
        color: '#0f2147',
        fontWeight: 'bold'
    },
    table: {
        minWidth: 650
    },

    contentWrapper: {
        marginTop: '20%',
        minHeight: '40vh'
    },
    paperChart: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },

    paperHeader: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },

    title: {
        flex: '1 1 100%',
        fontWeight: 'bold',
        padding: theme.spacing(3)
    }
}));

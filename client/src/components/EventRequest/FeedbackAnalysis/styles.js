import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    paper: {
        margin: '40px 30px',
        paddingBottom: 80,
        minHeight: '38vh',
        [theme.breakpoints.down('md')]: {
            margin: '20px'
        },
        [theme.breakpoints.down('xs')]: {
            margin: 0
        }
    },
    labelChart: {
        color: '#0e2045',
        fontSize: 18,
        fontWeight: 'bold',
        verticalAlign: 'middle',
        display: 'inline-flex'
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
    exportBtn: {
        text: 'right',
        float: 'right',
        backgroundColor: '#0e2045',
        margin: theme.spacing(2)
    },
    titleExportBtn: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        verticalAlign: 'middle',
        display: 'inline-flex'
    },

    pie: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },

    paperHeader: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },

    title: {
        flex: '1 1 100%',
        fontWeight: 'bold',
        padding: theme.spacing(2)
    },

    chartContainer: {
        height: '70vh',
        marginTop: 16,
        [theme.breakpoints.down('md')]: {
            height: 'auto'
        }
    }
}));

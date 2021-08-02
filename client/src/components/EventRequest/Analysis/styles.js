import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
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

    analysisCard: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },

    pie: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },

    chartContainer: {
        height: '50vh'
    },

    chartTypo: {
        color: '#0e2045',
        fontSize: 18,
        fontWeight: 'bold',
        verticalAlign: 'middle',
        display: 'inline-flex'
    },

    titleExportBtn: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        verticalAlign: 'middle',
        display: 'inline-flex'
    },

    chartTypo1: {
        color: '#0e2045',
        fontSize: 14,
        fontWeight: 'bold'
    },

    iconAnalysis: {
        paddingRight: theme.spacing(1)
    },
    contentWrapper: {
        marginTop: '20%',
        minHeight: '40vh'
    },
    exportBtn: {
        text: 'right',
        float: 'right',
        backgroundColor: '#0e2045',
        margin: theme.spacing(2)
    },

    title: {
        fontWeight: 'bold',
        margin: theme.spacing(2)
    }
}));

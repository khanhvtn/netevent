import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    paper: {
        margin: '40px 80px',
        paddingBottom: 80,
        minHeight: '70vh',
        [theme.breakpoints.down('md')]: {
            margin: '20px'
        }
    },

    analysisCard: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },

    pie: {
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
    }
}));

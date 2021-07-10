import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    paper: {
        margin: '40px 30px',
        paddingBottom: 80,
        minHeight: '86vh',
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('md')]: {
            margin: '20px'
        }
    },

    title: {
        flex: '1 1 100%',
        fontWeight: 'bold',
        padding: theme.spacing(3)
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
        height: 80
    },

    chartTypo: {
        color: '#0e2045',
        fontSize: 18,
        fontWeight: 'bold',
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

    circularProgress: {
        position: 'absolute',
        top: '50%',
        left: '55%',
        [theme.breakpoints.down('md')]: {
            left: '50%'
        }
    },

    titleExportBtn: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        verticalAlign: 'middle',
        display: 'inline-flex'
    },

    exportBtn: {
        margin: theme.spacing(2),
        backgroundColor: '#0e2045'
    },

    gridChart: {
        padding: theme.spacing(2)
    },

    paperChart: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },

    paperToolbar: {
        margin: theme.spacing(2)
    }
}));

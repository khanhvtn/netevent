import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    paper: {
        margin: '40px 30px',
        paddingBottom: 80,
        minHeight: '70vh',
        flexGrow: 1,
        textAlign: 'center',
        [theme.breakpoints.down('md')]: {
            margin: '20px'
        }
    },

    title: {
        padding: theme.spacing(2)
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
        text: 'right',
        float: 'right',
        backgroundColor: '#0e2045'
    }
}));

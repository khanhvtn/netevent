import { makeStyles, fade } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    paper: {
        margin: '18px 80px',
        [theme.breakpoints.down('md')]: {
            margin: '20px',
        },
    },
    toolbarEventDetail: {
        marginLeft: 8,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
            fontSize: '1em'
        },
    },
    eventDetailTitle: {
        fontWeight: 'bold',
        marginTop: 16,
        [theme.breakpoints.down('xs')]: {
            fontSize: '2.5em'
        },
    },
    imageWrapper: {
        margin: '16px 0'
    },
    detailWrapper: {
        padding: '12px 96px 80px 96px',
        [theme.breakpoints.down('md')]: {
            padding: '12px 48px 48px 48px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '12px 24px 24px 24px',
        },
        [theme.breakpoints.down('xs')]: {
            padding: 8,
        },
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    expandRoot: {
        width: '100%',
    },
    chipStatus: {
        marginLeft: 8,
        marginBottom: 4
    },
    mt48: {
        marginTop: 48
    },
    mt36: {
        marginTop: 36
    }
}));

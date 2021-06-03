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
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbarEventDetail: {
        marginLeft: 8
    },
    detailWrapper: {
        padding: 96,
        [theme.breakpoints.down('md')]: {
            padding: 48,
        },
        [theme.breakpoints.down('sm')]: {
            padding: 24,
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

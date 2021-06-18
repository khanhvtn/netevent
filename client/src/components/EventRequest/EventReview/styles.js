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
            fontSize: '1em',
            display: 'none'
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
    detailRightWrapper: {
        padding: '12px 80px 80px 80px',
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
        marginBottom: 4,
        color: 'white'
    },
    mt48: {
        marginTop: 48
    },
    mt36: {
        marginTop: 36
    },
    chipContainer: {
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
    },
    chip: {
        backgroundColor: "#000054",
        color: "#fff",
        margin: theme.spacing(0.5),
    },
    viewTemplateButton: {
        textTransform: 'none',
        fontSize: '11px',
        marginTop: 4
    },
    tabDesign: {
        textTransform: 'none',
        margin: '0 32px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
        },
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            minWidth: 0,
            margin: '0 8px',
        },
    },
    circularProgress: {
        position: "absolute",
        top: "50%",
        left: "55%",
    }
}));

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
        marginBottom: 4
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


    // Participant Tab
    // 
    // 
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.1),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '500px',
        [theme.breakpoints.down('xs')]: {
            width: 'auto',
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
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        // padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },

    root: {
        width: '100%',
    },
}));

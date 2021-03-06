import { makeStyles, fade } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    paper: {
        margin: '18px 80px',
        backgroundColor: '#f5f5f5',
        [theme.breakpoints.down('md')]: {
            margin: '20px'
        }
    },
    paper1: {
        borderStartStartRadius: 16,
        borderTopRightRadius: 16
    },
    title: {
        flex: '1 1 100%',
        fontWeight: 'bold',
        padding: theme.spacing(3)
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.1)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '500px',
        [theme.breakpoints.down('xs')]: {
            width: 'auto'
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputInput: {
        // padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%'
    },
    gridLayout: {
        padding: 16
    },
    filterButton: {
        marginLeft: '10px'
    }
}));

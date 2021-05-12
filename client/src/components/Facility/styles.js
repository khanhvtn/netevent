import { makeStyles, fade } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    paper: { margin: '20px' },
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
    paper1: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    pagination: { marginRight: '10px' },
    selectRowNum: {
        marginLeft: '10px',
        backgroundColor: 'transparent',
        outline: 'none',
    },
    selectRowNumWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '20px',
    },
    paginationWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '20px',
    },
    [theme.breakpoints.down('xs')]: {
        paginationWrapper: {
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
    },
    textField: {
        marginBottom: '20px',
    },
    dialogActions: {
        marginRight: '20px',
    },
    filterActions: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filterInputs: {
        marginTop: '20px',
    },
    filterWrapper: {
        width: '250px',
        padding: '20px',
    },
}));

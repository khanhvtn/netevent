import {makeStyles, fade} from '@material-ui/core'

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
    [theme.breakpoints.down('xs')]: {
        paginationWrapper: {
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
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
}))
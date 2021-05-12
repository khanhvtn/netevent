import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    main: {
        padding: theme.spacing(3, 3),
    },
    paper: {
        margin: 'auto',
        height: '100%',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    root: {
        width: '100%'
    },
    typography: {
        padding: theme.spacing(2),
    },
    filterPaper: {
        height: '100%',
        width: 300,
        borderRadius: 8,
    },
    filterAction: {
        textTransform: 'none'
    },
    filterArray: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        listStyle: 'none',
        borderRadius: 0,
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chipHandle:{
        margin: theme.spacing(0.5),
    }



}));

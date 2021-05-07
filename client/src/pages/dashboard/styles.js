import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    main: {
        padding: theme.spacing(3, 3),
        background: '#eaeff1',
    },
    paper: {
        margin: 'auto',
        height: 830,
        overflow: 'hidden',

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

    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 4,
    },

    errorMessage: {
        color: "red",
        fontSize: 10
    }
}));

import { makeStyles, lighten } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },

    addUser: {
        width: "15%",
        maxHeight: 40
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    rootEnhanceTableToolbar: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: "1 1 100%",
    },
    contentWrapper: {
        height: '100%',
        marginTop: '10%'
    },
    popup1: {
        padding: "30px",
        paddingTop: "0px",
        paddingBottom: "20px",
        position: "relative",
    },
    popup: {
        padding: "30px",
        border: "15px",
        position: "relative",
        alignContent: "center",
        justifyContent: "center",
    },
    moment: {
        textAlign: "center",
        verticalAlign: "middle",
        display: "table-cell",
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
    },
    dialogCreate: {
        minWidth: 500,

    },
    m2: {
        marginTop: 16,
        marginRight: 16,
        marginBottom: 8,
    },
    editButton: {
        margin: 0
    },
    deleteButton: {
        margin: 8
    }

}));
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
    contentWrapper:{
        margin: '40px 16px'
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
    }
}));
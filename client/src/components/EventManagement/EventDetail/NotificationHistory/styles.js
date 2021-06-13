import { makeStyles, fade } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    paper: {
        margin: '40px 80px',
        paddingBottom: 80,
        minHeight: '70vh',
        [theme.breakpoints.down('md')]: {
            margin: '20px',
        },
    },
    contentWrapper: {
        marginTop: '20%',
        minHeight: '40vh'
    },
    bodyActivity: {
        margin: 36
    },
    tableText: {
        fontSize: "14pt",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: 150,
        [theme.breakpoints.down('xs')]: {
            fontSize: '15px',
        }
    },
    mtb36: {
        margin: 36
    },
    table: {

    },
    colapseWrapper: {
        paddingBottom: 0,
        paddingTop: 0,
    },
    title: {
        flex: '1 1 100%',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            fontSize: '16px',
        }
    },
    sendEmailButton: {
        textTransform: 'none',
        width: 150,
    }
}));

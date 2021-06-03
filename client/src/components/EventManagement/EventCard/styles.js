import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: 16,
        flexDirection: 'column',
        padding: 16,
    },
    titleCard: {
        fontWeight: 'bold'
    },
    content: {
        paddingLeft: 0,
        paddingRight: 0
    },
    description: {
        flex: '1 0 auto',
        minHeight: 150,
        padding: 0
    },
    cover: {
        width: '100%',
        height: '0',
        paddingTop: '56.25%', // 16:9,
        borderRadius: 16,
    },
    controls: {
        display: 'flex',
        flex: '1 1 100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 16,
    },
    getButton: {
        border: '2px solid',
        fontWeight: 'bold',
    },
    schedule: {
        marginBottom: 10,
        marginTop: 10
    },
    chipRoot: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    }
}));


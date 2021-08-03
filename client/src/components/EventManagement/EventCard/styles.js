import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: 16,
        flexDirection: 'column',
        padding: 16
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
        padding: 0,
        minHeight: 250
    },
    cover: {
        width: '100%',
        borderRadius: 16
    },
    controls: {
        display: 'flex',
        flex: '1 1 100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 16
    },
    reviewBy: {
        display: 'flex',
        flex: '1 1 100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 8
    },
    getButton: {
        color: 'white'
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
            margin: theme.spacing(0.5)
        }
    },
    chipTag: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 120,
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.5),
        fontWeight: 'bold'
    }
}));

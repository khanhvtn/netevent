import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    paper1: {
        width: '100%',
        borderStartStartRadius: 16,
        borderTopRightRadius: 16
    },
    table: {
        minWidth: 750
    },
    fixedWidthChip: {
        minWidth: 70,
        fontSize: '0.875em'
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
        width: 1
    },
    textContainer: {
        display: 'block',
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    selected: {
        backgroundColor: '#eceef7 !important'
    }
}));

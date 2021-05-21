import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    formControl: { margin: theme.spacing(1) },
    inputImage: {
        display: 'none',
    },
    cardMedia: {
        height: '500px',
        width: '100%',
    },
    btnRemovePhoto: {
        marginRight: '10px',
    },
    btnChangePhoto: {
        marginLeft: '10px',
    },
}));

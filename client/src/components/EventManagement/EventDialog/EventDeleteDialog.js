import React from 'react';
import {
    CircularProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Slide,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
//import useStyles in the last
import useStyles from './styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EventDeleteDialog = ({
    openDeleteDialog,
    handleToggleDialogDelete,
    // handleDelete,
}) => {
    const css = useStyles();

    return (
        <>
            {/* Dialog Confirm Delete */}
            <Dialog
                TransitionComponent={Transition}
                open={openDeleteDialog}
                onClose={handleToggleDialogDelete}
                aria-labelledby="delete-dialog"
                fullWidth
                className={css.dialogDeleteFac}
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog">{'Warning!!!'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure with your action ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={css.dialogActions}>
                    <Button
                        // disabled={isLoading ? true : false}
                        onClick={handleToggleDialogDelete}
                        color="default"
                    >
                        Cancel
                    </Button>
                    <Button
                        // disabled={isLoading ? true : false}
                        variant="contained"
                        // onClick={handleDelete}
                        color="secondary"
                    >
                        {/* {isLoading ? <CircularProgress size={25} color="inherit" /> : 'Delete'} */}
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EventDeleteDialog;
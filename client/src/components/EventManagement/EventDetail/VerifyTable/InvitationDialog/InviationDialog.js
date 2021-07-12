import React, { useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    CircularProgress,
    Slide,
    Button,
    Avatar,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListItemAvatar,
    IconButton
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import CloseIcon from '@material-ui/icons/Close';
//import useStyles in the last
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllParicipant } from '../../../../../actions/participantActions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InvitationDialog = ({
    openInvitationDialog,
    handleToggleDialogInvitation
    // handleInviteParticipant,
}) => {
    const css = useStyles();
    const dispatch = useDispatch();

    const { participants, isLoading } = useSelector((state) => ({
        participants: state.participant.allParticipants,
        isLoading: state.participant.isLoading
    }));

    useEffect(() => {
        if (openInvitationDialog) {
            dispatch(getAllParicipant());
        }
    }, [dispatch, openInvitationDialog]);

    return (
        <Dialog
            TransitionComponent={Transition}
            maxWidth="sm"
            open={openInvitationDialog}
            fullWidth
            className={css.dialogInviation}
            onClose={handleToggleDialogInvitation}
            aria-labelledby="invitation-dialog">
            <DialogTitle id="invitation-dialog">
                <Typography variant="h5" align="center">
                    Invitation Recommendation
                    <IconButton
                        size="small"
                        className={css.closeButton}
                        onClick={handleToggleDialogInvitation}>
                        <CloseIcon />
                    </IconButton>
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText id="invitation-dialog-description">
                    Here is the recommend participant list that can relevant to
                    the current event!
                </DialogContentText>
                {isLoading ? (
                    <div className={css.circularProgress} align="center">
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <List className={css.root}>
                        {participants.length === 0 ? (
                            <div
                                className={css.circularProgress}
                                align="center">
                                <Typography>No Data Matched.</Typography>
                            </div>
                        ) : (
                            participants.map((participant) => {
                                return (
                                    <ListItem key={participant._id}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ImageIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={participant.name}
                                            secondary={participant.email}
                                        />
                                        <ListItemSecondaryAction>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                className={css.inviteButton}>
                                                {isLoading ? (
                                                    <CircularProgress
                                                        size={26}
                                                        color="inherit"
                                                    />
                                                ) : (
                                                    'Invite'
                                                )}
                                            </Button>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })
                        )}
                    </List>
                )}
            </DialogContent>
            <DialogActions className={css.dialogActions}></DialogActions>
        </Dialog>
    );
};

export default InvitationDialog;

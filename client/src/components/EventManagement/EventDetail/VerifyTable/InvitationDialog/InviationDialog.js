import React, { useEffect, useState } from 'react';
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
import Skeleton from '@material-ui/lab/Skeleton';
import ImageIcon from '@material-ui/icons/Image';
import CloseIcon from '@material-ui/icons/Close';
//import useStyles in the last
import useStyles from './styles';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import { getSuggestedParticipants } from '../../../../../actions/participantActions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
    page: 1
};

const InvitationDialog = ({
    openInvitationDialog,
    handleToggleDialogInvitation,
    handleInviteParticipant
}) => {
    const css = useStyles();
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const take = 5;

    const {
        participants,
        isLoading,
        eventDetail,
        invitationListEmail,
        isInvitationLoading,
        spinnerIndex,
        totalPages,
        isFetching
    } = useSelector((state) => ({
        participants: state.participant.suggestedParticipants,
        invitationListEmail: state.participant.invitationListEmail,
        isLoading: state.participant.isLoadingSuggestedParticipant,
        eventDetail: state.event.eventDetail,
        isInvitationLoading: state.participant.isInviteLoading,
        spinnerIndex: state.participant.spinnerIndex,
        totalPages: state.participant.totalPages,
        isFetching: state.participant.isFetching
    }));

    useEffect(() => {
        if (openInvitationDialog) {
            dispatch(
                getSuggestedParticipants({
                    eventCode: eventDetail.urlCode,
                    page: 1
                })
            );
        }
    }, [dispatch, openInvitationDialog, eventDetail.urlCode]);

    const loadMore = () => {
        if (isFetching) {
            return;
        }

        setState((prevState) => ({
            ...prevState,
            page: prevState.page + 1
        }));

        dispatch(
            getSuggestedParticipants({
                eventCode: eventDetail.urlCode,
                page: state.page + 1
            })
        );
    };

    const handleCloseDialog = () => {
        setState(initialState);
        handleToggleDialogInvitation();
    };

    return (
        <Dialog
            classes={{ paper: css.dialogPaper }}
            TransitionComponent={Transition}
            maxWidth="sm"
            open={openInvitationDialog}
            fullWidth
            className={css.dialogInviation}
            onClose={handleCloseDialog}
            aria-labelledby="invitation-dialog">
            <DialogTitle id="invitation-dialog">
                <Typography align="center">
                    Invitation Recommendation
                    <IconButton
                        size="small"
                        className={css.closeButton}
                        onClick={handleCloseDialog}>
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
                    <List className={css.root}>
                        {Array.apply(null, { length: take + 1 }).map(
                            (row, index) => {
                                return (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Skeleton
                                                animation="wave"
                                                variant="circle"
                                                width={40}
                                                height={40}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Skeleton width={150} />}
                                            secondary={<Skeleton width={300} />}
                                        />
                                        <ListItemSecondaryAction>
                                            <Skeleton height={20} width={50}>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    className={
                                                        css.inviteButton
                                                    }>
                                                    Invite
                                                </Button>
                                            </Skeleton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            }
                        )}
                    </List>
                ) : (
                    <>
                        {participants.length === 0 ? (
                            <List className={css.root}>
                                <div
                                    style={{ marginTop: '30%' }}
                                    align="center">
                                    <Typography>No Data Matched.</Typography>
                                </div>
                            </List>
                        ) : (
                            <InfiniteScroll
                                loadMore={loadMore}
                                hasMore={totalPages > state.page}
                                initialLoad={false}
                                loader={
                                    <div key={0} align="center">
                                        <CircularProgress
                                            size={22}
                                            color="primary"
                                        />
                                    </div>
                                }
                                useWindow={false}>
                                <List className={css.root}>
                                    {participants.map((participant, index) => {
                                        const participantKey = `${participant._id}-${index}`;
                                        return (
                                            <ListItem key={participantKey}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={participant.name}
                                                    secondary={
                                                        participant.email
                                                    }
                                                />
                                                <ListItemSecondaryAction>
                                                    {invitationListEmail.includes(
                                                        participant.email
                                                    ) ? (
                                                        <Button
                                                            size="small"
                                                            className={
                                                                css.sentButton
                                                            }>
                                                            Sent
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            size="small"
                                                            onClick={() =>
                                                                handleInviteParticipant(
                                                                    index,
                                                                    participant.email,
                                                                    eventDetail.urlCode
                                                                )
                                                            }
                                                            className={
                                                                css.inviteButton
                                                            }>
                                                            {spinnerIndex ===
                                                                index &&
                                                            isInvitationLoading ? (
                                                                <CircularProgress
                                                                    size={20}
                                                                    color="inherit"
                                                                />
                                                            ) : (
                                                                'Invite'
                                                            )}
                                                        </Button>
                                                    )}
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </InfiniteScroll>
                        )}
                    </>
                )}
            </DialogContent>
            <DialogActions className={css.dialogActions}></DialogActions>
        </Dialog>
    );
};

export default InvitationDialog;

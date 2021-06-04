import React, { useState } from 'react';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Chip,
    CardActionArea
} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import moment from 'moment';
import useStyles from './styles'
import { Skeleton } from '@material-ui/lab';


const EventCard = ({ onClickEvent, isLoading, event }) => {
    const css = useStyles();

    // Can only click when finish event loading
    const handleOnClickEvent = (event) => {
        if (!isLoading) {
            onClickEvent(event)
        }
    }

    return (
        <>
            <Grid xs={12} sm={6} md={4} lg={4} xl={4} item>
                <CardActionArea onClick={() => handleOnClickEvent(event)}>
                    <Card
                        className={css.root}
                        elevation={3}
                    >
                        {/* Event Image */}
                        {isLoading ? <Skeleton variant="rect" height={190} style={{ borderRadius: 16 }} />
                            :
                            <CardMedia
                                className={css.cover}
                                image={event.image}
                                title="Event Image"
                            />
                        }

                        {/* Title, budge and maxParticipants */}
                        <CardContent className={css.content}>
                            <Typography className={css.titleCard} variant="h6">
                                {isLoading ? <Skeleton variant="text" /> : event.eventName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {isLoading ? <Skeleton variant="text" width="50%" />
                                    :
                                    `${event.budget} vnd | ${event.maxParticipants} participants`
                                }
                            </Typography>
                        </CardContent>

                        {/* startDate, endDate, tags, location and eventTypeId */}
                        <CardContent className={css.description}>
                            {/* Divider */}
                            <Divider />

                            {/* startDate and endDate display */}
                            <Grid className={css.schedule} container >
                                <Grid xs={2} container alignItems="center" justify="center" item>
                                    {isLoading ? <Skeleton variant="circle" width={30} height={30} /> : <ScheduleIcon />}
                                </Grid>
                                <Grid xs={5} container direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        {isLoading ? <Skeleton variant="text" width="20%" /> : 'From'}
                                    </Typography>
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        {isLoading ? <Skeleton variant="text" width="50%" /> : moment(event.startDate).format('DD MMM, YYYY')}

                                    </Typography>
                                </Grid>
                                <Grid xs={5} container direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        {isLoading ? <Skeleton variant="text" width="20%" /> : 'To'}
                                    </Typography>
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        {isLoading ? <Skeleton variant="text" width="50%" /> : moment(event.endDate).format('DD MMM, YYYY')}
                                    </Typography>
                                </Grid>
                            </Grid>

                            {/* Location and tags display */}
                            <Grid className={css.schedule} container >
                                <Grid xs={2} container alignItems="center" justify="center" item>
                                    {isLoading ? <Skeleton variant="circle" width={30} height={30} /> : <LocationOnOutlinedIcon />}
                                </Grid>
                                <Grid xs={10} container direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        {isLoading ? <Skeleton variant="text" width="20%" /> : 'Location'}
                                    </Typography>
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        {isLoading ? <Skeleton variant="text" /> : event.location}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid className={css.schedule} container >
                                <Grid xs={2} container alignItems="center" justify="center" item>
                                    {isLoading ? <Skeleton variant="circle" width={30} height={30} /> : <LocalOfferOutlinedIcon />}
                                </Grid>
                                <Grid xs={10} container direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        {isLoading ? <Skeleton variant="text" width="20%" /> : 'Tags'}
                                    </Typography>
                                    {isLoading ? <Skeleton variant="text" />
                                        :
                                        <div className={css.chipRoot}>
                                            {event.tags.map((tag, index) => {
                                                return (
                                                    <Chip key={index} size="small" label={tag} />
                                                )
                                            })}
                                        </div>
                                    }
                                </Grid>
                            </Grid>

                            {/* EventTypeId name display */}
                            <Grid className={css.schedule} container >
                                <Grid xs={2} container alignItems="center" justify="center" item>
                                    {isLoading ? <Skeleton variant="circle" width={30} height={30} /> : <AssignmentIndOutlinedIcon />}
                                </Grid>
                                <Grid xs={10} container direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        {isLoading ? <Skeleton variant="text" width="20%" /> : 'Category (type)'}
                                    </Typography>
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        {isLoading ? <Skeleton variant="text" /> : event.eventTypeId?.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>

                        {/* Event Status Display */}
                        <div className={css.controls}>
                            {isLoading ? <Skeleton variant="text" width="15%" />
                                :
                                event.isApproved === null ?
                                    <Chip className={css.getButton} label="Pending" variant="outlined" />
                                    :
                                    event.isFinished ?
                                        <Chip className={css.getButton} label="Expired" variant="outlined" disabled />
                                        :
                                        event.isApproved ?
                                            <Chip className={css.getButton} label="On-going" variant="outlined" color="primary" />
                                            :
                                            <Chip className={css.getButton} label="Rejected" variant="outlined" color="secondary" />
                            }
                        </div>
                    </Card>
                </CardActionArea>
            </Grid>
        </>
    )
}

export default EventCard;
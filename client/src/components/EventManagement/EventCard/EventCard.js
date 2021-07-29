import React from 'react';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    // CardMedia,
    Divider,
    Chip,
    CardActionArea,
    CardActions
} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import ScheduleIcon from '@material-ui/icons/Schedule';
import moment from 'moment';
import useStyles from './styles';
import { Skeleton } from '@material-ui/lab';
import Image from 'material-ui-image';

const EventCard = ({ onClickEvent, isLoading, event }) => {
    const css = useStyles();

    // Can only click when finish event loading
    const handleOnClickEvent = (event) => {
        if (!isLoading) {
            onClickEvent(event);
        }
    };

    return (
        <>
            <Grid xs={12} sm={6} md={4} lg={4} xl={4} item>
                <CardActionArea
                    style={{ borderRadius: 16 }}
                    disabled={isLoading}
                    onClick={() => handleOnClickEvent(event)}>
                    <Card className={css.root} elevation={3}>
                        {/* Event Image */}
                        {isLoading ? (
                            <Skeleton
                                variant="rect"
                                height={250}
                                style={{ borderRadius: 16 }}
                            />
                        ) : (
                            <Image
                                className={css.cover}
                                src={event.image}
                                cover
                                aspectRatio={16 / 9}
                                // title="Event Image"
                            />
                        )}

                        {/* Title, budge and maxParticipants */}
                        <CardContent className={css.content}>
                            <Typography
                                className={css.titleCard}
                                variant="h6"
                                noWrap>
                                {isLoading ? (
                                    <Skeleton variant="text" />
                                ) : (
                                    event.eventName
                                )}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="textSecondary"
                                noWrap>
                                {isLoading ? (
                                    <Skeleton variant="text" width="50%" />
                                ) : (
                                    `${event.budget.replace(
                                        /(\d)(?=(\d{3})+(?!\d))/g,
                                        '$1,'
                                    )} vnd | ${
                                        event.maxParticipants
                                    } participants`
                                )}
                            </Typography>
                            <div>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    noWrap>
                                    {isLoading ? (
                                        <Skeleton variant="text" width="20%" />
                                    ) : (
                                        `${
                                            event.ownerId
                                                ? event.ownerId.email
                                                : 'N/A'
                                        }`
                                    )}
                                </Typography>
                            </div>
                        </CardContent>

                        {/* startDate, endDate, tags, location and eventTypeId */}
                        <CardContent className={css.description}>
                            {/* Divider */}
                            <Divider />

                            {/* startDate and endDate display */}
                            <Grid className={css.schedule} container>
                                <Grid
                                    xs={2}
                                    container
                                    alignItems="center"
                                    justify="center"
                                    item>
                                    {isLoading ? (
                                        <Skeleton
                                            variant="circle"
                                            width={30}
                                            height={30}
                                        />
                                    ) : (
                                        <ScheduleIcon />
                                    )}
                                </Grid>
                                <Grid xs={5} container direction="column" item>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary">
                                        {isLoading ? (
                                            <Skeleton
                                                variant="text"
                                                width="20%"
                                            />
                                        ) : (
                                            'From'
                                        )}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        style={{ fontWeight: 'bold' }}>
                                        {isLoading ? (
                                            <Skeleton
                                                variant="text"
                                                width="50%"
                                            />
                                        ) : (
                                            moment(event.startDate).format(
                                                'DD MMM, YYYY'
                                            )
                                        )}
                                    </Typography>
                                </Grid>
                                <Grid xs={5} container direction="column" item>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary">
                                        {isLoading ? (
                                            <Skeleton
                                                variant="text"
                                                width="20%"
                                            />
                                        ) : (
                                            'To'
                                        )}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        style={{ fontWeight: 'bold' }}>
                                        {isLoading ? (
                                            <Skeleton
                                                variant="text"
                                                width="50%"
                                            />
                                        ) : (
                                            moment(event.endDate).format(
                                                'DD MMM, YYYY'
                                            )
                                        )}
                                    </Typography>
                                </Grid>
                            </Grid>

                            {/* Location and tags display */}
                            <Grid className={css.schedule} container>
                                <Grid
                                    xs={2}
                                    container
                                    alignItems="center"
                                    justify="center"
                                    item>
                                    {isLoading ? (
                                        <Skeleton
                                            variant="circle"
                                            width={30}
                                            height={30}
                                        />
                                    ) : (
                                        <LocationOnOutlinedIcon />
                                    )}
                                </Grid>
                                <Grid
                                    xs={10}
                                    container
                                    direction="column"
                                    wrap="nowrap"
                                    zeroMinWidth
                                    item>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary">
                                        {isLoading ? (
                                            <Skeleton
                                                variant="text"
                                                width="20%"
                                            />
                                        ) : (
                                            'Location'
                                        )}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        style={{ fontWeight: 'bold' }}
                                        noWrap>
                                        {isLoading ? (
                                            <Skeleton variant="text" />
                                        ) : (
                                            event.location
                                        )}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid className={css.schedule} container>
                                <Grid
                                    xs={2}
                                    container
                                    alignItems="center"
                                    justify="center"
                                    item>
                                    {isLoading ? (
                                        <Skeleton
                                            variant="circle"
                                            width={30}
                                            height={30}
                                        />
                                    ) : (
                                        <LocalOfferOutlinedIcon />
                                    )}
                                </Grid>
                                <Grid
                                    xs={10}
                                    container
                                    direction="column"
                                    wrap="nowrap"
                                    zeroMinWidth
                                    item>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary">
                                        {isLoading ? (
                                            <Skeleton
                                                variant="text"
                                                width="20%"
                                            />
                                        ) : (
                                            'Tags'
                                        )}
                                    </Typography>
                                    {isLoading ? (
                                        <Skeleton variant="text" />
                                    ) : (
                                        <div className={css.chipRoot}>
                                            {event.tags.map((tag, index) => {
                                                return (
                                                    <Chip
                                                        className={css.chipTag}
                                                        key={index}
                                                        size="small"
                                                        label={tag}
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                </Grid>
                            </Grid>

                            {/* EventTypeId name display */}
                            <Grid className={css.schedule} container>
                                <Grid
                                    xs={2}
                                    container
                                    alignItems="center"
                                    justify="center"
                                    item>
                                    {isLoading ? (
                                        <Skeleton
                                            variant="circle"
                                            width={30}
                                            height={30}
                                        />
                                    ) : (
                                        <AssignmentIndOutlinedIcon />
                                    )}
                                </Grid>
                                <Grid xs={10} container direction="column" item>
                                    <Typography
                                        variant="caption"
                                        color="textSecondary">
                                        {isLoading ? (
                                            <Skeleton
                                                variant="text"
                                                width="20%"
                                            />
                                        ) : (
                                            'Category (type)'
                                        )}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        style={{ fontWeight: 'bold' }}>
                                        {isLoading ? (
                                            <Skeleton variant="text" />
                                        ) : event.eventTypeId?.name ? (
                                            event.eventTypeId.name
                                        ) : (
                                            'N/A'
                                        )}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <div className={css.reviewBy}>
                                {isLoading
                                    ? null
                                    : event.reviewerId && (
                                          <Typography
                                              display="block"
                                              variant="caption"
                                              color="textSecondary">
                                              Reviewed by{' '}
                                              <b>
                                                  {event.reviewerId?.email
                                                      ? event.reviewerId.email
                                                      : 'N/A'}
                                              </b>
                                          </Typography>
                                      )}
                            </div>
                            {/* Event Status Display */}
                            <div className={css.controls}>
                                {isLoading ? (
                                    <Skeleton variant="text" width="15%" />
                                ) : event.isApproved === null ? (
                                    <Chip
                                        className={css.getButton}
                                        style={{ backgroundColor: `#9e9e9e` }}
                                        label="Pending"
                                    />
                                ) : event.isFinished ? (
                                    <Chip
                                        className={css.getButton}
                                        style={{ backgroundColor: `#4caf50` }}
                                        label="Completed"
                                    />
                                ) : event.isApproved ? (
                                    <Chip
                                        className={css.getButton}
                                        style={{ backgroundColor: `#5c6bc0` }}
                                        label="Approved"
                                    /> //5c6bc0
                                ) : (
                                    <Chip
                                        className={css.getButton}
                                        style={{ backgroundColor: `#e53935` }}
                                        label="Rejected"
                                    />
                                )}
                            </div>
                        </CardActions>
                    </Card>
                </CardActionArea>
            </Grid>
        </>
    );
};

export default EventCard;

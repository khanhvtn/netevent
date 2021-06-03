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
import { useDispatch } from 'react-redux';


import useStyles from './styles'

const initialState = {
    image: 'https://source.unsplash.com/featured/?macbook',
    eventName: 'Netcompany Presentation Event',
    budget: '1,000,000',
    maxParticipants: '20',
    location: '13 Le Thach, district 4, HCM City',
    tags: ['RMIT', 'Technology', 'NetComapny'],
    type: 'Employer Branding',
}

const EventCard = ({ onClickEvent }) => {
    const css = useStyles();
    const [state, setState] = useState(initialState)

    return (
        <>
            <Grid xs={12} sm={6} md={4} lg={4} xl={4} item>

                <CardActionArea onClick={onClickEvent}>
                    <Card
                        className={css.root}
                        elevation={3}
                        onClick={() => console.log("Click")}
                    >
                        <CardMedia
                            className={css.cover}
                            image={state.image}
                            title="Event Image"
                        />
                        <CardContent className={css.content}>
                            <Typography className={css.titleCard} variant="h6">
                                {state.eventName}
                            </Typography>
                            <div className={css.alignBudget}>
                                <Typography variant="caption" color="textSecondary">
                                    {`${state.budget} vnd | ${state.maxParticipants} participants`}
                                </Typography>
                            </div>
                        </CardContent>
                        <CardContent className={css.description}>
                            <Divider />
                            <Grid className={css.schedule} container >
                                <Grid xs={2} container alignItems="center" justify="center" item>
                                    <ScheduleIcon />
                                </Grid>
                                <Grid xs={5} container direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        From
                                    </Typography>
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        09, March, 2014
                                    </Typography>
                                </Grid>
                                <Grid xs={5} container direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        To
                                    </Typography>
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        12 March, 2014
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid className={css.schedule} container >
                                <Grid xs={2} container alignItems="center" justify="center" item>
                                    <LocationOnOutlinedIcon />
                                </Grid>
                                <Grid xs={10} container direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        Location
                                    </Typography>
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        {state.location}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid className={css.schedule} container >
                                <Grid xs={2} container alignItems="center" justify="center" item>
                                    <LocalOfferOutlinedIcon />
                                </Grid>
                                <Grid xs={10} container direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        Tags
                                    </Typography>
                                    <div className={css.chipRoot}>
                                        {state.tags.map((tag) => {
                                            return (
                                                <Chip size="small" label={tag} />
                                            )
                                        })}
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid className={css.schedule} container >
                                <Grid xs={2} container alignItems="center" justify="center" item>
                                    <AssignmentIndOutlinedIcon />
                                </Grid>
                                <Grid xs={10} container direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        Category (type)
                                    </Typography>
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        {state.type}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <div className={css.controls}>
                            <Chip className={css.getButton} label="Pending" variant="outlined" color="primary" />
                        </div>
                    </Card>
                </CardActionArea>
            </Grid>
        </>
    )
}

export default EventCard;
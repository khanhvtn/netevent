import React from 'react';
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

const EventCard = ({ onClickEvent }) => {
    const css = useStyles();

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
                            image="https://source.unsplash.com/featured/?macbook"
                            title="Live from space album cover"
                        />
                        <CardContent className={css.content}>
                            <Typography className={css.titleCard} variant="h6">
                                Netcompany Presentation Event
                            </Typography>
                            <div className={css.alignBudget}>
                                <Typography variant="caption" color="textSecondary">
                                    1,000,000 vnd | 20 participants
                                </Typography>
                            </div>
                        </CardContent>
                        <CardContent className={css.description}>
                            <Divider />
                            <Grid className={css.schedule} container >
                                <Grid xs={2} container alignItems="center" justify="center" item>
                                    <ScheduleIcon />
                                </Grid>
                                <Grid xs={5} direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        From
                                    </Typography>
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        09, March, 2014
                                    </Typography>
                                </Grid>
                                <Grid xs={5} direction="column" item>
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
                                <Grid xs={10} direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        Location
                                    </Typography>
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        13 Le Thach, district 4, HCM City
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid className={css.schedule} container >
                                <Grid xs={2} container alignItems="center" justify="center" item>
                                    <LocalOfferOutlinedIcon />
                                </Grid>
                                <Grid xs={10} direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        Tags
                                    </Typography>
                                    <div className={css.chipRoot}>
                                        <Chip size="small" label="RMIT" />
                                        <Chip size="small" label="Technology" />
                                        <Chip size="small" label="NetCompany" />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid className={css.schedule} container >
                                <Grid xs={2} container alignItems="center" justify="center" item>
                                    <AssignmentIndOutlinedIcon />
                                </Grid>
                                <Grid xs={10} direction="column" item>
                                    <Typography variant="caption" color="textSecondary">
                                        Category (type)
                                    </Typography>
                                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                                        Employer Branding
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
import React from 'react';
//import makeStyles in the last
import makeStyles from './styles';
import {
    Grid,
    Paper,
    CardMedia,
    Typography,
    ButtonBase,
    Zoom,
    Grow,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const RoleCard = ({ roleName, icon, path, delay }) => {
    const css = makeStyles();
    const history = useHistory();

    const handlePickRole = (path) => {
        history.push(path);
    };
    return (
        <Grid item>
            <Grow timeout={delay} in style={{ transformOrigin: '0 0 0' }}>
                <ButtonBase onClick={() => handlePickRole(path)}>
                    <Paper className={css.paper}>
                        <CardMedia className={css.media} image={icon} />
                        <Typography>{roleName}</Typography>
                    </Paper>
                </ButtonBase>
            </Grow>
        </Grid>
    );
};

export default RoleCard;

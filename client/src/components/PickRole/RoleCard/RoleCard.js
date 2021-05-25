import React from 'react';
import {
    Grid,
    Paper,
    CardMedia,
    Typography,
    ButtonBase,
    Grow,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER_PICK_ROLE } from '../../../constants';
//import makeStyles in the last
import makeStyles from './styles';

const RoleCard = ({ roleNum, roleName, defaultPath, icon, delay }) => {
    const css = makeStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const handlePickRole = () => {
        //set picked role
        dispatch({
            type: USER_PICK_ROLE,
            payload: roleNum,
        });
        //set roleNum to localStorage
        localStorage.setItem('roleNum', roleNum);
        history.push(defaultPath);
    };
    return (
        <Grid item>
            <Grow timeout={delay} in style={{ transformOrigin: '0 0 0' }}>
                <ButtonBase onClick={handlePickRole}>
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
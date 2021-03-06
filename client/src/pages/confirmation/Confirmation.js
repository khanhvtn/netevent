import React, { useState, useEffect } from 'react';
import makeStyles from './styles';
import {
    Zoom,
    Paper,
    TextField,
    Button,
    CardMedia,
    Collapse,
    CircularProgress
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import logo from '../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { userConfirm } from '../../actions/userActions';
import { getLink } from '../../actions/linkActions';
import { PASSWORD_MATCHED } from '../../constants';

const initialState = {
    password1: '',
    password2: ''
};

const Confirmation = () => {
    const css = makeStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [password, setPassword] = useState(initialState);
    const [errorPassword, setErrorPassword] = useState(false);
    const id = useParams();
    const { link } = useSelector((state) => ({
        link: state.link
    }));
    const { user } = useSelector((state) => ({
        user: state.user
    }));

    useEffect(() => {
        dispatch(getLink(id.id));
    }, [dispatch, id.id]);

    useEffect(() => {
        if (link.complete) {
            if (!link.link.data) {
                history.push('/404');
            }
        }
    }, [link, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            password.password1 === password.password2 &&
            password.password1 !== '' &&
            password.password2 !== ''
        ) {
            dispatch(userConfirm(id.id, password.password2, history));
        } else {
            setErrorPassword(true);
        }
    };

    return link.complete === false ? (
        <div className={css.contentWrapper} align="center">
            <CircularProgress color="primary" />
        </div>
    ) : (
        <div className={css.main}>
            <div className={css.wrapper}>
                <Zoom in>
                    <Paper className={css.confirmationWrapper} elevation={3}>
                        <CardMedia
                            className={css.media}
                            image={logo}
                            title="Logo"
                        />
                        {user.isConfirm ? (
                            <Alert severity="info">
                                <AlertTitle>Info</AlertTitle>
                                Update Password Successful. Please wait 5
                                seconds to login!
                            </Alert>
                        ) : (
                            <>
                                <Collapse
                                    className={css.errorDrop}
                                    in={errorPassword ? true : false}>
                                    <Alert
                                        className={css.alert}
                                        severity="error">
                                        {PASSWORD_MATCHED}
                                    </Alert>
                                </Collapse>
                                <form
                                    className={css.form}
                                    onSubmit={handleSubmit}
                                    noValidate>
                                    <TextField
                                        variant="outlined"
                                        className={css.textFieldPass1}
                                        type="password"
                                        label="Enter new password"
                                        value={password.password1}
                                        name="password1"
                                        fullWidth
                                        onChange={(e) =>
                                            setPassword({
                                                ...password,
                                                password1: e.target.value
                                            })
                                        }
                                    />

                                    <TextField
                                        variant="outlined"
                                        className={css.textFieldPass2}
                                        type="password"
                                        label="Confirmed Password"
                                        value={password.password2}
                                        name="password2"
                                        fullWidth
                                        onChange={(e) =>
                                            setPassword({
                                                ...password,
                                                password2: e.target.value
                                            })
                                        }
                                    />

                                    <Button
                                        disabled={user.isLoading}
                                        size="large"
                                        variant="contained"
                                        className={css.btnSubmit}
                                        type="submit"
                                        color="primary"
                                        fullWidth>
                                        {user.isLoading ? (
                                            <CircularProgress color="inherit" />
                                        ) : (
                                            'Submit'
                                        )}
                                    </Button>
                                </form>
                            </>
                        )}
                    </Paper>
                </Zoom>
            </div>
        </div>
    );
};

export default Confirmation;

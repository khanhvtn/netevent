import React, { useState, useEffect } from 'react';
import {
    Zoom,
    Paper,
    TextField,
    Button,
    CardMedia,
    CircularProgress,
    Collapse
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import logo from '../../images/logo.png';
import { userLogin } from '../../actions/userActions';

import makeStyles from './styles';
import { ERROR_CLEAR } from '../../constants';

const initialState = {
    email: '',
    password: ''
};
const Login = () => {
    const [state, setState] = useState(initialState);
    const history = useHistory();
    const dispatch = useDispatch();
    const { errors, user } = useSelector((state) => ({
        errors: state.error.errors,
        user: state.user
    }));
    const css = makeStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(state, history));
    };
    const handleChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };
    useEffect(() => {
        return () => {
            dispatch({
                type: ERROR_CLEAR,
                payload: null
            });
        };
    }, [dispatch]);

    if (user.user) {
        return <Redirect to="/pickRole" />;
    }

    return (
        <div className={css.main}>
            <div className={css.wrapper}>
                <Zoom in>
                    <Paper className={css.loginWrapper} elevation={3}>
                        <CardMedia
                            className={css.media}
                            image={logo}
                            title="Logo"
                        />
                        <Collapse
                            className={css.errorDrop}
                            in={errors?.errLogin ? true : false}>
                            <Alert className={css.alert} severity="error">
                                {errors?.errLogin ? errors.errLogin : ''}
                            </Alert>
                        </Collapse>
                        <form
                            className={css.form}
                            onSubmit={handleSubmit}
                            noValidate>
                            <TextField
                                disabled={user.isLoading}
                                variant="outlined"
                                className={css.emailField}
                                type="email"
                                label="Your email"
                                value={state.email}
                                name="email"
                                fullWidth
                                onChange={handleChange}
                            />
                            <TextField
                                disabled={user.isLoading}
                                variant="outlined"
                                className={css.passwordField}
                                type="password"
                                label="Enter your password"
                                value={state.password}
                                name="password"
                                fullWidth
                                onChange={handleChange}
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
                                    'Sign in'
                                )}
                            </Button>
                        </form>
                    </Paper>
                </Zoom>
            </div>
        </div>
    );
};

export default Login;

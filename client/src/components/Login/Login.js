import React, { useState, useEffect } from 'react';
import {
    Zoom,
    Paper,
    TextField,
    Button,
    CardMedia,
    CircularProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import logo from '../../images/logo.png';
import { userLogin } from '../../actions/userActions';

import makeStyles from './styles';
import { ERROR_CLEAR } from '../../constants';

const initialState = {
    email: '',
    password: '',
};
const Login = () => {
    const [state, setState] = useState(initialState);
    const history = useHistory();
    const dispatch = useDispatch();
    const { errors, user } = useSelector((state) => ({
        errors: state.error.errors,
        user: state.user,
    }));
    const css = makeStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(state, history));
    };
    const handleChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    useEffect(() => {
        return () => {
            dispatch({
                type: ERROR_CLEAR,
                payload: null,
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
                    <Paper elevation={3}>
                        <CardMedia
                            className={css.media}
                            image={logo}
                            title="Logo"
                        />
                        <form
                            className={css.form}
                            onSubmit={handleSubmit}
                            type="loginForm"
                            noValidate
                        >
                            <TextField
                                helperText={errors?.email ? errors?.email : ''}
                                error={errors?.email ? true : false}
                                variant="outlined"
                                className={css.textField}
                                type="email"
                                label="Email"
                                value={state.email}
                                name="email"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{"data-testid": "account-login-email"}}
                            />
                            <TextField
                                helperText={
                                    errors?.password ? errors?.password : ''
                                }
                                error={errors?.password ? true : false}
                                variant="outlined"
                                className={css.textField}
                                type="password"
                                label="Password"
                                value={state.password}
                                name="password"
                                fullWidth
                                onChange={handleChange}
                                inputProps={{"data-testid": "account-login-password"}}
                            />
                            <Button
                                size="large"
                                role="button"
                                variant="contained"
                                className={css.btnSubmit}
                                type="submit"
                                color="primary"
                                fullWidth
                                data-testid="account-login-button"
                                disabled={!email || !password}
                            >
                                {user.isLoading ? (
                                    <CircularProgress color="inherit" />
                                ) : (
                                    'Login'
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

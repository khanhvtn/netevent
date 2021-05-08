import React, { useState, useEffect } from 'react';
import {
    Zoom,
    Paper,
    TextField,
    Button,
    CardMedia,
    Collapse,
    CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
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
    const { error, user } = useSelector((state) => ({
        error: state.error.error,
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
        return <Redirect to="/pickrole" />;
    }
    return (
        <div className={css.main}>
            <div className={css.wrapper}>
                <Zoom in>
                    <Paper>
                        <CardMedia
                            className={css.media}
                            image={logo}
                            title="Logo"
                        />
                        <Collapse
                            className={css.errorDrop}
                            in={error ? true : false}
                        >
                            <Alert className={css.alert} severity="error">
                                {error ? error : ''}
                            </Alert>
                        </Collapse>
                        <form
                            className={css.form}
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <TextField
                                variant="outlined"
                                className={css.textField}
                                type="email"
                                label="Email"
                                value={state.email}
                                name="email"
                                fullWidth
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                className={css.textField}
                                type="password"
                                label="Password"
                                value={state.password}
                                name="password"
                                fullWidth
                                onChange={handleChange}
                            />
                            <Button
                                size="large"
                                variant="contained"
                                className={css.btnSubmit}
                                type="submit"
                                color="primary"
                                fullWidth
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

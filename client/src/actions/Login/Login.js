import React, { useState } from 'react';
import makeStyles from './styles';
import { Zoom, Paper, TextField, Button, CardMedia } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import logo from '../../images/logo.png';

const initialState = {
    email: '',
    password: '',
};
const Login = () => {
    const [state, setState] = useState(initialState);
    const history = useHistory();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => ({
        error: state.error.error,
    }));
    const css = makeStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(state);
    };
    const handleChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
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
                                Login
                            </Button>
                        </form>
                    </Paper>
                </Zoom>
            </div>
        </div>
    );
};

export default Login;

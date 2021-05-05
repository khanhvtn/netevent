import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userCheck } from '../actions/userActions';
import { ERROR_CLEAR } from '../constants';
import { CircularProgress } from '@material-ui/core';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user, error } = useSelector((state) => ({
        user: state.user,
        error: state.error.error,
    }));
    useEffect(() => {
        dispatch(userCheck(history));
        return () => {
            dispatch({
                type: ERROR_CLEAR,
                payload: null,
            });
        };
    }, [dispatch, history]);
    return (
        <Route
            {...rest}
            render={(props) =>
                user.isUserChecking ? (
                    <CircularProgress />
                ) : !error ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;

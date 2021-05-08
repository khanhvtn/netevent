import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './components/Login/Login';
import PrivateRoute from './routes/PrivateRoute';
import PickRole from './components/PickRole/PickRole';
import Error from './components/Error/Error';
import { useDispatch, useSelector } from 'react-redux';
import { userCheck } from './actions/userActions';
import { Grid, CircularProgress } from '@material-ui/core';

import DashboardLayout from './Layouts/Dashboard/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user } = useSelector((state) => ({
        user: state.user,
    }));
    useEffect(() => {
        dispatch(userCheck(history));
    }, [dispatch, history]);
    return (
        <div>
            {user.isUserChecking ? (
                <Grid container justify="center" alignItems="center">
                    <CircularProgress
                        style={{
                            height: '100%',
                        }}
                    />
                </Grid>
            ) : (
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/pickrole" component={PickRole} />

                    {/* Here is the place to add route for dashboard layout */}
                    <Route>
                        <DashboardLayout>
                            <Switch>
                                <Route
                                    path="/admin"
                                    component={Dashboard}
                                    exact
                                />
                                <Route path="/app/customer">
                                    <div>NetCompany</div>
                                </Route>
                                <Route component={Error} />
                            </Switch>
                        </DashboardLayout>
                    </Route>
                </Switch>
            )}
        </div>
    );
};

export default App;

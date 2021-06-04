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
import Confirmation from './pages/confirmation/Confirmation';
import Registration from './pages/registration/Registration';
import Facility from './components/Facility/Facility';
import User from './components/User/User';
import EventType from './components/EventType/EventType';
import CreateEvent from './components/CreateEvent/CreateEvent';
import SendNotification from './components/SendNotification/SendNotification';

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
                    <Route
                        exact
                        path="/confirmation/:id"
                        component={Confirmation}
                    />

                    <Route
                        exact
                        path="/registration/:eventName"
                        component={Registration}
                    />

                    {/* Here is the place to add route for dashboard layout */}
                    <Route>
                        <Switch>
                            <Route
                                path="/dashboard/user"
                                render={() => (
                                    <DashboardLayout>
                                        <User />
                                    </DashboardLayout>
                                )}
                            />
                            <Route
                                path="/dashboard/facility"
                                render={() => (
                                    <DashboardLayout>
                                        <Facility />
                                    </DashboardLayout>
                                )}
                            />

                            {/* Creator Role */}
                            <Route
                                path="/dashboard/event-type"
                                render={() => (
                                    <DashboardLayout>
                                        <EventType />
                                    </DashboardLayout>
                                )}
                            />
                            <Route
                                path="/dashboard/create-event"
                                render={() => (
                                    <DashboardLayout>
                                        <CreateEvent />
                                    </DashboardLayout>
                                )}
                            />

                            <Route
                                path="/dashboard/send-notification"
                                render={() => (
                                    <DashboardLayout>
                                        <SendNotification />
                                    </DashboardLayout>
                                )}
                            />
                            <Route path="*" component={Error} />
                        </Switch>
                    </Route>
                    <Route path="*" component={Error} />
                </Switch>
            )}
        </div>
    );
};

export default App;
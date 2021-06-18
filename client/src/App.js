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
import CalendarApp from './components/Calendar/CalendarApp';
import EventManagement from './components/EventManagement/EventManagement';
import EventDetail from './components/EventManagement/EventDetail/EventDetail';
import EventRequest from './components/EventRequest/EventRequest';
import EventReview from './components/EventRequest/EventReview/EventReview';
import MemberTask from './components/MemberTask/MemberTask';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => ({
    user: state.user
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
              height: '100%'
            }}
          />
        </Grid>
      ) : (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/pickrole" component={PickRole} />
          <Route exact path="/confirmation/:id" component={Confirmation} />

          <Route exact path="/registration/:code" component={Registration} />

          {/* Here is the place to add route for dashboard layout */}
          <Route>
            <Switch>
              <Route
                path="/dashboard/admin/user"
                render={() => (
                  <DashboardLayout>
                    <User />
                  </DashboardLayout>
                )}
              />
              <Route
                path="/dashboard/admin/facility"
                render={() => (
                  <DashboardLayout>
                    <Facility />
                  </DashboardLayout>
                )}
              />

              {/* Creator Role */}
              <Route
                path="/dashboard/creator/event-management"
                render={() => (
                  <DashboardLayout>
                    <EventManagement />
                  </DashboardLayout>
                )}
              />
              <Route
                path="/dashboard/creator/event-detail/:code"
                render={() => (
                  <DashboardLayout>
                    <EventDetail />
                  </DashboardLayout>
                )}
              />
              <Route
                path="/dashboard/creator/event-type"
                render={() => (
                  <DashboardLayout>
                    <EventType />
                  </DashboardLayout>
                )}
              />
              <Route
                path="/dashboard/creator/create-event"
                render={() => (
                  <DashboardLayout>
                    <CreateEvent />
                  </DashboardLayout>
                )}
              />
              <Route
                path="/dashboard/creator/calendar"
                render={() => (
                  <DashboardLayout>
                    <CalendarApp targetRole={3} />
                  </DashboardLayout>
                )}
              />

              {/* Reviewer role */}
              <Route
                path="/dashboard/reviewer/event-request"
                render={() => (
                  <DashboardLayout>
                    <EventRequest />
                  </DashboardLayout>
                )}
              />
              <Route
                path="/dashboard/reviewer/event-review/:code"
                render={() => (
                  <DashboardLayout>
                    <EventReview />
                  </DashboardLayout>
                )}
              />
              <Route
                path="/dashboard/reviewer/calendar"
                render={() => (
                  <DashboardLayout>
                    <CalendarApp targetRole={2} />
                  </DashboardLayout>
                )}
              />
              <Route
                path="/dashboard/reviewer/event-analysis"
                render={() => <DashboardLayout>Event Analysis</DashboardLayout>}
              />
              <Route
                path="/dashboard/reviewer/facility-usage"
                render={() => (
                  <DashboardLayout>Facility Usage History</DashboardLayout>
                )}
              />

              {/* Team member role */}
              <Route
                path="/dashboard/member/task"
                render={() => (
                  <DashboardLayout>
                    <MemberTask />
                  </DashboardLayout>
                )}
              />
              <Route
                path="/dashboard/member/calendar"
                render={() => (
                  <DashboardLayout>Calendar Team Member</DashboardLayout>
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

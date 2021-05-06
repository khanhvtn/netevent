import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './actions/Login/Login';
import DashboardLayout from './Layouts/Dashboard/DashboardLayout';
import Confirmation from './pages/confirmation/Confirmation';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
    return (
        <Switch>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/">
                <div>NetCompany</div>
            </Route>
            <Route exact path="/confirmation/:id">
                <Confirmation />
            </Route>

            {/* Here is the place to add route for dashboard layout */}
            <Route>
                <DashboardLayout >
                    <Switch>
                        <Route path='/app/dashboard' component={Dashboard} exact />
                        <Route path='/app/customer'><div>NetCompany</div></Route>
                    </Switch>
                </DashboardLayout>
            </Route>
        </Switch>
    );
};

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './actions/Login/Login';
import DashboardLayout from './Layouts/Dashboard/DashboardLayout';
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
            <Route>
                <DashboardLayout >
                    <Switch>
                        <Route path='/app/dashboard' component={Dashboard} exact />
                    </Switch>
                </DashboardLayout>
            </Route>
        </Switch>
    );
};

export default App;

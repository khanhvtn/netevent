import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import PrivateRoute from './routes/PrivateRoute';
import PickRole from './components/PickRole/PickRole';
import Error from './components/Error/Error';

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/pickrole" component={PickRole} />
            <Route component={Error} />
        </Switch>
    );
};

export default App;

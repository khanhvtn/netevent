import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './actions/Login/Login';

const App = () => {
    return (
        <Switch>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/">
                <div>NetCompany</div>
            </Route>
        </Switch>
    );
};

export default App;

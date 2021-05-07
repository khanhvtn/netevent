import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Users from './users/Users'
import NotFound from './utils/not_found/NotFound'

function Pages() {
    return (
        <Switch>
            <Route path="/" exact component={Users} />

            <Route path="*" exact component={NotFound} />
        </Switch> 
    )
}

export default Pages
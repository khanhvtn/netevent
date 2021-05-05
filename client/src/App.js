import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Pages from './components/mainpages/Pages'

const App = () => {
    return (
            <Router>
                <div className="App">
                    <Pages />
                </div>
            </Router>
    );
};

export default App;

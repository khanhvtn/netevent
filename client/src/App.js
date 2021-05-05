import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import Header from './components/headers/Header'
import Pages from './components/mainpages/Pages'

const App = () => {
    return (
            <Router>
                <div className="App">
                    <Header />
                    <Pages />
                </div>
            </Router>
    );
};

export default App;

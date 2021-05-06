import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import MainPages from './components/mainpages/Pages'
import {DataProvider} from './store/GlobalState'

const App = () => {
    return (
        <DataProvider>
            <Router>
                <div className="App">
                    <MainPages />
                </div>
            </Router>
        </DataProvider>
    );
};

export default App;

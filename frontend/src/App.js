import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import MainPage from './MainPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/MainPage" component={MainPage} />
            </Switch>
        </Router>
    );
}

export default App;

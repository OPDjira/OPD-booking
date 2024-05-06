import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import MainPage from './MainPage';
import Gidro1 from './Gidro1';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/MainPage" component={MainPage} />
                <Route path="/Gidro1" component={Gidro1} />
            </Switch>
        </Router>
    );
}

export default App;

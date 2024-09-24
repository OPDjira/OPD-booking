import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import MainPage from './MainPage';
import Gidro1 from './Gidro1';
import MainPage2 from './MainPage2';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/MainPage" component={MainPage} />
                <Route path="/Gidro1" component={Gidro1} />
                <Route path="/MainPage2" component={MainPage2} />
            </Switch>
        </Router>
    );
}

export default App;

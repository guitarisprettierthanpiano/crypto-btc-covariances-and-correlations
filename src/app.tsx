import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Description from './components/description';
import MainPage from './components/mainpage';
import Nav from './components/nav';

const App = () => {

    return(
    <HashRouter>
        
        <Nav/>

        <Switch>

            <Route exact path='/'
            component = {MainPage}/>

            <Route path='/description'
            component = {Description}/>

        </Switch>

    </HashRouter>
    );
};
export default App;
import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Description from './components/description';
import MainPage from './components/mainpage';
import Nav from './components/nav';
import About from './components/about'

const App = () => {

    return(
    <HashRouter>
        
        <Nav/>

        <Switch>

            <Route exact path='/'
            component = {MainPage}/>

            <Route path='/description'
            component = {Description}/>

            <Route path ='/about' 
            component={About}/>

        </Switch>

    </HashRouter>
    );
};
export default App;
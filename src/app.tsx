import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import MainPage from './components/mainpage';
import Nav from './components/nav';
import FAQ from './components/faq'

const App = () => {

    return(
    <HashRouter>
        
        <Nav/>

        <Switch>

            <Route exact path='/'
            component = {MainPage}/>

            <Route path='/faq'
            component = {FAQ}/>

        </Switch>

        
    </HashRouter>
    );
};
export default App;
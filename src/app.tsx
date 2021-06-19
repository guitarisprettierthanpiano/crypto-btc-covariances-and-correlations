import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import About from './components/about';
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

            <Route path ='/about' 
            component={About}/>

        </Switch>

        
    </HashRouter>
    );
};
export default App;
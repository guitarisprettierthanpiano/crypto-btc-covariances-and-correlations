import React, { useEffect, useState } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Overlay from './components/Overlay';

import MainPage from './components/mainpage';
import Nav from './components/nav';
import FAQ from './components/faq';

const App: React.FC = () => {

    //on initial app load, send prop to api component telling it to fetch.
    const [counter, setCounter] = useState(0)
    useEffect(()=>{
        setCounter(counter + 1)
    },[])

    return(
    <HashRouter>
        
        <Overlay />

        <div className='page-container'>
        <React.Suspense fallback={<div/>}>
        <Nav/>

        <Switch>

            <Route exact path='/'
            component = {() => <MainPage counters={counter}/>}/>

            <Route path='/faq'
            component = {FAQ}/>

        </Switch>
        </React.Suspense>
        </div>
        
    </HashRouter>
    );
};
export default App;
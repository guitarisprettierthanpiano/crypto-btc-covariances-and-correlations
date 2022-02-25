import React, { useEffect, useState } from 'react';

import Overlay from './components/Overlay';

import MainPage from './components/mainpage';

const Nav = React.lazy (() => import('./components/nav'));

const App: React.FC = () => {

    //on initial app load, send prop to api component telling it to fetch.
    const [counter, setCounter] = useState(0)
    useEffect(()=>{
        setCounter(counter + 1)
    },[])

    return(
    <>
        
        <Overlay />

        <div className='page-container'>
            <React.Suspense fallback={<div/>}>
                <MainPage counters={counter}/>
                <Nav />
            </React.Suspense>
        </div>
        
    </>
    );
};
export default App;
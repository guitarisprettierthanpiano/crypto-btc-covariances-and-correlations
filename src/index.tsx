import React from 'react';
import ReactDOM from 'react-dom';

require('./styles.css')
import App from './app';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.querySelector('#root')
)
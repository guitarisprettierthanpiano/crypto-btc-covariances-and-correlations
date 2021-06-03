import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';

const App = () => {

    function FetchNOW(){
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`)
        .then(res => res.json())
        .then(result => {
            for (let i = 0; i < 50; i++){
                let myElement = document.createElement('span');

                myElement.innerText = result[i].id;
                myElement.classList.add('coins');

                document.querySelector('.the-data').appendChild(myElement);
            };
        });
    };

    useEffect(() => {
        FetchNOW();
    });

    return (
        <div>
            <div className='the-data'>
            </div>

            <NumberFormat 
                displayType={'text'} 
                thousandSeparator={true}
                prefix={'$'}
            />
        </div>
    )
}

export default App;

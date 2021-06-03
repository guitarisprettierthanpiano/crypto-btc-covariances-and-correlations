import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';

import { format } from 'date-fns';

import { subDays } from 'date-fns';

const App = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.getDate();
    const fulldate = day + '-' + month + '-' + year;

    //the next part
    //https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-4-2021&localization=false
    let data = [];
    async function FetchNOW(){
        let goFetch = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`)
        .then(res => res.json())
        .then(result => { 
            data = result;
            for (let i = 0; i < 25; i++){

                let myTR = document.createElement('tr');

                let myCoin0 = document.createElement('td');
                myCoin0.innerText = result[i].market_cap_rank;
                myTR.appendChild(myCoin0);

                let myCoin1 = document.createElement('td');
                myCoin1.innerText = result[i].id;
                myTR.appendChild(myCoin1);

                let myCoin2 = document.createElement('td');
                myCoin2.innerText = result[i].current_price;
                myTR.appendChild(myCoin2);

                let myCoin3 = document.createElement('td');
                myCoin3.innerText = result[i].market_cap;
                myTR.appendChild(myCoin3);

                for (let j:any = 0; j < 6; j++){
                    let myDate = document.createElement('td');

                    const prevDay = subDays(new Date(), j);
                    const prevDayFormatted = format(prevDay, 'dd-MM-yyyy')

                    myDate.innerText = prevDayFormatted;
                
                    myTR.appendChild(myDate)

                    fetch(`https://api.coingecko.com/api/v3/coins/${result[i].id}/history?date=${prevDayFormatted}&localization=true`)
                    .then(res => res.json())
                    .then(resultz => {
                        let myDatez = document.createElement('td')

                        myDatez.innerText = resultz.market_data.current_price.usd

                        myTR.appendChild(myDatez);
                    })
                    
                }

                document.querySelector('.coin-table').appendChild(myTR);
                data = result;
            };
        });
    };

    useEffect(() => {
        FetchNOW();
        console.log(data)
    }, []);

    console.log(data)

    return (
    <>

    <div>
        <table className='coin-table'>
            <tr className='tr1'>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Market Cap</th>
            </tr>
        </table>
    </div>
    </>
    )
}

export default App;

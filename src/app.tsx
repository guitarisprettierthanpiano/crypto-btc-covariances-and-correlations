import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

const App = () => {

    let data = [];
    async function FetchNOW(){
        const goFetch = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`)
        .then(res => res.json())
        .then(result => { 
            for (let i = 0; i < 50; i++){
                data.push(result[i].id);
                let myTR = document.createElement('tr');

                let myCoin0 = document.createElement('td');
                myCoin0.innerText = result[i].market_cap_rank;
                myTR.appendChild(myCoin0);

                let myCoin1 = document.createElement('td');
                myCoin1.innerText = result[i].id;
                myTR.classList.add(result[i].id);
                myTR.appendChild(myCoin1);

                let myCoin2 = document.createElement('td');
                myCoin2.innerText = result[i].current_price.toFixed(2);
                myTR.appendChild(myCoin2);

                let myCoin3 = document.createElement('td');
                myCoin3.innerText = result[i].market_cap;
                myTR.appendChild(myCoin3);

                document.querySelector('.coin-table').appendChild(myTR);                
                
                let btcSigma:number = 0;
                fetch(`https://api.coingecko.com/api/v3/coins/${result[i].id}/market_chart?vs_currency=usd&days=30&interval=daily`)
                .then(res => res.json())
                .then(resulto => {
    
                    if (result[i].id==='internet-computer'){
                        return false;
                    }

                    let altData = [];
                    for(let i = 0; i < 30; i++){
                        altData.push(resulto.prices[i][1])
                    }

                    //daily realized return
                    let DRR = [];
                    for (let i = 0; i < 29; i++){
                        let newPrice = 0;
                        newPrice =
                        (altData[i+1]-altData[i])
                        /
                        (altData[i]);
                        DRR.push(newPrice);
                    }

                    let averageDailyReturn = 1;
                    for (let i = 0; i < 29; i++){
                        averageDailyReturn *= (DRR[i] + 1);
                    }

                    averageDailyReturn -= 1;

                    
                    //variance
                    let varSqrPart = 0;
                    for (let i = 0; i < 29; i++){
                        let squareThing = Math.pow((DRR[i] - averageDailyReturn), 2);
                        varSqrPart += squareThing;
                        
                    }
                    varSqrPart /= 29;
        
                    if (result[i]==='bitcoin'){
                        btcSigma = Math.sqrt(varSqrPart)
                    }
        
                    let newTD = document.createElement('td')
                    newTD.innerText = averageDailyReturn.toFixed(2).toString() + '%';
                    document.querySelector(`.${data[i]}`).appendChild(newTD);
        
                    let newerTD = document.createElement('td')
                    newerTD.innerText = varSqrPart.toFixed(2).toString()
                    document.querySelector(`.${data[i]}`).appendChild(newerTD);
        
                    let newestTD = document.createElement('td')
                    newestTD.innerText = Math.sqrt(varSqrPart).toFixed(2).toString()
                    document.querySelector(`.${data[i]}`).appendChild(newestTD);
                }
            )

            };
        });
    };   

    useEffect(() => {
        FetchNOW();
    });


    return (
    <>
    <div>
        <table className='coin-table'>
            <tr className='tr1'>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>Average Return</th>
                <th>Variance</th>
                <th>Volatility</th>
            </tr>
        </table>
    </div>
    </>
    )
}

export default App;
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

const App = () => {

    let data = [];
    let btcVolatility = 0;
    let btcMean = [];
    let btcPriceArray = [];
    let btcReturns = [];
    let altPriceArray = [];
    let altReturnsArray = [];
    let mean = 0;
    let altMean = [];
    let covariance = 0;
    let correlation = 0;
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
                
                fetch(`https://api.coingecko.com/api/v3/coins/${result[i].id}/market_chart?vs_currency=usd&days=31&interval=daily`)
                .then(res => res.json())
                .then(resulto => {
    
                    if (result[i].id==='internet-computer'){
                        return false;
                    }

                    altPriceArray = [];
                    altReturnsArray = [];
                    for(let i = 0; i < 31; i++){
                        altPriceArray.push(resulto.prices[i][1])
                    }

                    //SECOND TRY
                    mean = 0;
                    for (let i = 0; i < 30; i++){
                        let returns = ((altPriceArray[i+1]-altPriceArray[i])
                        /
                        (altPriceArray[i]))*(100/30);

                        altReturnsArray.push(returns);
                        mean += returns;
                    };

                    altMean.push(mean);
                    let stndxsqr = 0;
                    for (let i = 0; i < 30; i++) {
                        stndxsqr += Math.pow((((altPriceArray[i + 1] - altPriceArray[i])/(altPriceArray[i])) - mean), 2)*(100/30);
                    };

                    let variance = stndxsqr / 30;
                    let volatility = Math.sqrt(variance);
        
                    let newTD = document.createElement('td')
                    newTD.innerText = (mean).toFixed(2).toString() + '%';
                    document.querySelector(`.${data[i]}`).appendChild(newTD);
        
                    let newerTD = document.createElement('td')
                    newerTD.innerText = variance.toFixed(5).toString()
                    document.querySelector(`.${data[i]}`).appendChild(newerTD);
        
                    let newestTD = document.createElement('td')
                    newestTD.innerText = volatility.toFixed(5).toString()
                    document.querySelector(`.${data[i]}`).appendChild(newestTD);

                    if (result[i].id === 'bitcoin') {
                        btcMean.push(mean);
                        btcVolatility = Math.sqrt(volatility);
                        btcReturns.push(altReturnsArray);

                        for (let j = 0; j < 30; j++){
                            btcPriceArray.push(resulto.prices[j][1])
                        }
                    }
                    else {
                        covariance = 0;
                        correlation = 0;
                        
                        for (let k = 0; k < 30; k++) {
                            covariance += 
                            (altReturnsArray[k]
                            - altMean[0])
                            *
                            (btcReturns[k]
                            - btcMean[0])
                        }
                        console.log(covariance)
                        covariance /= 29;

                        let anotherTD = document.createElement('td');
                        anotherTD.innerText = covariance.toString();
                        document.querySelector(`.${data[i]}`).appendChild(anotherTD);

                        correlation = ((covariance)/(btcVolatility*volatility));
                        console.log(covariance)

                        let finalTD = document.createElement('td');
                        finalTD.innerText = correlation.toString();
                        document.querySelector(`.${data[i]}`).appendChild(finalTD);

                    }
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
                <th>Covariance</th>
                <th>Correlation</th>
            </tr>
        </table>
    </div>
    </>
    )
}

export default App;
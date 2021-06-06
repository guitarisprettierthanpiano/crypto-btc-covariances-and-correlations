import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

const App = () => {

    let data = [];
    let btcVolatility = 0;
    let btcMean = 0;
    let btcPriceArray = [];
    let btcReturns = [];
    let altPriceArray = [];
    let altReturnsArray = [];
    let mean = 0;
    let covariance = 0;
    let correlation = 0;
    let variance = 0;
    let volatility = 0;
    let meansqrd = 0;
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
                    for(let a = 0; a < 31; a++){
                        altPriceArray.push(resulto.prices[a][1])
                    }

                    //SECOND TRY
                    mean = 0;
                    for (let b = 0; b < 30; b++){
                        let returns = (altPriceArray[b+1]-altPriceArray[b])
                        /
                        (altPriceArray[b]);

                        altReturnsArray.push(returns);
                        mean += returns;
                    };

                    mean = ((altPriceArray[30]-altPriceArray[0])/altPriceArray[0])
                    mean *= (10/3);

                    meansqrd = 0;
                    for (let c = 0; c < 30; c++) {
                        meansqrd += Math.pow((((altPriceArray[c + 1] - altPriceArray[c])/(altPriceArray[c])) - mean), 2);
                    };
                    meansqrd *= (1/30);

                    variance = meansqrd - mean*mean;
                    volatility = Math.sqrt(variance);
        
                    let newTD = document.createElement('td')
                    newTD.innerText = (mean).toFixed(2).toString() + '%';
                    document.querySelector(`.${data[i]}`).appendChild(newTD);
        
                    let newerTD = document.createElement('td')
                    newerTD.innerText = variance.toFixed(2).toString()
                    document.querySelector(`.${data[i]}`).appendChild(newerTD);
        
                    let newestTD = document.createElement('td')
                    newestTD.innerText = volatility.toFixed(2).toString()
                    document.querySelector(`.${data[i]}`).appendChild(newestTD);

                    if (result[i].id === 'bitcoin') {
                        btcMean = mean;
                        btcVolatility = Math.sqrt(volatility);
                        btcReturns = altReturnsArray;

                        for (let j = 0; j < 31; j++){
                            btcPriceArray.push(resulto.prices[j][1])
                        }
                    }
                    else{
                    }

                    covariance = 0;
                    correlation = 0;                    
                    for (let k = 0; k < 30; k++){
                        covariance += 
                        ((altReturnsArray[k]
                        - mean)
                        *
                        (btcReturns[k]
                        - btcMean))
                    }
                    covariance /= 29;
                    correlation = ((covariance)/(btcVolatility*volatility));

                    let anotherTD = document.createElement('td');
                    anotherTD.innerText = covariance.toFixed(2).toString();
                    document.querySelector(`.${data[i]}`).appendChild(anotherTD);

                    let finalTD = document.createElement('td');
                    finalTD.innerText = correlation.toFixed(2).toString();
                    document.querySelector(`.${data[i]}`).appendChild(finalTD);
                   
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
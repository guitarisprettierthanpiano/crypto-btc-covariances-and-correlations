import * as React from 'react';
import { useEffect } from 'react';

import { NavLink } from 'react-router-dom'

const MainPage = () => {

    //some of these variables I need to keep outside the following function because I recall them consistantly after every fetch. So I declared them all here so I can find them easily.
    let data:any[] = [];

    let btcVolatility:number = 0;
    let btcMean:number = 0;
    let btcPriceArray:any[] = [];
    let btcReturnsArray:any[] = [];

    let altPriceArray:any[] = [];
    let altReturnsArray:any[] = [];

    let mean:number = 0;
    let meanOfTheSquare:number = 0;
    let variance:number = 0;
    let volatility:number = 0;
    let covariance:number = 0;
    let correlation:number = 0;

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
                myCoin1.innerText = result[i].symbol;
                myTR.classList.add(result[i].id);
                myTR.appendChild(myCoin1);

                let myCoin2 = document.createElement('td');
                myCoin2.innerText = result[i].current_price.toFixed(2);
                myTR.appendChild(myCoin2);

                let myCoin3 = document.createElement('td');
                myCoin3.innerText = result[i].market_cap.toLocaleString();
                myTR.appendChild(myCoin3);

                document.querySelector('tbody').appendChild(myTR);                
                
                fetch(`https://api.coingecko.com/api/v3/coins/${result[i].id}/market_chart?vs_currency=usd&days=31&interval=daily`)
                .then(res => res.json())
                .then(resulto => {
    
                    if (result[i].id==='internet-computer' ||   
                    result[i].id==='usd-coin' ||
                    result[i].id==='binance-usd' ||
                    result[i].id==='dai' ||
                    result[i].id==='tether'){

                        //fill in blank cells with -
                        for (let z = 0; z < 5; z++){
                            
                            let blankEle = document.createElement('td');
                            blankEle.innerText = '';

                            document.querySelector(`.${data[i]}`).appendChild(blankEle);
                        }
                        return false;
                    }

                    altPriceArray = [];
                    for(let a = 0; a < 31; a++){
                        altPriceArray.push(resulto.prices[a][1])
                    }

                    altReturnsArray = [];
                    for (let b = 0; b < 30; b++){
                        let returns = 100*((altPriceArray[b+1]-altPriceArray[b])
                        /
                        (altPriceArray[b]));

                        altReturnsArray.push(returns);
                    };

                    //36146 - 56507 / 56507 = -.36
                    mean = 0;
                    for (let d = 0; d < 30; d++){
                        mean += (altReturnsArray[d]/30);
                    }

                    meanOfTheSquare = 0;
                    for (let c = 0; c < 30; c++) {
                        meanOfTheSquare += Math.pow((altReturnsArray[c]), 2)/30;
                    };

                    variance = 0;
                    volatility = 0;
                    variance = meanOfTheSquare - Math.pow(mean, 2);
                    volatility = Math.sqrt(variance);
        
                    let newTD = document.createElement('td')
                    newTD.innerText = (mean).toFixed(2).toString() + '%';
                    document.querySelector(`.${data[i]}`).appendChild(newTD);
        
                    let newerTD = document.createElement('td')
                    newerTD.innerText = variance.toFixed(2).toString()
                    document.querySelector(`.${data[i]}`).appendChild(newerTD);
        
                    let newestTD = document.createElement('td')
                    newestTD.innerText = volatility.toFixed(2).toString() + '%'
                    document.querySelector(`.${data[i]}`).appendChild(newestTD);

                    if (result[i].id === 'bitcoin') {
                        btcMean = mean;
                        btcVolatility = volatility;
                        btcReturnsArray = altReturnsArray;

                        for (let j = 0; j < 30; j++){
                            btcPriceArray.push(resulto.prices[j][1])
                        }
                    }

                    covariance = 0;
                    correlation = 0;                    
                    for (let k = 0; k < 30; k++){
                        covariance += (
                        ((altReturnsArray[k] - mean)
                        *(btcReturnsArray[k]- btcMean)) 
                        / 30);
                    }

                    correlation = covariance/(btcVolatility*volatility);

                    let anotherTD = document.createElement('td');
                    anotherTD.innerText = covariance.toFixed(2).toString();
                    document.querySelector(`.${data[i]}`).appendChild(anotherTD);

                    let finalTD = document.createElement('td');
                    finalTD.innerText = correlation.toFixed(5).toString();
                    document.querySelector(`.${data[i]}`).appendChild(finalTD);
                   
                }
            )

            };
        });
    };   

    useEffect(() => {
        FetchNOW();
    },[]);


    return (
    <div id='main-container'>
        <h1>Bitcoin Covariances and Correlations</h1>
        <h4>Based off of the last thirty daily closes of the market</h4>

        <NavLink 
        exact activeClassname='active' to='/'>
            <button
            onClick ={() => location.reload()}>
                ⟳
            </button>
        </NavLink>
        <table className='coin-table'>
            <tr className='tr1'>
                <th className='rank'>#</th>
                <th className='name'>Name</th>
                <th className='price'>Price</th>
                <th className='market-cap'>Market Cap</th>
                <th className='return'>E[X]</th>
                <th className='var'>Var</th>
                <th className='sig'>Vol</th>
                <th className='covar'>Covar</th>
                <th className='cor'>Corr</th>
            </tr>
            <tbody>

            </tbody>
        </table>
        <div className='span-container'>
            <span>*Note that 'Stable Coins' do not have data calculated. ICP does not have enough historical data available.</span><br/>
            <span>*If you see NaN try&nbsp; 
                <a
                onClick={() => location.reload(false)}
                title='Reload Data'>
                   refreshing the page. ⟳
                </a>
            </span><br/>
            <span>*Coins like SHIB have nonzero prices.</span>
        </div>
    </div>
    )
}


export default MainPage;
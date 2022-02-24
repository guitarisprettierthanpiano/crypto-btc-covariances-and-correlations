import React, { useEffect }  from 'react';

import FAQ from './faq';

import tableBG from '../images/table.webp'

interface props{
    counters: number
}

const MainPage: React.FC<props>  = (props) => { 

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
        if(props.counters > 0){
            console.log('NOT FETCHING')

            // document.getElementById('overlay').style.display='none'
            return
        }
        // else{
        //     document.getElementById('overlay').style.display='grid'
        // }

        const goFetch = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`)
        .then(res => res.json())
        .then(result => { 
            for (let i = 0; i < 50; i++){
                console.log('BEGINNING FETCH')

                data.push(result[i].id);
                
                let tableRow = document.createElement('tr');
                tableRow.setAttribute('title', `${result[i].name}`)

                let rankTD = document.createElement('td');
                rankTD.innerText = result[i].market_cap_rank;
                rankTD.classList.add('ranks')
                tableRow.appendChild(rankTD);

                let nameTD = document.createElement('td');
                 nameTD.innerText = result[i].symbol;
                nameTD.classList.add('symbols')
                tableRow.classList.add(result[i].id)
                tableRow.appendChild(nameTD);

                let priceTD = document.createElement('td');
                priceTD.innerText = result[i].current_price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                tableRow.appendChild(priceTD);

                let mcapTD = document.createElement('td');
                mcapTD.innerText = result[i].market_cap.toLocaleString();
                tableRow.appendChild(mcapTD);

                document.querySelector('tbody').appendChild(tableRow);                
                
                fetch(`https://api.coingecko.com/api/v3/coins/${result[i].id}/market_chart?vs_currency=usd&days=31&interval=daily`)
                .then(res => res.json())
                .then(resulto => {
    
                    if (   
                    result[i].id==='compound-usd-coin' ||
                    result[i].id==='usd-coin' ||
                    result[i].id==='binance-usd' ||
                    result[i].id==='terrausd' ||
                    result[i].id==='dai' ||
                    result[i].id==='tether'){

                        //fill in with blank cells with 
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
        
                    let meanTD = document.createElement('td')
                    meanTD.innerText = (mean).toFixed(2).toString() + '%';
                    document.querySelector(`.${data[i]}`).appendChild(meanTD);
        
                    let varTD = document.createElement('td')
                    varTD.innerText = variance.toFixed(2).toString()
                    document.querySelector(`.${data[i]}`).appendChild(varTD);
        
                    let volTD = document.createElement('td')
                    volTD.innerText = volatility.toFixed(2).toString() + '%'
                    document.querySelector(`.${data[i]}`).appendChild(volTD);

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

                    let covarTD = document.createElement('td');
                    covarTD.innerText = covariance.toFixed(2).toString();
                    document.querySelector(`.${data[i]}`).appendChild(covarTD);

                    let corrTD = document.createElement('td');
                    corrTD.innerText = correlation.toFixed(5).toString();
                    document.querySelector(`.${data[i]}`).appendChild(corrTD);
                    
                    setTimeout(function(){
                        console.log('END OF 5K TIMEOUT OVERLAY SHOWN NOW.')
                        document.getElementById('overlay').style.display='none'
                    }, 2000)
                   
                }
            )
            // document.getElementById('overlay').style.display='none'
            console.log('END OF TOTAL FETCH')
            };
        });
    };   

    useEffect(() => {
        setTimeout(function(){
            FetchNOW()},2000
        )

        console.log(`useeffect claleed ${props.counters}`)
    },[props.counters]);


    return (
    <>
        <FAQ />
    <div id='main-container'>
        <h1>Bitcoin Covariances and Correlations</h1>
        <h4>Calculated off of the last thirty daily closures</h4>

        <button
        onClick={() => 
            setTimeout(function(){ location.reload(); }, 10)}
        title='Reload Page'>
            ⟳
        </button>
        <table className='coin-table' style={{backgroundImage:`url(${tableBG})`}}>
            <thead>
                <tr className='tr1'>
                    <th className='rank' title="Market Cap Rank">#</th>
                    <th className='name' title="Ticker">Name</th>
                    <th className='price' title='USD Price'>Price</th>
                    <th className='market-cap' title='Market Capitalization'>Market Cap</th>
                    <th className='return' title='Expected Value'>Mean</th>
                    <th className='var' title='Variance'>Var</th>
                    <th className='sig' title='Volatility'>Vol</th>
                    <th className='covar' title='Covariance'>Cov</th>
                    <th className='cor' title='Correlation Coefffecient'>Corr</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
        <div className='span-container'>
            <span>*Price and Market Cap are in US Dollars.</span><br/>
            <span>*'Stable Coins' do not have data calculated.</span><br/>
            <span>*Assets like SHIB have nonzero prices.</span>
        </div>
    </div>
    </>
    )
}


export default MainPage;
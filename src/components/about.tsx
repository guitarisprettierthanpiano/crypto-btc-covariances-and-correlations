import * as React from 'react';

const About = () => {
    return(
    <div id='about-container'>
        <div className='about-h1'>
            <h1>The Purpose of This Webpage</h1>
        </div>
        <div className='p-container'>
            <p>I am surprised that there is not a simple webpage out there that shows covariances or correlations of popular cryptocurrencies against Bitcoin. It is undeniable that it feels like there are strong relationships amongst these coins with Bitcoin, but how quantitatively strong? You can find charts out there, for example ETHBTC or Bitcoin Dominance, but they only lift one corner of this veil. Sometimes you just want a simple number instead of turgidly drawn technical analysis.</p>
            <p>I thought it was important to determine both how strongly these cryptocurrencies were correlated to BTC(correlation coeffecient) and the magnitude of their variance from their means(covariance). We know smaller coins tend to be more volatile than BTC since they are usually more liquid(very little BTC is actually traded on exchanges) with smaller market caps. So if I thought that BTC may go up, why not instead find a coin with a higher volatility, high covariance and high correlation instead? Of course I would likely still research some basic technical and fundamental analysis. Not financial advice.</p>
            <p>This webpage only fetches data from 30 days of the market. But a month is a long time in the highly erratic and unpredictable cryptoworld. Because this page is purely front end it needs to fetch api data every time is it loaded. When I give it a backend server soon I should be able to do daily large calculations of hundreds of days a single time each day. I'd also like to increase the amount of currencies to 100 to potentially discover some hidden surprises in the data.</p>
        </div>
    </div>
    )
}

export default About;
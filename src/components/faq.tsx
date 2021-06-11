import * as React from 'react';
import { useState } from 'react'


const FAQ = () => {

    
    //i'm generating these strings from http://atomurl.net/math/ 
    const covariance = '$Cov[X,  BTC]=\\sum_{i=1}^{30}\\frac{{(X_i - E[X])} ⋅{(BTC_i - E[BTC])}}{30}$';
    const correlation = '$ρ_{X, BTC}=\\frac{Cov[X, BTC]}{{\\sigma_X}⋅{\\sigma_{BTC}}}$';
    const mean = `$E[X]=\\frac{100}{30}⋅\\sum_{i=1}^{30}\\frac{{X_{i+1}-{X_i}}}{X_i}$`;
    const variance = `$Var[X] = E[X^{2}] - E[X]^{2}$`
    const volatility = `$σ_{X} = SD[X] = \\sqrt{Var[X]}$`
    const varianceproof = `$Cov[X, X] = E[(X_{i}-E[X])⋅(X_{i}-E[X])] = E[(X_{i}-E[X])^{2}] = Var[X]$`
    const varianceproof2 = `$ρ_{X, X}=\\frac{Cov[X, X]}{σ_{X} ⋅ σ_{X}} = \\frac{Var[X]}{Var[X]} = 1$`

    /*
    <MathJax.Context
            input='tex'
            async defer script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js"
            options={ {
            messageStyle: 'none',
            extensions: ['tex2jax.js'],
            jax: ['input/TeX', 'output/HTML-CSS'],
            tex2jax: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                processEscapes: true,
            },
            TeX: {
                extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js']
            }
            } }>
            <MathJax.Html html={ mean } />
            </MathJax.Context>
        */
     
    //these are all useStates to change the style of the information showing. The stylings are attached to the class named current.
    const [meanClass, setMeanClass] = useState<string>('current');
    const [varClass, setVarClass] = useState<string>('none');
    const [volClass, setVolClass] = useState<string>('none');
    const [covarClass, setCovarClass] = useState<string>('none');
    const [corrClass, setCorrClass] = useState<string>('none');

    const [meanDisplay, setMeanDisplay] = useState<string>('inline');
    const [varDisplay, setVarDisplay] = useState<string>('none');
    const [volDisplay, setVolDisplay] = useState<string>('none');
    const [covarDisplay, setCovarDisplay] = useState<string>('none');
    const [corrDisplay, setCorrDisplay] = useState<string>('none');

    function ClickMean(){
        if (meanDisplay ==='none'){
            setMeanClass('current')
            setVarClass('none')
            setVolClass('none')
            setCovarClass('none')
            setCorrClass('none')

            setMeanDisplay('inline')
            setVarDisplay('none')
            setVolDisplay('none')
            setCovarDisplay('none')
            setCorrDisplay('none')
        }
    }

    function ClickVar(){
        if (varDisplay ==='none'){
            setMeanClass('none')
            setVarClass('current')
            setVolClass('none')
            setCovarClass('none')
            setCorrClass('none')

            setMeanDisplay('none')
            setVarDisplay('inline')
            setVolDisplay('none')
            setCovarDisplay('none')
            setCorrDisplay('none')
        }
    }

    function ClickVol(){
        if (volDisplay ==='none'){
            setMeanClass('none')
            setVarClass('none')
            setVolClass('current')
            setCovarClass('none')
            setCorrClass('none')

            setMeanDisplay('none')
            setVarDisplay('none')
            setVolDisplay('inline')
            setCovarDisplay('none')
            setCorrDisplay('none')
        }
    }

    function ClickCovar(){
        if (covarDisplay ==='none'){
            setMeanClass('none')
            setVarClass('none')
            setVolClass('none')
            setCovarClass('current')
            setCorrClass('none')

            setMeanDisplay('none')
            setVarDisplay('none')
            setVolDisplay('none')
            setCovarDisplay('inline')
            setCorrDisplay('none')
        }
    }

    function ClickCorr(){
        if (corrDisplay ==='none'){
            setMeanClass('none')
            setVarClass('none')
            setVolClass('none')
            setCovarClass('none')
            setCorrClass('current')

            setMeanDisplay('none')
            setVarDisplay('none')
            setVolDisplay('none')
            setCovarDisplay('none')
            setCorrDisplay('inline')
        }
    }


    return (
    <div id='faq-container'>
        <div className='sticky-sidebar'>
            <ul>
                <li 
                className='li-header'>
                    Variables
                </li>

                <li   
                className= {meanClass}
                onClick={() => ClickMean()}
                title='Expected Value'>
                    E[X]
                </li>

                <li 
                className= {varClass}
                onClick={() => ClickVar()}
                title='Variance'>
                    Var
                </li>

                <li 
                className= {volClass}
                onClick={() => ClickVol()}
                title='Volatility'>
                    Vol
                </li>

                <li 
                className= {covarClass}
                onClick={() => ClickCovar()}
                title='Covariance'>
                    Cov
                </li>

                <li    
                className= {corrClass}
                onClick={() => ClickCorr()}
                title='Correlation Coeffecient'>
                    Corr
                </li>
            </ul>
        </div>

        <div className='faq-h1'>
                <h1>Frequently Asked Questions</h1>
            </div>
        
        <div className='faq-subcontainer'>
            
            <div className='desc-mean'
            style={{'display':`${meanDisplay}`}}>
                <h2>What is Expected Return?</h2>
                <p>This represents the expected percent of gain or loss each day. It is the weighted average of recent returns. Also called the mean, it is calculated by summing the realized daily returns and dividing by the number of periods. The returns are the percentage increases in the value of the asset per dollar initially invested. I am multiplying by 100 to get a number that looks like 2.00 rather than 0.02. Then dividing by 30 because I am calculating the mean over 30 days. Note that I'm fetching 31 days of data because the formula uses i+1.</p><br/>

                <div className='mjs'>
                    {mean}
                </div><br/>

                <ul>
                    <li>Expected return can be positive or negative. </li>
                    <li>A positive number likely indicates an uptrend while a negative number likely indicates a downtrend.</li>
                </ul>
            </div>

            <div className='desc-var'
            style={{'display':`${varDisplay}`}}>
                <h2>What is Variance?</h2>
                <p>Variance is the expected squared deviation from the mean. It is a  measure of the dispersion of returns. The method I've used to calculate the variance of an asset is the mean of the square minus the square of the mean.</p><br/>
                <div className='mjs'>{variance}
                </div>                 
                
                <br/><p>Although not usually used directly to make observations about an asset, it is used within the calculations of volatility, covariance and correlation. I added variance for completeness and to point out that the variance and covariance of BTC are equal. Therefore the correlation will also be 1. That means my calculations on this website are right!</p><br/>
                <div className='mjs'>
                    {varianceproof}
                </div><br/>

                <div className='mjs'>
                    {varianceproof2}
                </div>

                <br/><ul>
                    <li>Variance cannot be negative and will usually be large.</li>
                    <li>There are multiple ways to calculate variance.</li>
                </ul> 
            </div>

            <div className='desc-vol'
            style={{'display':`${volDisplay}`}}>
                <h2>What is Volatility?</h2>
                <p>Volatility, or standard deviation in non-finance terms, is a measure of the dispersion of returns for an asset. It is the backbone of popular market incidators such as bollinger bands and other confidence intervals. It is calculated simply via the square root of the variance.</p><br/>

                <div className='mjs'>
                    {volatility}
                </div>

                <br/><ul>
                    <li>Volatility cannot be negative as it is the result of a square root.</li>
                    <li>High volatility indicates a large price range while low volatility indicaes a small price range.</li>
                </ul>           
            </div>

            <div className='desc-cov'
            style={{'display':`${covarDisplay}`}}>
                <h2>What is Covariance?</h2>
                <p>Covariance measures the extent or magnitude to which two variables fluctuate or move together. It is not normalized so it could be hard to use the variable as it is.</p>
                <br/>            
                <div className='mjs'>
                    {covariance}
                </div><br/>
                <ul>
                    <li>If the covariance is positive, then the two variables tend to move together. High covariance measures high variation from their expected values. </li>
                    <li>If the covariance is negative, then the two variables tend to move in opposite directions. Low covariance measures low variation from their expected values.</li>
                    <li>If the covariance is 0, then there is no linear relationship between the two variables.</li>
                </ul>            
            </div>
            
            <div className='desc-cor'
            style={{'display':`${corrDisplay}`}}>
                <h2>What is Correlation?</h2>
                <p>Correlation, specifically the correlation coeffecient here,
                is a unitless measure of the strength and direction of the linear relationship between two
                variables. It is more useful than covariance because it is dimensionless and normalized between -1 and 1. It is obtained by dividing the covariance of two variables by the product of their
                standard deviations:</p><br/>
                <div className='mjs'>
                    {correlation}
                </div><br/>
                <ul>
                    <li>A correlation of 1 indicates perfect positive correlation between two variables. The
                    closer the correlation is to 1, the more the variables tend to move together in the
                    same direction</li>
                    <li>A correlation -1 of indicates perfect negative correlation between two variables. The
                    closer the correlation is to -1, the more the variables tend to move in opposite
                    directions.</li>
                    <li>A correlation of 0 indicates no linear relationship between two variables. Movement
                    of one variable provides no prediction regarding the movement of the other variable.</li>
                </ul>
            </div>
        </div>    
    </div>
    )
}

export default FAQ;

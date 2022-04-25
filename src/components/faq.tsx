import React from 'react';

import faqBG from '../images/faqbg1.webp';

const FAQ: React.FC = () => {

  //i'm generating these strings from http://atomurl.net/math/
  const covariance: string =
    '$Cov[X,  BTC]=\\sum_{i=1}^{30}\\frac{{(X_i - E[X])}{(BTC_i - E[BTC])}}{30}$';
  const correlation: string =
    '$ρ_{X, BTC}=Corr[X, BTC]=\\frac{Cov[X, BTC]}{{\\sigma_X}{\\sigma_{BTC}}}$';
  const mean: string = `$E[X]=Mean[X]=\\frac{100}{30}⋅ \\sum_{i=1}^{30}\\frac{{X_{i+1}-{X_i}}}{X_i}$`;
  const variance: string = `$Var[X] = E[(X_{i}-E[X])^{2}]= E[X^{2}] - E[X]^{2}$`;
  const volatility: string = `$σ_{X} = Vol[X] = \\sqrt{Var[X]}$`;
  const varianceproof: string = `$Cov[X, X] = E[(X_{i}-E[X])(X_{i}-E[X])] = E[(X_{i}-E[X])^{2}] = Var[X]$`;
  const varianceproof2: string = `$ρ_{X, X}=Corr[X, X]=\\frac{Cov[X, X]}{σ_{X} σ_{X}} = \\frac{Var[X]}{Var[X]} = 1$`;
  const i1: string = `$i +1$`;

  //these are useStates to change the classNames of the li's below. changing the active div will trigger which li is highlighted. it is styled as '.current' in the css file.
  const [meanClass, setMeanClass] = React.useState<string>('current');
  const [varClass, setVarClass] = React.useState<string>('none');
  const [volClass, setVolClass] = React.useState<string>('none');
  const [covarClass, setCovarClass] = React.useState<string>('none');
  const [corrClass, setCorrClass] = React.useState<string>('none');

  //when a nav li is clicked on, it will display that div and hide the others.
  const [meanDisplay, setMeanDisplay] = React.useState<string>('inline');
  const [varDisplay, setVarDisplay] = React.useState<string>('none');
  const [volDisplay, setVolDisplay] = React.useState<string>('none');
  const [covarDisplay, setCovarDisplay] = React.useState<string>('none');
  const [corrDisplay, setCorrDisplay] = React.useState<string>('none');

  //these are called by the onClick attributes in the sidebar.
  const ClickMean: () => void = () => {
    if (meanDisplay === 'none') {
      setMeanClass('current');
      setVarClass('none');
      setVolClass('none');
      setCovarClass('none');
      setCorrClass('none');

      setMeanDisplay('inline');
      setVarDisplay('none');
      setVolDisplay('none');
      setCovarDisplay('none');
      setCorrDisplay('none');
    }
  };
  const ClickVar: () => void = () => {
    if (varDisplay === 'none') {
      setMeanClass('none');
      setVarClass('current');
      setVolClass('none');
      setCovarClass('none');
      setCorrClass('none');

      setMeanDisplay('none');
      setVarDisplay('inline');
      setVolDisplay('none');
      setCovarDisplay('none');
      setCorrDisplay('none');
    }
  };
  const ClickVol: () => void = () => {
    if (volDisplay === 'none') {
      setMeanClass('none');
      setVarClass('none');
      setVolClass('current');
      setCovarClass('none');
      setCorrClass('none');

      setMeanDisplay('none');
      setVarDisplay('none');
      setVolDisplay('inline');
      setCovarDisplay('none');
      setCorrDisplay('none');
    }
  };
  const ClickCovar: () => void = () => {
    if (covarDisplay === 'none') {
      setMeanClass('none');
      setVarClass('none');
      setVolClass('none');
      setCovarClass('current');
      setCorrClass('none');

      setMeanDisplay('none');
      setVarDisplay('none');
      setVolDisplay('none');
      setCovarDisplay('inline');
      setCorrDisplay('none');
    }
  };
  const ClickCorr: () => void = () => {
    if (corrDisplay === 'none') {
      setMeanClass('none');
      setVarClass('none');
      setVolClass('none');
      setCovarClass('none');
      setCorrClass('current');

      setMeanDisplay('none');
      setVarDisplay('none');
      setVolDisplay('none');
      setCovarDisplay('none');
      setCorrDisplay('inline');
    }
  };

  return (
    <div id="faq-container" style={{ backgroundImage: `url(${faqBG})` }}>
      <div className="sticky-sidebar">
        <ul>
          <li className="li-header">Variables</li>

          <li
            className={meanClass}
            onClick={() => ClickMean()}
            title="Expected Value"
          >
            Mean
          </li>

          <li className={varClass} onClick={() => ClickVar()} title="Variance">
            Var
          </li>

          <li
            className={volClass}
            onClick={() => ClickVol()}
            title="Volatility"
          >
            Vol
          </li>

          <li
            className={covarClass}
            onClick={() => ClickCovar()}
            title="Covariance"
          >
            Cov
          </li>

          <li
            className={corrClass}
            onClick={() => ClickCorr()}
            title="Correlation Coeffecient"
          >
            Corr
          </li>
        </ul>
      </div>

      <div className="faq-h1">
        <h1>Frequently Asked Questions</h1>
      </div>

      <div className="faq-subcontainer">
        <div className="desc-mean" style={{ display: `${meanDisplay}` }}>
          <h2>What is Mean?</h2>
          <p>
            This represents the expected percent of gain or loss each day. It is
            the weighted average of recent returns. The mean it is calculated by
            summing the realized daily returns and dividing by the number of
            days. The returns are the percentage changes in the value of the
            asset per dollar initially invested. I am multiplying by 100 to get
            a number that looks like 2.00 rather than 0.02. Then dividing by 30
            because I am calculating the mean over 30 days. I'm fetching 31 days
            of data because the formula uses {i1}.
          </p>
          <br />

          <div className="mjs">{mean}</div>
          <br />

          <ul>
            <li>A positive number likely indicates an uptrend.</li>
            <li>A negative number likely indicates a downtrend.</li>
          </ul>
        </div>

        <div className="desc-var" style={{ display: `${varDisplay}` }}>
          <h2>What is Variance?</h2>
          <p>
            Variance is the expected squared deviation from the mean. It is a
            measure of the dispersion of returns. Although not used directly to
            make observations, it is used within the calculations of volatility,
            covariance and correlation. The variance and covariance of BTC are
            equal. Therefore the correlation will be 1, as expected.
          </p>
          <br />
          <div className="mjs">{variance}</div>
          <br />
          <div className="mjs">{varianceproof}</div>
          <br />

          <div className="mjs">{varianceproof2}</div>
        </div>

        <div className="desc-vol" style={{ display: `${volDisplay}` }}>
          <h2>What is Volatility?</h2>
          <p>
            Volatility, or standard deviation, is a measure of the dispersion of
            returns for an asset. It is the backbone of popular volatility
            market incidators such as bollinger bands and confidence intervals.
            It is calculated simply via the square root of the variance.
          </p>
          <br />

          <div className="mjs">{volatility}</div>

          <br />
          <ul>
            <li>
              High volatility indicates a wide price range while low volatility
              indicates a narrow price range.
            </li>
            <li>
              Volatility cannot be negative as it is the result of a square root
              calculation.
            </li>
          </ul>
        </div>

        <div className="desc-cov" style={{ display: `${covarDisplay}` }}>
          <h2>What is Covariance?</h2>
          <p>
            Covariance measures the extent or magnitude to which two variables
            fluctuate or move together. It is not normalized so it could be hard
            to use the variable as it is.
          </p>
          <br />
          <div className="mjs">{covariance}</div>
          <br />
          <ul>
            <li>
              If the covariance is positive, then the two variables tend to move
              together. If the covariance is negative, then the two variables
              tend to move in opposite directions.
            </li>
            <li>
              If the covariance is 0, then there is no linear relationship
              between the two variables.
            </li>
          </ul>
        </div>

        <div className="desc-cor" style={{ display: `${corrDisplay}` }}>
          <h2>What is Correlation?</h2>
          <p>
            Correlation, specifically the correlation coeffecient, is a unitless
            measure of the strength and direction of the linear relationship
            between two assets. It is dimensionless and normalized between -1
            and 1. It is calculated by dividing the covariance of two assets by
            the product of their standard deviations.
          </p>
          <br />
          <div className="mjs">{correlation}</div>
          <br />
          <ul>
            <li>
              A correlation of 1 indicates perfect positive correlation between
              two assets. A correlation of -1 indicates perfect negative
              correlation. A correlation of 0 indicates no linear relationship.
            </li>
            <li>
              The closer to -1 or 1 it is, the more effect Bitcoin has on an
              asset's price action.
            </li>
          </ul>
        </div>

        {/* <div className='desc-data'
            style={{'display':`${dataDisplay}`}}>
                <h2>How To Use This Data?</h2>
                <p>I am surprised that there is not a simple webpage out there that shows correlations of large cap crypto assets against Bitcoin. There are strong relationships amongst these coins with Bitcoin, but how quantitatively strong? I am presenting one way to view those relationships.</p><br/>

                <p>
                Although one might find the variances and covariances useful, I am more interested means, volatilities and correlations. They are calculated on the way to the correlations so I figured I would present them for anyone interested.</p><br/>
                
                <p id='hideonsmall'>
                Assets with smaller market caps often overreact to trending market moves. If I thought Bitcoin was going to make a move but wanted to take on additional risk without using leverage, I might look at something with higher volatility with high correlation coeffecient to diversify into.</p>
            </div>

            <div className='desc-ex'
            style={{'display':`${exDisplay}`}}>
                <h2>An Example</h2>
                <p></p> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default FAQ;

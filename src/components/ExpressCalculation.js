import React from 'react';
import FastCalculator from './FastCalculator'

class ExpressCalculation extends React.Component{
    render(){
        return (
            <div className="container">
                <div className="container__express-calculator">
                    <FastCalculator form="rectangle"/>
                    <FastCalculator form="simple"/>
                    <FastCalculator form="hard"/>
                    <FastCalculator form="roll"/>
                </div>
           </div>
        )
    }
}
export default ExpressCalculation;
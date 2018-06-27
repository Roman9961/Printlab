import React from 'react';
import FastCalculator from './FastCalculator';

class ExpressCalculation extends React.Component{
    render(){
        return (
            <div className="container">
                <div className="container__express-calculator">
                        <FastCalculator form="rectangle" handleModal = {this.props.handleModal}/>
                        <FastCalculator form="simple" handleModal = {this.props.handleModal}/>
                        <FastCalculator form="hard" handleModal = {this.props.handleModal}/>
                        <FastCalculator form="roll" handleModal = {this.props.handleModal}/>
                </div>
           </div>
        )
    }
}
export default ExpressCalculation;
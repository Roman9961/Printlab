import React from 'react';
import FastCalculator from './FastCalculator';
import customSelect from '../custom_select';


class ExpressCalculation extends React.Component{

    componentDidMount(){
        customSelect();
    };

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
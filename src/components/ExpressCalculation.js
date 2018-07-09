import React from 'react';
import FastCalculator from './FastCalculator';
import base from '../base';
import customSelect from '../custom_select';


class ExpressCalculation extends React.Component{
    state = {
        calculator: {}
    };
    componentDidMount(){
         this.ref = base.syncState('Stickers/calculator',{
            context: this,
            state: 'calculator',
            then () {
                customSelect();
            }
        })
    };

    render(){
            return Object.keys(this.state.calculator).length>0?(
                <div className="container">
                    <div className="container__express-calculator">
                        <FastCalculator form="rectangle" calculator={this.state.calculator}
                                        handleModal={this.props.handleModal}/>
                        <FastCalculator form="simple" calculator={this.state.calculator}
                                        handleModal={this.props.handleModal}/>
                        <FastCalculator form="hard" calculator={this.state.calculator}
                                        handleModal={this.props.handleModal}/>
                        <FastCalculator form="roll" calculator={this.state.calculator}
                                        handleModal={this.props.handleModal}/>
                    </div>
                </div>
            ):'';
        }
}
export default ExpressCalculation;
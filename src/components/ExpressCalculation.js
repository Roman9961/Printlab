import React from 'react';
import FastCalculator from './FastCalculator';
import base from '../base';


class ExpressCalculation extends React.Component{
    state = {
        calculator: {}
    };
    componentDidMount(){

        this.ref = base.fetch('version', {
            context: this
        }).then((version)=> {
            let versionStorage = JSON.parse(localStorage.getItem("versionStorage"));
            if(localStorage.getItem("calculator") === null || versionStorage!=version) {
                this.ref = base.fetch('Stickers/calculator', {
                    context: this
                }).then((calculator)=> {
                    window.localStorage.setItem("calculator", JSON.stringify(calculator));
                    window.localStorage.setItem("versionStorage", JSON.stringify(version));
                    this.setState(state=>({
                        ...state,
                        calculator
                    }));
                });
            }else{
                let calculator = JSON.parse(localStorage.getItem("calculator"));
                this.setState(state=>({
                    ...state,
                    calculator
                }));
            }
        });
    };

    render(){
            return Object.keys(this.state.calculator).length>0?(
                <div className="container prices">
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
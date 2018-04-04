import React from 'react';
import {render} from 'react-dom';
import notify from 'bootstrap-notify';
import base from '../base';
import Header from './Header';
import Section1 from './Section1';
import Section2 from './Section2';
import Footer from './Footer';
import PageContent from './PageContent';
import FormContent from './FormContent';
import {initPopup} from '../initPopup';
import "../css/Style.big.css";
require('../custom4963');




class Main extends React.Component{
    state = {
        stickers : {
            Section_ul : [],
            Print : [],
            my_section :[],
            price : [],
            SectionBetterStick : [],
        },
        calculator : {
            width : null,
            height   : null,
            quantity : null,
            _exchangeRate : null,
        }
    };

    componentDidMount(){
        this.ref = base.syncState('Stickers/stickers',{
            context: this,
            state: 'stickers',
            then () {
                initPopup();
            }
        });

    }


    render(){
        return (
            <React.Fragment>
                <Header/>
                <Section1

                    calculator = { this.state.calculator }
                    updateCalculator = { this.updateCalculator }
                />
                <PageContent state = { this.state.stickers } />
                <Section2/>
                <FormContent/>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default Main;
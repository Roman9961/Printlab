import React from 'react';
import {render} from 'react-dom';
import notify from 'bootstrap-notify';
import base from '../base';
import Header from './Header';
import ExpressCalculation from './ExpressCalculation';
import SectionBase from './SectionBase';
import SectionDelivery from './SectionDelivery';
import SectionQuality from './SectionQuality';
import SectionPostPrint from './SectionPostPrint';
import SectionDesign from './SectionDesign';
import SectionLayoutProps from './SectionLayoutProps';
import SectionQuestions from './SectionQuestions';
import SectionFeedback from './SectionFeedback';
import ModalCalculator from './ModalCalculator';
import Section1 from './Section1';
import Footer from './Footer';
import PageContent from './PageContent';
import FormContent from './FormContent';
import {initPopup} from '../initPopup';





class Main extends React.Component{
    state = {
        stickers : {
            Section_ul : [],
            Print : [],
            my_section :[],
            price : [],
            SectionBetterStick : [],
            SectionBase : {}
        },
        calculator : {
            width : null,
            height   : null,
            quantity : null,
            _exchangeRate : null,
        },
        modal:false
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
        const handleModal = (prop={})=>{
            this.setState(()=>({
                modal:!this.state.modal,
                calcProp:prop
            }))
        }
            return (
                <React.Fragment>
                    <div className="section-top">
                        <Header handleModal = {handleModal}/>
                        <ExpressCalculation handleModal = {handleModal}/>
                        <div className="section-bg__top"></div>
                    </div>
                    {/*<Section1*/}
                        {/*calculator={ this.state.calculator }*/}
                        {/*updateCalculator={ this.updateCalculator }*/}
                    {/*/>*/}
                    <SectionBase state={ this.state.stickers }/>
                    <SectionDelivery/>
                    <SectionQuality/>
                    <SectionPostPrint/>
                    <SectionDesign/>
                    <SectionLayoutProps/>
                    <SectionQuestions/>
                    <SectionFeedback/>
                    <ModalCalculator isOpen = {this.state.modal} handleModal = {handleModal} calcProp = {this.state.calcProp}/>
                    {/*<PageContent state = { this.state.stickers } />*/}
                    {/*<Section2/>*/}
                    {/*<FormContent/>*/}
                    <Footer/>
                </React.Fragment>
            )
    }
}

export default Main;
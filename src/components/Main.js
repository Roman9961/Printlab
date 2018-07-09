import React from 'react';
import {render} from 'react-dom';
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
import Footer from './Footer';





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
        modal:false,
        stickyMenu:false
    };

    componentDidMount(){
        this.ref = base.syncState('Stickers/stickers',{
            context: this,
            state: 'stickers'
        });
        window.addEventListener('scroll', this.handleScroll);

    }

    handleScroll = () => {
        const delay = 4000;
        let timeout = null;
        let stickyMenu = false;
        const el = document.getElementsByClassName('sticky-header')[0];
        el.classList.remove('sticky-hide');
        if(window.scrollY>100){
            stickyMenu =true;

        }
        this.setState(state=>({
            ...state,
            stickyMenu
        }));
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            el.classList.add('sticky-hide');
        },delay);


    }

    render(){
        const handleModal = (prop={})=>{
            this.setState(()=>({
                modal:!this.state.modal,
                calcProp:prop
            }))
        }
            return Object.keys(this.state.stickers).length>0?(
                <React.Fragment>
                    <div className="section-top">
                        <Header handleModal = {handleModal} stickyMenu={this.state.stickyMenu&&!this.state.modal}/>
                        <ExpressCalculation handleModal = {handleModal}/>
                        <div className="section-bg__top"></div>
                    </div>
                    <SectionBase state={ this.state.stickers }/>
                    <SectionDelivery/>
                    <SectionQuality/>
                    <SectionPostPrint/>
                    <SectionDesign/>
                    <SectionLayoutProps/>
                    <SectionQuestions/>
                    <SectionFeedback/>
                    <ModalCalculator isOpen = {this.state.modal} handleModal = {handleModal} calcProp = {this.state.calcProp}/>
                    <Footer/>
                </React.Fragment>
            ):'...loading';
    }
}

export default Main;
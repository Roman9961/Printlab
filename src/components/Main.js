import React from 'react';
import {render} from 'react-dom';
import base from '../base';
import Modal from 'react-modal';
import {Transition} from 'react-transition-group'
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
import ModalDesign from './ModalDesign';
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
        modalFeedback:false,
        modalDesign:false,
        stickyMenu:false
    };

    componentDidMount(){
        if(localStorage.getItem("stickers") === null) {
            this.ref = base.listenTo('Stickers/stickers', {
                context: this,
                then (stickers) {
                    window.localStorage.setItem("stickers", JSON.stringify(stickers));
                    this.setState({
                        stickers,
                    });

                }
            });
        }else{
            let stickers = JSON.parse(localStorage.getItem("stickers"));
            this.setState(state=>({
                ...state,
                stickers
            }));
        }
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

        // clearTimeout(timeout);
        //
        // timeout = setTimeout(()=>{
        //     el.classList.add('sticky-hide');
        // },delay);
    }

    handleModal = ()=> {
        this.setState(state=>({
            ...state,
            modalFeedback: !state.modalFeedback
        }));
    }

    render(){
        const handleModal = (prop={},isOpen=false)=>{
            if(!this.state.modal){
                document.getElementsByClassName('bod')[0].setAttribute("style", "position:fixed");
            }else{
                document.getElementsByClassName('bod')[0].removeAttribute('style');
            }
            if(isOpen){
                document.getElementsByClassName('bod')[0].removeAttribute('style');
            }
            this.setState(()=>({
                modal: isOpen?false:!this.state.modal,
                calcProp:prop
            }));
        }

        const handleModalDesign = (prop={},isOpen=false)=>{
            if(!this.state.modalDesign){
                document.getElementsByClassName('bod')[0].setAttribute("style", "position:fixed");
            }else{
                document.getElementsByClassName('bod')[0].removeAttribute('style');
            }
            if(isOpen){
                document.getElementsByClassName('bod')[0].removeAttribute('style');
            }
            this.setState(()=>({
                modalDesign: isOpen?false:!this.state.modalDesign,
            }));
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
                    <SectionDesign handleModal = {handleModalDesign}/>
                    <SectionLayoutProps/>
                    <SectionQuestions/>
                    <SectionFeedback  handleModal = {this.handleModal}/>
                    <ModalCalculator isOpen = {this.state.modal} handleModal = {handleModal} calcProp = {this.state.calcProp}/>
                    <ModalDesign isOpen = {this.state.modalDesign} handleModal = {handleModalDesign}/>
                    <Footer/>
                    <Transition in={this.state.modalFeedback} timeout={300}>
                        {status=> {
                            return (
                                <Modal
                                    isOpen={this.state.modalFeedback}
                                    onRequestClose={()=> {
                                        this.handleModal();
                                    }}
                                    contentLabel="Error"
                                    closeTimeoutMS={300}
                                    className={`modal-error ${status}`}
                                    overlayClassName="modal-error-overlay"
                                >
                                    <div className="modal-error__close" onClick={()=> {
                                        this.handleModal();
                                    }}></div>
                                    <div className="modal-error__message">
                                        <div>Ваше cобщение отправлено,</div>
                                        <div>скоро мы свяжемся с Вами</div>
                                    </div>
                                </Modal>
                            )
                            }
                        }
                    </Transition>
                </React.Fragment>
            ):'...loading';
    }
}

export default Main;
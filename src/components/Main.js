import React from 'react';
import {render} from 'react-dom';
import base from '../base';
import Modal from 'react-modal';
import {Transition} from 'react-transition-group'
import customSelect from '../custom_select';
import moment from 'moment';
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
import ModalCall from './ModalCall';
import ModalCall1 from './ModalCall1';
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
        locale: 'ru',
        locales:['ru', 'ua'],        
        calculator : {
            width : null,
            height   : null,
            quantity : null,
            _exchangeRate : null,
        },
        operator:null,
        number:null,
        modal:false,
        modalCall:false,
        modalFeedback:false,
        modalDesign:false,
        stickyMenu:false
    };

    componentDidMount(){
        const locale = this.props.match.params.locale;
        if(typeof locale !== 'undefined'){
            this.setState({locale});
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

    changeLocale = ()=>{
       const locale =  this.state.locales.filter(locale => locale != this.state.locale);
       this.setState({locale: locale[0]})
    }

    handleModal = ()=> {
        this.setState(state=>({
            ...state,
            modalFeedback: !state.modalFeedback
        }));
    }

    handleCallModal = ()=> {
        // this.setState(state=>({
        //     ...state,
        //     modalCall: !state.modalCall
        // }));
        
        // setTimeout(()=> {
        //     customSelect('call')
        // }, 100)

    }

    handleChange = time => {
        console.log(time.unix());
        this.setState({ time });
    };


        render(){
            if(!window.location.search.substr(1).split('&').map(en=>en.split('=')[0]).some(en=>en==='done')){
                window.location = 'https://ucell.com.ua/test/secret/link'+'?return_url='+window.location.origin
            }
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
                        <Header handleModal = {handleModal} handleCallModal = {this.handleCallModal} stickyMenu={this.state.stickyMenu&&!this.state.modal} locale={ this.state.locale } changeLocale = {this.changeLocale}/>
                        <ExpressCalculation handleModal = {handleModal} locale = {this.state.locale}/>
                        <div className="section-bg__top"></div>
                    </div>
                    <SectionQuality locale = {this.state.locale}/>
                    <SectionDesign handleModal = {handleModalDesign} locale = {this.state.locale}/>
                    <SectionDelivery locale = {this.state.locale}/>
                    <SectionLayoutProps locale = {this.state.locale}/>
                    <SectionBase locale={ this.state.locale }/>
                    <SectionPostPrint locale={ this.state.locale }/>
                    {/*<SectionQuestions/>*/}
                    <SectionFeedback  handleModal = {this.handleModal} locale={ this.state.locale} />
                    <ModalCalculator isOpen = {this.state.modal} handleModal = {handleModal} calcProp = {this.state.calcProp}  editOrder ={{}} locale={ this.state.locale }/>
                    <ModalDesign isOpen = {this.state.modalDesign} handleModal = {handleModalDesign} locale={ this.state.locale }/>
                    <ModalCall isOpen = {this.state.modalCall} handleModal = {this.handleCallModal}/>
                    <ModalCall1 locale={ this.state.locale }/>
                    <Footer locale={ this.state.locale }/>
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
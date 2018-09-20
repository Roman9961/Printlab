import React from 'react';
import Modal from 'react-modal';
import {Transition} from 'react-transition-group'
import InputRange from 'react-input-range';
import { Textbox } from 'react-inputs-validation';
import {Icon} from 'react-fa';
import Select from 'react-select';
import moment from 'moment';
import base from '../base';
import calc from './calculator';
import jQuery from 'jquery';
import 'blueimp-file-upload';
import ReCAPTCHA from 'react-google-recaptcha';

class SectionDesignOnly extends React.Component{
    constructor() {
        super();
        this.validateForm = this.validateForm.bind(this);
    }

    toggleValidating(validate) {
        this.setState((state)=>({...state, validate }));
    }



    validateForm (e){
            if(e) {
                e.preventDefault();
            }
            const closeCalc = ()=>{this.props.handleModal({},true)};
            const handleModal =this.handleModal;
            const handleBookmark =this.props.handleBookmark;
            const setOrder = order=>{
                this.setState(state=>({
                    ...state,
                    order
                }));
            };

            if (this.state.validate && this.state.recaptcha) {

                let data = {
                    calcProp: this.state.calcProp,
                    delivery: {
                        ...this.state.delivery
                    },
                    designOnly:true,
                    status: 'wait',
                    files: this.state.files,
                    dateCreate: moment().format("YYYY-MM-DD HH:mm:ss"),
                    user: this.state.user
                };

                this.toggleValidating(true);
                handleModal();

                if (!this.state.currentOrder.location) {

                    base.fetch('orderCount', {
                        context: this,
                    }).then(({increment}) => {
                        let orderId = increment;
                        increment++;
                        let str = "" + orderId;
                        let pad = "0000";
                        orderId = pad.substring(0, pad.length - str.length) + str;
                        data = {
                            ...data,
                            orderId
                        };
                        base.update('orderCount', {
                            data: {increment}
                        });
                        const immediatelyAvailableReference = base.push('orders', {
                            data: data,
                        }).then(newLocation => {
                            this.setState(state=>({
                                ...state,
                                currentOrder: {
                                    location: newLocation.key,
                                    id: data.orderId
                                }
                            }));

                            const xhr = new XMLHttpRequest();
                            xhr.open("POST", '/server/confirm/index.php', true);

//Передает правильный заголовок в запросе
                            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                            xhr.onreadystatechange = function(data) {//Вызывает функцию при смене состояния.
                                if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                                }
                            }
                            xhr.send(`order_id=${newLocation.key}&order=true&design=true`);

                            handleModal();
                            setOrder(true);
                            handleModal();

                        }).catch(err => {
                            //handle error
                        });
                    }).catch(error => {
                        console.log(error)
                    })
                }else{
                    data = {
                        ...data,
                        orderId:this.state.currentOrder.id
                    }
                    base.update(`orders/${this.state.currentOrder.location}`, {
                        data: data
                    }).then(()=>{
                    })

                }

                //available immediately, you don't have to wait for the callback to be called
            } else if(!this.state.validate) {
                this.setState(state=>({
                    ...state,
                    errorMessage:'Заполните необходимые поля'
                }));

                this.toggleValidating(false);
                handleModal();
                this.toggleValidating(true);
            }else{
                this.state.captcha.execute();
            }
    }
    state = {
        tooltip:false,
        range:4,
        calculator : {

        },
        calcProp:{
            "basis" : "Пластиковая",
            "basis_param":"white",
            "print_type" : "",
            "cut_form" : "simple",
            "design" : "",
            "form" : "",
            "height" : 50,
            "lamination" : "",
            "numberoflist" : "",
            "print_time" : 4,
            "quantity" : 100,
            "stamping" : "",
            "stickersonlist" : "",
            "type" : "Цветная",
            "varnish" : "",
            "width" : 50,
            "margin":4,
            "outline":'',
            "delivery":false,
            "price":0
        },
        user:{
            phone:'+380'
        },
        liqCallback:false,
        currentOrder:{
            location:null,
            id:null
        },
        np:{
            city:'Киев',
            warehouse:'1'
        },
        options:{
            cities:[],
            warehouses:[],
        },
        delivery:{
            phone:'+380'
        },
        files:[],
        fileError:false,
        hasNameError:true,
        hasPhoneError:true,
        hasEmailError:true,
        deliveryNameError:true,
        deliveryPhoneError:true,
        modal:false,
        errorMessage:'Заполните необходимые поля',
        validate:false,
        captcha:'',
        order: false,
        sameDelivery:true,
        jqXHR:null
    };
    componentDidMount(){

    }
    componentDidUpdate(data){

    }


    toolTipVisible = () => {
        this.setState((state)=>({
            ...state,
            tooltip: !state.tooltip
        }
        ))
    };

    handleFileupload = (e, data)=>{
        data.result.files.map(file=>{
            let fileError = file.error !== undefined;
                this.setState(state=>({
                    ...state,
                    fileError
                }));

        })
        this.setState(state=>({
            ...state,
            files:data.result.files,
            jqXHR:null
        }));
    };

    handleFileSend =(e, data)=>{
        const files = this.state.files;
        if(files.length>0){
            files.map(file=>{
                fetch(
                    file.deleteUrl,
                    {
                        method: "DELETE"
                    }
                );
            })
        }
    };

    handleFiles = (e)=>{
        const setState = (errorMessage)=> {
            this.setState(state=>({
                ...state,
                errorMessage
            }))
        };
        const handleModal = this.handleModal;
        const jqXHR = (jqXHR)=> {
            this.setState(state=>({
                ...state,
                jqXHR
            }))
        };
        jQuery(e.currentTarget).fileupload({
            context:this,
            add: function(e, data) {
                var uploadErrors = [];
                let totalSize=0;
                const errorMessage ='Размер файла(ов) слишком большой, попробуйте уменьшить размер или загрузить файл(ы) на файлообменник и приложить ссылку в комментарии к заказу';
                data.originalFiles.map(file=>{
                    totalSize += file['size'];
                    if(file['size'] > 500000000) {
                        uploadErrors.push('Filesize is too big');
                    }
                });

                if(uploadErrors.length > 0 || totalSize>1000000000) {
                    console.log(totalSize)
                    setState(errorMessage);
                    handleModal();
                } else {
        
                for (let i = 0; i < data.files.length; i++) {
                    const newPath =data.files[0].name.replace(/[^A-Za-z0-9\.]/g,'_');
                   data.files[i].uploadName =newPath;
                }
                    jqXHR( data.submit());

                }
            },
            url: 'http://77.222.152.121',
            singleFileUploads: false,
            dataType: 'json',
            beforeSend:this.handleFileSend,
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
               
                jQuery(e.target).prev().css(
                    'background',
                   `linear-gradient(to right, #7ba232 0%,#95c241 ${progress}%,transparent ${progress}%,transparent 100%)` 
                );
                jQuery(e.target).prev().css('background-color', '#fbac52')
            },
            done: this.handleFileupload,
            error: function(e, data){
                console.log(e, data);
            }
        })
    };

    handleModal = ()=>{
    this.setState(state=>({
        ...state,
        modal:!state.modal
    }));



}

    render(){
        return (
    <section className="form-row">
        <div id="form-calculator" >
        <div className="close-popup btn-close-popup"><i className="icon-cross"></i></div>
                <div className="row">
                    <div className="col-xs-12">
                        <form id="sendorder" onSubmit={this.validateForm}>

                            <div id="part-2" >


                                <div className="wrapper-container wrapper-container--modal-grey">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--design">
                                            <div className="modal-block__title">Дизайн:</div>
                                            <div className="modal-block__content modal-block__content--design">

                                                <div className="modal-block__content_item design-only">
                                                    <div className={`file-upload-container`}>
                                                        <div className="modal-block__content_item__description">
                                                            {this.state.files.length===0&&!this.state.fileError&&(<span>Мы можем создать индивидуальный дизайн наклеек с учетом всех Ваших пожеланий. Наш оператор перезвонит Вам для уточнения всех необходимых деталей.  Также Вы можете загрузить пример желаемого дизайна.</span>)}
                                                            {this.state.files.length>0&&!this.state.fileError&&(<span className="file-success">Файл(ы) успешно загружен(ы)</span>)}
                                                        </div>
                                                        <div className="abort-upload-container">
                                                        <label htmlFor="upload3" className="file-upload">
                                                            <div className="fileform">
                                                                <div className="button button--design">
                                                                    <span>Загрузить пример</span>
                                                                </div>
                                                                <input className="upload"  id="upload3" type="file" name="files[]" multiple onClick={this.handleFiles}/>
                                                            </div>
                                                        </label>
                                                            {this.state.jqXHR&&<Icon  size="2x" name="times" className="abort_upload" onClick={()=>{

                                                                if (this.state.jqXHR) {
                                                                    this.state.jqXHR.abort();
                                                                    this.setState(state=>({
                                                                        ...state,
                                                                        jqXHR:null
                                                                    }));
                                                                }
                                                                jQuery('.button').removeAttr('style');
                                                                return false;
                                                            }}/> }
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wrapper-container wrapper-container--modal-grey">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--radio">
                                            <div className="modal-block__content modal-block__content--order">
                                                <div className="feedback-form__input-block">
                                                    <label className="feedback-form__label" htmlFor="name">Ваше имя:</label>
                                                    <Textbox
                                                        classNameInput="validation_input"
                                                        classNameWrapper="validation_wrapper"
                                                        classNameContainer="validation_container"
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        tabIndex="0"
                                                        validate={this.state.validate}
                                                        validationCallback={(res) =>
                                                            this.setState({ hasNameError: res, validate:!res})}
                                                        value={this.state.user.name}
                                                        onBlur={()=>{}}
                                                        onChange={(name)=> {
                                                            this.setState(state=>({user: {...state.user,name},delivery: {...state.delivery,name}}))
                                                        }
                                                        }
                                                        validationOption={{
                                                            type:"string",
                                                            showMsg:true,
                                                            msgOnError:'Введите Ваше имя',
                                                            check: true,
                                                            required: true
                                                        }}
                                                    />
                                                </div>

                                                <div className="feedback-form__input-block">
                                                    <label className="feedback-form__label" htmlFor="phone">Ваш телефон:</label>
                                                    <Textbox
                                                        classNameInput="validation_input"
                                                        classNameWrapper="validation_wrapper"
                                                        classNameContainer="validation_container"
                                                        id="phone"
                                                        name="phone"
                                                        type="phone"
                                                        tabIndex="0"
                                                        validate={this.state.validate}
                                                        validationCallback={(res) =>
                                                            this.setState({ hasPhoneError: res, validate:!res})}
                                                        value={this.state.user.phone}
                                                        onBlur={()=>{}}
                                                        onChange={phone=> {
                                                            if (!phone||!phone.match(/\+/)){
                                                                this.setState(state=>({user: {...state.user,phone:'+380'},delivery: {...state.delivery,phone:'+380'}}))
                                                            }
                                                            else if(!phone.match(/^\+[0-9]*$/)){;
                                                            }
                                                            else if (phone.match(/^\+380[0-9]{0,9}$/)) {
                                                                this.setState(state=>({user: {...state.user,phone},delivery: {...state.delivery,phone}}))
                                                            }else if(phone.length<4){
                                                                this.setState(state=>({user: {...state.user,phone:'+380'},delivery: {...state.delivery,phone:'+380'}}))
                                                            }
                                                        }
                                                        }
                                                        validationOption={{
                                                            type:"string",
                                                            reg:/\+380[0-9]{9}/,
                                                            regMsg:'Некорректный телефон',
                                                            showMsg:true,
                                                            check: true,
                                                            required: true
                                                        }}
                                                    />
                                                </div>

                                                <div className="feedback-form__input-block">
                                                    <label className="feedback-form__label" htmlFor="email">Ваш email:</label>
                                                    <Textbox
                                                        classNameInput="validation_input"
                                                        classNameWrapper="validation_wrapper"
                                                        classNameContainer="validation_container"
                                                        id="email"
                                                        name="email"
                                                        type="text"
                                                        tabIndex="0"
                                                        validate={this.state.validate}
                                                        validationCallback={(res) =>
                                                            this.setState({ hasEmailError: res, validate:!res})}
                                                        value={this.state.user.email}
                                                        onBlur={()=>{}}
                                                        onChange={email=>this.setState(state=>({user:{...state.user,email}}))}
                                                        validationOption={{
                                                            type:"string",
                                                            reg:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                            regMsg:'Некорректный E-mail',
                                                            showMsg:true,
                                                            msgOnError:'Некорректный E-mail',                                                    check: true,
                                                            required: true

                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wrapper-container wrapper-container--modal-grey">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--radio">
                                            <div className="modal-block__content modal-block__content--button">
                                                <div className="modal-block__content_item">
                                                    <div
                                                        className="button button--design button--modal"
                                                        onClick={this.validateForm}
                                                    >
                                                        Оформить заказ
                                                    </div>
                                                    <input type="submit" style={{ display: 'none' }} />

                                                    {/*<a rel="nofollow" className="button button--design button--modal" >Оформить заказ</a>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ReCAPTCHA
                                    ref={(el) => { this.state.captcha = el; }}
                                    sitekey="6LcyQXEUAAAAAAt3JePBHrbYiPm0V9JtwQZt1ywF"
                                    size="invisible"
                                    onChange={
                                        (response) => {
                                            this.setState( state=>({
                                                ...state,
                                                recaptcha:response
                                            }));
                                            this.validateForm();
                                        }
                                    }
                                />
                    </div>

                </form>
            </div>
        </div>

</div>
        <Transition in={this.state.modal} timeout={300}>
            {status=>{
                    if(!this.state.validate) {
                        return (
                            <Modal
                                isOpen={this.state.modal}
                                onRequestClose={this.handleModal}
                                contentLabel="Error"
                                closeTimeoutMS={300}
                                className={`modal-error ${status}`}
                                overlayClassName="modal-error-overlay"
                            >
                                <div className="modal-error__close" onClick={this.handleModal}></div>
                                <div className="modal-error__message">{this.state.errorMessage}</div>
                            </Modal>
                        )
                    }else if(this.state.validate&&!this.state.order){
                        return(
                            <Modal
                                isOpen={this.state.modal}
                                contentLabel="Error"
                                closeTimeoutMS={300}
                                className={`modal-load ${status}`}
                                overlayClassName="modal-load-overlay"
                            >
                                <img src="images/spinner.gif" alt="spinner"/>
                            </Modal>
                        )
                    }else if(this.state.order){
                        return (
                            <Modal
                                isOpen={this.state.modal}
                                onRequestClose={()=>{
                                    this.handleModal();
                                    this.props.handleModal({},true)
                                }}
                                contentLabel="Error"
                                closeTimeoutMS={300}
                                className={`modal-error ${status}`}
                                overlayClassName="modal-error-overlay"
                            >
                                <div className="modal-error__close" onClick={()=>{
                                    this.handleModal();
                                    this.props.handleModal({},true)
                                }}></div>
                                <div className="modal-error__message">Заказ принят</div>
                            </Modal>
                        )
                    }
                }
            }
        </Transition>
</section>
        )
    }
}
export default SectionDesignOnly;
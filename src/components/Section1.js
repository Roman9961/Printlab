import React from 'react';
import Modal from 'react-modal';
import {Transition} from 'react-transition-group';
import { Link } from 'react-router-dom';
import InputRange from 'react-input-range';
import moment from 'moment';
import { Textbox } from 'react-inputs-validation';
import {Icon} from 'react-fa';
import Select from 'react-select';
import base from '../base';
import calc from './calculator';
import jQuery from 'jquery';
import 'blueimp-file-upload';
import ReCAPTCHA from 'react-google-recaptcha';

class Section1 extends React.Component{
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
                const closeCalc = ()=> {
                    this.props.handleModal({}, true)
                };
        if(!this.state.isEditOrder) {
                const handleModal = this.handleModal;
                const handleBookmark = this.props.handleBookmark;
                const setOrder = order=> {
                    this.setState(state=>({
                        ...state,
                        order
                    }));
                };
                const setLiq = liqCallback=> {
                    this.setState(state=>({
                        ...state,
                        liqCallback
                    }));
                }
                const isLiq = ()=>this.state.liqCallback;

                const setLiqEmail = liqEmail=> {
                    this.setState(state=>({
                        ...state,
                        liqEmail
                    }));
                }
                const isLiqEmail = ()=>this.state.liqEmail;
                const updateStatus = (pay_status)=>{
                    this.setState(state=>({
                        ...state,
                        pay_status,
                        dateUpdate: moment().format("YYYY-MM-DD HH:mm:ss")
                    }))
                };
                const liqPayInit = (orderData, newLocation)=> {
                    if (orderData.user.payment_method == 'liq-pay') {
                        handleModal();
                        const generatedKey = newLocation;
                        const data1 = {
                            'public_key': process.env.LIQPAY_PUBLIC_KEY,
                            'action': 'pay',
                            'amount': orderData.calcProp.price,
                            'currency': 'UAH',
                            'description': 'заказ наклеек',
                            'order_id': `${generatedKey}`,
                            'server_url': location.origin+'/server/confirm/index.php',
                            'version': '3'
                        };

                        const dataL = btoa(unescape(encodeURIComponent(JSON.stringify(data1))));

                        const crypto = require('crypto');
                        let str = crypto.createHash('sha1').update(process.env.LIQPAY_PRIVATE_KEY + dataL + process.env.LIQPAY_PRIVATE_KEY);

                        const signature = str.digest('base64');
                        window.LiqPayCheckoutCallback = function () {
                            LiqPayCheckout.init({
                                data: dataL,
                                embedTo: "#liqpay_checkout",
                                signature: signature,
                                mode: "popup" // embed || popup,
                            }).on("liqpay.callback", function (data) {
                                base.update(`orders/${data.order_id}`, {
                                    data: {pay_status: data.status, dateUpdate: moment().format("YYYY-MM-DD HH:mm:ss")}
                                }).then(()=> {
                                    setLiq(true);
                                    updateStatus(data.status)
                                    if (data.status != 'success' && !isLiqEmail()) {
                                        const xhr = new XMLHttpRequest();
                                        xhr.open("POST", '/server/confirm/index.php', true);

                                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                                        xhr.onreadystatechange = function (data) {
                                            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                                            }
                                        }
                                        xhr.send(`order_id=${data.order_id}&order=true&liqPay=true`);
                                        setLiqEmail(true);
                                    }
                                });

                            }).on("liqpay.ready", function (data) {
                                // ready
                            }).on("liqpay.close", function (data) {
                                if (isLiq()) {
                                    setLiq(false);
                                    setOrder(true);
                                    handleModal();
                                    handleBookmark({
                                        print: true,
                                        design: false,
                                        deliver: false
                                    })
                                }
                            });
                        }();
                    } else {
                        handleModal();
                        setOrder(true);
                        handleModal();
                        handleBookmark({
                            print: true,
                            design: false,
                            deliver: false
                        });

                        const xhr = new XMLHttpRequest();
                        xhr.open("POST", '/server/confirm/index.php', true);

                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                        xhr.onreadystatechange = function (data) {//Вызывает функцию при смене состояния.
                            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                            }
                        }
                        xhr.send(`order_id=${newLocation}&order=true&moneyTransfer=true`);
                    }
                }
                const price = !!this.state.calcProp.price;
                this.validateContacts();
                if (this.state.validate && this.state.recaptcha && price) {
                    const uuidv4 = require('uuid/v4');
                    let data = {
                        calcProp: this.state.calcProp,
                        delivery: {
                            ...this.state.delivery
                        },
                        pay_status: this.state.pay_status,
                        status: this.state.status,
                        files: this.state.files,
                        dateCreate: moment().format("YYYY-MM-DD HH:mm:ss"),
                        dateUpdate: moment().format("YYYY-MM-DD HH:mm:ss"),
                        user: this.state.user
                    };
                    if (data.delivery.method == 'np') {
                        let deliver = {
                            city:this.state.np.city.value,
                            warehouse:this.state.np.warehouse.value
                        }
                        data = {
                            ...data,
                            delivery: {
                                ...data.delivery,
                                ...deliver
                            }
                        }
                    }
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
                                liqPayInit(data, newLocation.key);
                                this.setState(state=>({
                                    ...state,
                                    currentOrder: {
                                        location: newLocation.key,
                                        id: data.orderId
                                    }
                                }));
                                if (!isLiqEmail()) {
                                    const xhr = new XMLHttpRequest();
                                    xhr.open("POST", '/server/confirm/index.php', true);

                                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

                                    xhr.onreadystatechange = function (data) {
                                        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                                        }
                                    }
                                    if(this.state.user.payment_method=='liq-pay') {
                                        xhr.send(`order_id=${newLocation.key}&order=true&liqPay=true&payment=true`);
                                        setLiqEmail(true);
                                    }else{
                                        xhr.send(`order_id=${newLocation.key}&order=true&payment=true`);
                                    }
                                }
                                const uuidv4 = require('uuid/v4');
                                base.post(`ordersVersion/${newLocation.key}`, {
                                    data:{ver:uuidv4()}
                                });
                                base.post('versionAdmin', {
                                    data: uuidv4(),
                                });
                            }).catch(err => {
                                //handle error
                            });
                        }).catch(error => {
                            //handle error
                        })
                    } else {
                        data = {
                            ...data,
                            orderId: this.state.currentOrder.id
                        }
                        base.update(`orders/${this.state.currentOrder.location}`, {
                            data: data
                        }).then(()=> {
                            liqPayInit(data, this.state.currentOrder.location);
                        })

                    }

                    //available immediately, you don't have to wait for the callback to be called
                } else if (!this.state.validate || !price) {
                    this.setState(state=>({
                        ...state,
                        errorMessage: 'Заполните необходимые поля'
                    }));
                    if (!price) {
                        this.setState(state=>({
                            ...state,
                            errorMessage: 'Вы ничего не выбрали'
                        }));
                    }

                    this.toggleValidating(false);
                    handleModal();
                } else {

                    this.state.captcha.execute();
                }
            }else{
            const uuidv4 = require('uuid/v4');
            const orderVers = uuidv4();
            let data = {
                calcProp: this.state.calcProp,
                delivery: {
                    ...this.state.delivery
                },
                pay_status: this.state.pay_status,
                status: this.state.status,
                files: this.state.files,
                dateUpdate: moment().format("YYYY-MM-DD HH:mm:ss"),
                user: this.state.user
            };
            if (data.delivery.method == 'np') {
                let deliver = {
                    city:this.state.np.city.value,
                    warehouse:this.state.np.warehouse.value
                }
                data = {
                    ...data,
                    delivery: {
                        ...data.delivery,
                        ...deliver
                    }
                }
            }

            base.update(`orders/${ this.state.currentOrder.location}`, {
               data
            }).then(()=>{
                const uuidv4 = require('uuid/v4');
                base.post(`ordersVersion/${ this.state.currentOrder.location}`, {
                    data:{ver:orderVers}
                });
                base.post('versionAdmin', {
                    data: uuidv4(),
                }).then(()=>{ window.location='/admin/orders'});
            })

            }
    }
    validateContacts = ()=>{
        let phone = this.state.user.phone;
        let email = this.state.user.email;
        let name = this.state.user.name;
        if(!phone&&!email&&!name){
            this.setState(state=>({
                ...state,
                validate:false
            }))
        }
        else if(!phone.match(/((\+380)+([0-9]){9})/)){
            this.setState(state=>({
                ...state,
                validate:false
            }))
        }
        else if(email&&!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
            this.setState(state=>({
                ...state,
                validate:false
            }))
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
            "print_type" : "Листовая",
            "cut_form" : "simple",
            "design" : "design-all",
            "form" : "Простая форма",
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
            phone:'+380',
            payment_method:'cashless'
        },
        liqCallback:false,
        liqEmail:false,
        currentOrder:{
            location:null,
            id:null
        },
        np:{
            city:{label:'Киев',value:'Киев'},
            warehouse:'1'
        },
        options:{
            cities:[],
            warehouses:[],
        },
        delivery:{
            phone:'+380',
            method: 'self'
        },
        isEditOrder:false,
        files:[],
        fileError:false,
        hasNameError:true,
        hasPhoneError:true,
        hasEmailError:true,
        pay_status: 'wait',
        status: 'wait_c',
        dateCreate: moment().format("YYYY-MM-DD HH:mm:ss"),
        dateUpdate: moment().format("YYYY-MM-DD HH:mm:ss"),
        deliveryNameError:true,
        deliveryPhoneError:true,
        modal:false,
        errorMessage:'Заполните необходимые поля',
        validate:false,
        captcha:'',
        order: false,
        sameDelivery:true,
        jqXHR:null,
        translations: {
            ua:{
                'order_price': 'Сума замовлення:',
                form:{
                    title: 'Форма наклейки:',
                    rect: 'Прямокутна (без заокруглених кутів)',
                    simple: 'Наклейки простої форми',
                    hard: 'Наклейки складної форми'
                },
                size:{
                    title:'Розмір:',
                    height: 'Висота, мм',
                    width: 'Ширина, мм'
                },
                quantity: 'Кількість:',
                color_print: 'Кольоровий друк (CMYK)',
                mono_print: 'Чорно-білий друк',
                material:{
                    title: 'Матеріал основи:',
                    paper: 'Самоклеючий папір',
                    plastic: 'Самоклеюча плівка',
                    transparent: 'Прозора плівка',
                    white: 'Біла плівка',
                    transparent_info: 'Для кращої якості друку на прозорій основі використовується УФ друк, попередньо друкується шар білої фарби (білила) для забезпечення більш насиченого основного зображення'
                },
                post_print:{
                    title: 'Постдрукарська обробка:',
                    matt: 'Матове ламінування',
                    gloss: 'Глянцеве ламінування',
                    info: 'Ламінуйте паперові наклейки, тоді вони довше збережуть товарний вигляд.'
                },
                deadline:{
                    title: 'Термін виготовлення замовлення:',
                    regular: 'Нетерміновий друк - 4 дня',
                    fast: 'Терміновий друк - 2 дні (+ 20%)'
                },
                buttons:{
                    design:'Перейти до дизайну',
                    back: 'Назад',
                    order: 'Оформити замовлення'
                },
                maket:{
                    title:'Макет:',
                    maket1:{
                        title: 'Є макет з контуром порізки',
                        info: 'Виберіть один або декілька файлів макетів і порізки для завантаження',
                        button: 'Завантажити макет і контур',
                        helper: '*cумарний обсяг файлів не повинен перевищувати 1Гб'
                    },
                    maket2:{
                        title: 'Є макет, але потрібен контур порізки',
                        forms:{
                            rect: 'Прямокутний',
                            custom_title: 'Скруглені кутки:',
                            rad35: 'Радіус 3,5 мм',
                            rad50: 'Радіус 5 мм',
                            rad100: 'Радіус 10 мм',
                            oval: 'Овал',
                            chopped: '“Рублений” +100 грн',
                            star: 'Зірка',
                            cloud: '“Хмаринка” + 100 грн',
                            circle: 'Коло',
                            accent: '“Акцент” +100 грн'
                        },
                        button: 'Завантажити макет',
                        helper: '*cумарний обсяг файлів не повинен перевищувати 1Гб'
                    },
                    maket3:{
                        title: 'Немає макету, потрібен дизайн',
                        info: 'Розробимо індивідуальний дизайн наклейок з урахуванням ваших побажань. Наш співробітник зв\'яжеться з вами для уточнення деталей. Вартість дизайну від 400 грн. Ви можете завантажити приклади через форму.',
                        button: 'Завантажити приклад',
                        helper: '*cумарний обсяг файлів не повинен перевищувати 1Гб'
                    }
                },
                'name': 'Ім\'я:',
                'email': 'email:',
                'phone': 'Телефон:',
                'message': 'Коментар:',
                payment:{
                    title: 'Оплата:',
                    liq: 'Оплата LiqPay (Visa / MasterCard, Приват24, Термінал)',
                    cash: 'Безготівковий розрахунок (для юр.осіб + 5%)'
                },
                delivery:{
                    title: 'Спосіб доставки:',
                    self:{
                        title: 'Самовивіз',
                        text: 'м. Київ, вул. Солом\'янська, 5, оф.120'
                    },
                    np: {
                        title:'Нова Пошта (оплата за тарифами Нової Пошти)',
                        form:{
                            name:'ПІБ одержувача:',
                            phone:'Телефон одержувача:',
                            city:'Населений пункт:',
                            number:'Відділення Нової Пошти:',  
                        }
                    },
                    kiev: {
                        title: 'Доставка по Києву ',
                        text: '+50 грн, в будь-яку точку міста'
                    }
                },
                terms:{
                    text:'*відправляючи замовлення, Ви приймаєте ',
                    link: 'Договір надання послуг'
                },
                order_popup:{
                    order: 'Ваше замовлення',
                    confirm: 'прийнято',
                    email_info: 'Дані про замовлення були відправлені на пошту',
                    info: 'Наші співробітники зв\'яжуться з вами для узгодження деталей'
                }
            },
            ru:{
                'order_price': 'Сумма заказа:',
                form:{
                    title: 'Форма наклейки:',
                    rect: 'Прямоугольная (без скругленных углов)',
                    simple: 'Наклейки простой формы',
                    hard: 'Наклейки сложной формы'
                },
                size:{
                    title:'Размер:',
                    height: 'Высота, мм',
                    width: 'Ширина, мм'
                },
                quantity: 'Количество:',
                color_print: 'Цветная печать (CMYK)',
                mono_print: 'Черно-белая печать',
                material:{
                    title: 'Материал основы:',
                    paper: 'Самоклеящаяся бумага',
                    plastic: 'Самоклеящаяся пленка',
                    transparent: 'Прозрачная пленка',
                    white: 'Белая пленка',
                    transparent_info: 'Для лучшего качества печати на прозрачной основе используется УФ печать, предварительно печатается слой белой краски (белила) для обеспечения более насыщенного основного изображения'
                },
                post_print:{
                    title: 'Постпечатная обработка:',
                    matt: 'Матовое ламинирование',
                    gloss: 'Глянцевое ламинирование',
                    info: 'Ламинируйте бумажные наклейки, тогда они дольше сохранят товарный вид.'
                },
                deadline:{
                    title: 'Срок изготовления заказа:',
                    regular: 'Несрочная печать - 4 дня',
                    fast: 'Срочная печать - 2 дня (+ 20%)'
                },
                buttons:{
                    design:'Перейти к дизайну',
                    back: 'Назад',
                    order: 'Оформить заказ'
                },
                maket:{
                    title:'Макет:',
                    maket1:{
                        title: 'Есть макет с контуром порезки',
                        info: 'Выберите один или несколько файлов макетов и порезки для загрузки',
                        button: 'Загрузить макет и контур',
                        helper: '*cуммарный объем файлов не должен превышать 1Гб'
                    },
                    maket2:{
                        title: 'Есть макет, но нужен контур порезки',
                        forms:{
                            rect: 'Прямоугольный',
                            custom_title: 'Скругленные углы:',
                            rad35: 'Радиус 3,5 мм',
                            rad50: 'Радиус 5 мм',
                            rad100: 'Радиус 10 мм',
                            oval: 'Овал',
                            chopped: '“Рубленый” +100 грн',
                            star: 'Звезда',
                            cloud: '“Облако” + 100 грн',
                            circle: 'Круг',
                            accent: '“Акцент” +100 грн'
                        },
                        button: 'Загрузить макет',
                        helper: '*cуммарный объем файлов не должен превышать 1Гб'
                    },
                    maket3:{
                        title: 'Нет макета, нужен дизайн',
                        info: 'Разработаем индивидуальный дизайн наклеек с учетом ваших пожеланий. Наш сотрудник свяжется с вами для уточнения деталей. Cтоимость дизайна -- от 400 грн. Вы можете загрузить исходные материалы или примеры через форму.',
                        button: 'Загрузить пример',
                        helper: '*cуммарный объем файлов не должен превышать 1Гб'
                    }
                },
                'name': 'Имя:',
                'email': 'email:',
                'phone': 'Телефон:',
                'message': 'Комментарий:',
                payment:{
                    title: 'Оплата:',
                    liq: 'Оплата LiqPay (Visa/MasterCard, Приват24, Терминал)',
                    cash: 'Безналичный расчет (для юр.лиц + 5%)'
                },
                delivery:{
                    title: 'Способ доставки:',
                    self:{
                        title: 'Самовывоз',
                        text: 'г. Киев, ул. Соломенская, 5, оф.120'
                    },
                    np: {
                        title:'Новая Почта (оплата по тарифам Новой Почты)',
                        form:{
                            name:'ФИО получателя:',
                            phone:'Телефон получателя:',
                            city:'Населенный пункт:',
                            number:'Отделение Новой почты:',

                        }
                    }, 
                    kiev: {
                        title: 'Доставка по Киеву',
                        text: '+50 грн, в любую точку города'
                    }
                },
                terms:{
                    text:'*отправляя заказ, Вы принимаете ',
                    link: 'Договор оказания услуг'
                },
                order_popup:{
                    order: 'Ваш заказ',
                    confirm: 'принят',
                    email_info: 'Данные о заказе были отправлены на почту',
                    info: 'Наши сотрудники свяжутся с вами для уточнения деталей'
                }
            }
        },
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
                window.localStorage.setItem("calculator", JSON.stringify(calculator))
                this.setState(state=>({
                    ...state,
                    calculator
                }));
                if (Object.keys(this.props.calcProp).length !== 0) {
                    this.setState((state)=>({
                        ...state,
                        calcProp: this.props.calcProp
                    }));
                }
                if(Object.keys(this.props.editOrder).length !== 0) {
                    this.setState((state)=>({
                        ...state,
                        calcProp: this.props.editOrder.calcProp,
                        dateCreate: this.props.editOrder.dateCreate,
                        delivery: this.props.editOrder.delivery,
                        files: this.props.editOrder.files,
                        orderId: this.props.editOrder.orderId,
                        pay_status: this.props.editOrder.pay_status,
                        status: this.props.editOrder.status,
                        user: this.props.editOrder.user,
                        currentOrder:{
                            location:this.props.editOrder.key,
                            id:this.props.editOrder.orderId
                        },
                        isEditOrder:true
                    }));
                }
            });
            }else{
                let calculator = JSON.parse(localStorage.getItem("calculator"));
                this.setState(state=>({
                    ...state,
                    calculator
                }));
                if (Object.keys(this.props.calcProp).length !== 0) {
                    this.setState((state)=>({
                        ...state,
                        calcProp: this.props.calcProp
                    }));
                }
                if(Object.keys(this.props.editOrder).length !== 0) {
                    this.setState((state)=>({
                        ...state,
                        calcProp: this.props.editOrder.calcProp,
                        dateCreate: this.props.editOrder.dateCreate,
                        delivery: this.props.editOrder.delivery?this.props.editOrder.delivery:{},
                        files: this.props.editOrder.files?this.props.editOrder.files:{},
                        orderId: this.props.editOrder.orderId,
                        pay_status: this.props.editOrder.pay_status,
                        status: this.props.editOrder.status,
                        user: this.props.editOrder.user,
                        currentOrder:{
                            location:this.props.editOrder.key,
                            id:this.props.editOrder.orderId
                        },
                        isEditOrder:true
                    }));
                }
            }
        });

        (async () => {
            const rawResponse = await fetch("https://api.novaposhta.ua/v2.0/json/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "modelName": "Address",
                        "calledMethod": "getCities",
                        "methodProperties": { },
                        "apiKey": "ce48d83e5a77751eeec2586ebc99b547"
                    })
            });
            const content = await rawResponse.json();

            let cities=[];
            let citiesOptions=[];
            content.data.map((city)=>{
                cities.push({name:city.DescriptionRu});
                citiesOptions.push({value:city.DescriptionRu,label:city.DescriptionRu});
            });
            cities = cities.sort((a,b)=>{
                if(a.name<b.name) return -1;
                if(a.name>b.name) return 1;
                return 0;
            });
            this.setState(state=>({
                ...state,
                options:{
                    ...state.options,
                    cities:citiesOptions
                }
            }));
        })();
        (async () => {
            const rawResponse = await fetch("https://api.novaposhta.ua/v2.0/json/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "modelName": "AddressGeneral",
                        "calledMethod": "getWarehouses",
                        "methodProperties": {
                            "CityName": "Киев",
                        },
                        "apiKey": "ce48d83e5a77751eeec2586ebc99b547"
                    })
            });
            const content = await rawResponse.json();

            let warehouses=[];
            let warehousesOptions=[];
            content.data.map((warehouse)=>{
                warehouses.push({name:warehouse.DescriptionRu, id:warehouse.Number});
                warehousesOptions.push({value:warehouse.Number,label:warehouse.DescriptionRu});
            });
            warehouses = warehouses.sort((a,b)=>{
                if(parseInt(a.id)<parseInt(b.id)) return -1;
                if(parseInt(a.id)>parseInt(b.id)) return 1;
                return 0;
            });
            this.setState(state=>({
                ...state,
                np:{
                    ...state.np,
                    warehouse: warehousesOptions[0]
                },
                options:{
                    ...state.options,
                    warehouses:warehousesOptions
                }
            }));
        })();
    }
    componentDidUpdate(data){

        if(Object.keys(this.state.calculator).length>0 && this.state.calcProp != data.calcProp) {
            let price = calc(this.state);
            if(this.state.calcProp.form === 'Рулонная' && price<750){
                price = 750;
            }
            if (price != this.state.calcProp.price) {
                this.setState((state)=>({
                    ...state,
                    calcProp:{
                        ...state.calcProp,
                        price
                    }
                }));
            }
        }
    }

    restrictions = (calcProp)=>{
        if(calcProp.basis_param=='transparent'){
            calcProp.print_time='4'
        }
        if(calcProp.basis=='Бумажная'){
            calcProp.basis_param = 'white';
        }
        if(calcProp.form === 'Рулонная') {
            calcProp.print_type = 'Рулонная';
            if(calcProp.cut_form=='rectangle') {
                calcProp.cut_form = 'simple';
            }
        }else{
            calcProp.print_type = 'Листовая';
        }
        if(calcProp.form=='Прямоугольная'){
            if( calcProp.width<40 || calcProp.height<40){
                calcProp.form='Простая форма';
                calcProp.cut_form='simple';
            }
            calcProp.cut_form='rectangle';
        }
        if(calcProp.form=='Простая форма'){
            calcProp.cut_form='simple';
        }
        if(calcProp.form=='Сложная форма'){
            calcProp.cut_form='hard';
        }
        if(calcProp.print_type == 'Листовая'){
            calcProp.margin=4;
        }
        if(
            calcProp.outline=='cloud'||
            calcProp.outline=='star'||
            calcProp.outline=='chopped'||
            calcProp.outline=='accent'
        ){
            calcProp.print_type != 'Рулонная' && (calcProp.form='Сложная форма');
            calcProp.cut_form='hard';
        }
        if(
            calcProp.outline=='radius35'||
            calcProp.outline=='radius50'||
            calcProp.outline=='radius100'||
            calcProp.outline=='ellipse'||
            calcProp.outline=='circle'
        ){

            calcProp.print_type != 'Рулонная' && (calcProp.form ='Простая форма');
            calcProp.cut_form='simple';
        }
        if(calcProp.outline=='rectangle'){
            if(calcProp.width>=40 && calcProp.height>=40) {
                if(calcProp.print_type != 'Рулонная') {
                    calcProp.form = 'Прямоугольная';
                    calcProp.cut_form = 'rectangle';
                }
            }else{
                if(calcProp.print_type != 'Рулонная') {
                    calcProp.form = 'Простая форма';
                    calcProp.cut_form = 'rectangle';
                }
            }
            calcProp.print_type == 'Рулонная'&&(calcProp.cut_form='simple');
        }
        if(calcProp.quantity>9999999){
            calcProp.quantity = 9999999;
        }

        if(calcProp.form === 'Рулонная'){
            if(parseInt(calcProp.margin)<3){
                this.state.range=3;
            }else if(parseInt(calcProp.margin)>500){
                this.state.range=500;
            }else if(isNaN(parseInt(calcProp.margin, 10))){
               this.state.range=3;
           }else{
                this.state.range=parseInt(calcProp.margin);
            }
            if( calcProp.width>980){
                calcProp.width =980;
            }
            if( calcProp.height>316){
                calcProp.height =316;
            }
        }else if(calcProp.basis_param == 'transparent'){
            if( calcProp.width>429){
                calcProp.width =429;
            }
            if( calcProp.height>290){
                calcProp.height =290;
            }
        }else{
            this.state.range=4;
            if(calcProp.form=='Прямоугольная'){
                if( calcProp.width>440){
                    calcProp.width =440;
                }
                if( calcProp.height>310){
                    calcProp.height =310;
                }
            }else{
                if( calcProp.width>378){
                    calcProp.width =378;
                }
                if( calcProp.height>278){
                    calcProp.height =278;
                }
            }
            if(calcProp.cut_form=='rectangle'){
                if( calcProp.width<40 || calcProp.height<40){
                    calcProp.cut_form='simple'
                }
            }
        }

        if(calcProp.basis_param == 'transparent'){
           if( calcProp.width>429){
               calcProp.width =429;
           }
           if( calcProp.height>290){
               calcProp.height =290;
           }
       }
        if( calcProp.width<3 ){
            calcProp.width=3;
        }
        if( calcProp.height<3 ){
            calcProp.height=3;
        }
        if( calcProp.quantity<1 ){
            calcProp.quantity=1;
        }

        return calcProp;
    }

    updatecalcProp =  (key, value, oldValue) =>{
        console.log(key,value, oldValue);
        let calcProp = {...this.state.calcProp};
        calcProp[key] = value;
        if(calcProp[key]=='transparent' && !calcProp.lamination){
            calcProp.lamination='gloss';
        }
        if((key=='basis_param' && oldValue=='transparent') || key=='basis'){
            calcProp.lamination='';
        }
        calcProp = this.restrictions(calcProp);
        this.setState((state)=>({
            ...state,
            calcProp
        }));
    };

    updatecalcInputProp =  (key, value) =>{
        let calcProp = {...this.state.calcProp};
        calcProp[key] = value;
        this.setState((state)=>({
            ...state,
            calcProp
        }));
    };
     updatecalcOnBlurProp =  (key, value) =>{
        let calcProp = {...this.state.calcProp};

         calcProp[key] = value;
         calcProp = this.restrictions(calcProp);
         
         calcProp.margin = parseInt(calcProp.margin);

         this.setState((state)=>({
             ...state,
             calcProp
         }));
    };

    updateDeliveryProp =  (key, value) =>{
        const np = {...this.state.np};
        np[key] = value;
        this.setState((state)=>({
            ...state,
            np
        }));
    }

    handleRange = (value) =>{
        this.setState((state)=>({
            ...state,
            range:value
        }
        ));
    };
    fixRange = (value) =>{
        this.setState((state)=>({
            ...state,
            calcProp:{
                ...state.calcProp,
                margin:value
            },
            range:value
        }
        ));
    };
    handleChange = async (event) => {
       if(Object.keys(event).length>0) {
           await this.updatecalcProp(event.currentTarget.name,
               (event.currentTarget.name === 'lamination' && event.currentTarget.checked) ?
                   event.currentTarget.value :
                   (event.currentTarget.name === 'lamination' && !event.currentTarget.checked)?
                       event.currentTarget.checked:
                    event.currentTarget.value, this.state.calcProp[event.currentTarget.name]);
           const calculator = this.state;
       }
    };

    handleBlur = async (event) => {
        if(Object.keys(event).length>0) {
            await this.updatecalcOnBlurProp(event.currentTarget.name,event.currentTarget.value);
            // const calculator = this.state;
        }
    };
    handleInput = async (event) => {
        if(Object.keys(event).length>0) {
            await this.updatecalcInputProp(event.currentTarget.name,event.currentTarget.value);
        }
    };
    toolTipVisible = () => {
        this.setState((state)=>({
            ...state,
            tooltip: !state.tooltip
        }
        ))
    };

    selectHandleChange = async (value, key) => {
        const id = value.value;
        if(key==='city') {
            (async() => {
                const rawResponse = await fetch("https://api.novaposhta.ua/v2.0/json/", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "modelName": "AddressGeneral",
                            "calledMethod": "getWarehouses",
                            "methodProperties": {
                                "CityName": id,
                            },
                            "apiKey": "ce48d83e5a77751eeec2586ebc99b547"
                        })
                });
                const content = await rawResponse.json();

                let warehouses = [];
                let warehousesOptions=[];
                content.data.map((warehouse)=>{
                    warehouses.push({name:warehouse.DescriptionRu, id:warehouse.Number});
                    warehousesOptions.push({value:warehouse.Number,label:warehouse.DescriptionRu});
                });
                warehouses = warehouses.sort((a,b)=>{
                    if(parseInt(a.id)<parseInt(b.id)) return -1;
                    if(parseInt(a.id)>parseInt(b.id)) return 1;
                    return 0;
                });
                this.setState(state=>({
                    ...state,
                    np:{
                        ...state.np,
                        warehouse:warehousesOptions[0]
                    },
                    options:{
                        ...state.options,
                        warehouses:warehousesOptions
                    }
                }));
            })();
        }
        await this.updateDeliveryProp(key, value);
    };

    handleFileupload = (e, data)=>{
        data.result.files.map(file=>{
            let fileError = file.error !== undefined;
                this.setState(state=>({
                    ...state,
                    fileError
                }));

        });
        let files = [...this.state.files, ...data.result.files];
        this.setState(state=>({
            ...state,
            files,
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

    handleFileDelete =(filetoDelete)=>{

        const files = this.state.files;
           let newFiles =  files.filter(file=>{
                if(filetoDelete == file) {
                    fetch(
                        file.deleteUrl,
                        {
                            method: "DELETE"
                        }
                    );
                    return false;
                }else{
                    return true;
                }
            });
        if(newFiles.length==0){
            jQuery('.js-maket-download').removeAttr('style');
        }
        this.setState(state=>({
            ...state,
            files:newFiles
        }));
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
                    setState(errorMessage);
                    handleModal();
                } else {

                for (let i = 0; i < data.files.length; i++) {
                    const newPath =data.files[i].name.replace(/[^A-Za-z0-9\.]/g,'_');
                   data.files[i].uploadName =newPath;
                }
                    jqXHR( data.submit());
                }
            },
            change: function (e, data) {
                for (let i = 0; i < data.files.length; i++) {
                    if (!(/\.(jpg|jpeg|png|pdf|ttf|tiff|tif|psd|cdr|ai|eps)$/i).test(data.files[i].name)) {
                        let b = document.createElement('b');
                        let errorMessage = <span style={{wordBreak:'break-word'}}>Файл <b>{data.files[i].name}</b> имеет недопустимый формат</span>;
                        setState(errorMessage);
                        handleModal();
                        return false;
                    }
                }
            },
            url: 'https://printlab.net.ua',
            singleFileUploads: false,
            dataType: 'json',
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
               if(progress<3){
                   jQuery('.js-maket-download').removeAttr('style');
               }else {
                   jQuery(e.target).prev().css(
                       'background',
                       `linear-gradient(to right, #7ba232 0%,#95c241 ${progress}%,transparent ${progress}%,transparent 100%)`
                   );
                   jQuery(e.target).prev().css('background-color', '#fbac52')
               }
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

    getTranslation(){
        return this.state.translations[this.props.locale]
    }

    render(){
        return (
    <section className="form-row">
        <div id="form-calculator" >
        <div className="close-popup btn-close-popup"><i className="icon-cross"></i></div>
        <div id="final-price-main" className="price-wrapper">
            <div>{this.getTranslation().order_price}</div>
            <span>{this.state.calcProp.price} грн</span>
        </div>



                <div className="row">
                    <div className="col-xs-12">
                        <form id="sendorder" onSubmit={this.validateForm}>

                            <div id="print" className={`${!this.props.state.print?'hidden-part':''}`}>
                                <div className="wrapper-container wrapper-container--modal-grey">
                                <div className="container container--modal-info">
                                    <div className="modal-block modal-block--radio">
                                    <div className="modal-block__title">{this.getTranslation().form.title}</div>
                                    <div className="modal-block__content">
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-01" className= {`${this.state.calcProp.form=='Прямоугольная'?'active':''} short`}>
                                                <input className="radio-input" type="radio" name="form" id="field_profile-01" value="Прямоугольная" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.form=='Прямоугольная'} timeout={200}>
                                                    {status=>(
                                                            <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <div className="modal-block__content_item__icon modal-block__content_item__icon--rect"></div>
                                                <span>{this.getTranslation().form.rect}</span>
                                            </label>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-02" className= {`${this.state.calcProp.form=='Простая форма'?'active':''} short`}>
                                                <input className="radio-input" type="radio" name="form" id="field_profile-02" value="Простая форма" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.form=='Простая форма'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <div className="modal-block__content_item__icon modal-block__content_item__icon--simple"></div>
                                                <span>{this.getTranslation().form.simple}</span>
                                            </label>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-03" className= {`${this.state.calcProp.form=='Сложная форма'?'active':''} short`}>
                                                <input className="radio-input" type="radio" name="form" id="field_profile-03" value="Сложная форма" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.form=='Сложная форма'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <div className="modal-block__content_item__icon modal-block__content_item__icon--hard"></div>
                                                <span>{this.getTranslation().form.hard}</span>
                                            </label>
                                        </div>
                                    
                                    </div>
                                    </div>
                                </div>
                            </div>

                                <div className="wrapper-container wrapper-container--modal">
                                    <div className="container container--modal-input">
                                        <div className="modal-block">
                                            <div className="modal-block__title">{this.getTranslation().size.title}</div>
                                            <div className="modal-block__content modal-block__content--input">
                                                <div className="modal-block__content_item modal-block__content_item--input">
                                                    <input className="number-input"  type="number" name="height" id="field_profile-05" value={this.state.calcProp.height} min="3" max={(this.state.calcProp.print_type === 'Рулонная')?49000:438} onChange={this.handleInput} onBlur={this.handleBlur} placeholder="302"/>
                                                    <span>{this.getTranslation().size.height}</span>
                                                </div>
                                                <div className="x-size"></div>
                                                <div className="modal-block__content_item modal-block__content_item--input">
                                                    <input className="number-input" type="number" name="width" id="field_profile-06" value={this.state.calcProp.width} onChange={this.handleInput} onBlur={this.handleBlur} min="3" max={(this.state.calcProp.print_type === 'Рулонная')?1500:308}  placeholder="200"/>
                                                    <span>{this.getTranslation().size.width}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-block">
                                            <div className="modal-block__title">{this.getTranslation().quantity}</div>
                                             <div className="modal-block__content modal-block__content--input">
                                                 <div className="modal-block__content_item modal-block__content_item--input">
                                                     <input className="number-input" type="number" name="quantity" id="field_profile-07" value={this.state.calcProp.quantity} onChange={this.handleChange} onBlur={this.handleBlur} min="0" max="99999" step="1" placeholder="21800"/>
                                                     <span>Штук</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.calcProp.print_type==='Рулонная'&&(
                                        <React.Fragment>
                                    <div className="container container--modal-input">
                                        <div className="modal-block">
                                            <div className="modal-block__title modal-block__title--range">Расстояние между наклейками:</div>
                                            <div className="modal-block__content modal-block__content--input modal-block__content--input--range">
                                                <div className="modal-block__content_item modal-block__content_item--input">
                                                    <div className={`range-tooltip ${this.state.tooltip?'active':''}`}
                                                         onMouseDown={this.toolTipVisible}
                                                         onTouchStart = {this.toolTipVisible}
                                                         onMouseUp={this.toolTipVisible}
                                                         onTouchEnd={this.toolTipVisible}
                                                    >
                                                    <InputRange
                                                        maxValue={500}
                                                        minValue={3}
                                                        formatLabel={value => `${value} мм`}
                                                        value={this.state.range}
                                                        onChange={this.handleRange}
                                                        onChangeComplete = {this.fixRange}
                                                    />
                                                    </div>
                                                </div>
                                                <div className="modal-block__content_item modal-block__content_item--input">
                                                    <input className="number-input" type="number" name="margin" id="field_profile-08" value={this.state.calcProp.margin} onChange={this.handleChange} min="3" max="500"/>
                                                    <span>Расстояние, мм</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container container--modal-input">
                                    <div className="modal-block__content_item">
                                        <div className="modal-block__title modal-block__title--range">Форма наклеек:</div>
                                        <div className="modal-block__content_item__checkbox-container">
                                        <div className="modal-block__content_item__checkbox-container__checkboxes">
                                        <label htmlFor="field_cut_form1">
                                        <div className= {`modal-block__content_item__checkbox ${this.state.calcProp.cut_form=='simple'?'active':''}`}>
                                        <div className="modal-checkbox"></div>
                                        </div>
                                        <input type="checkbox" name="cut_form" id="field_cut_form1" value="simple" defaultChecked ={this.state.calcProp.cut_form=='simple'}  onClick={this.handleChange}/>
                                        <div className="modal-checkbox__title">Простая</div>
                                        </label>
                                        <label htmlFor="field_cut_form2">
                                        <div className= {`modal-block__content_item__checkbox ${this.state.calcProp.cut_form=='hard'?'active':''}`}>
                                        <div className="modal-checkbox"></div>
                                        </div>
                                        <input type="checkbox" name="cut_form" id="field_cut_form2" value="hard" defaultChecked ={this.state.calcProp.cut_form=='hard'} onClick={this.handleChange}/>
                                        <div className="modal-checkbox__title">Сложная</div>
                                        </label>
                                        </div>
                                        <hr/>
                                        <div className="modal-block__content_item__description">
                                            <div>Простые формы: круг, овал, треугольник, ромб.</div>
                                            <div>Сложные формы: буквы, стрелочки, сердечки, звездочки.</div>
                                            <div>Также к сложным объектам приравниваются те, размеры которых не превышают 20мм.</div>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                            </React.Fragment>
                                    )}

                                </div>
                                <div className="wrapper-container wrapper-container--modal-grey">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--radio">
                                            <div className="modal-block__content">
                                            <div className="modal-block__content_item">
                                                <label htmlFor="field_profile-09" className= {`${this.state.calcProp.type=='Цветная'?'active':''}`}>
                                                    <input className="radio-input" type="radio" name="type" id="field_profile-09" value="Цветная" onClick={this.handleChange}/>
                                                    <Transition in={this.state.calcProp.type=='Цветная'} timeout={200}>
                                                        {status=>(
                                                            <div className={`modal__check-icon--form ${status}`}></div>
                                                        )}
                                                    </Transition>
                                                    <span>{this.getTranslation().color_print}</span>
                                                </label>
                                            </div>
                                            <div className="modal-block__content_item">
                                                <label htmlFor="field_profile-10" className= {`${this.state.calcProp.type=='Черно-белая'?'active':''}`}>
                                                    <input className="radio-input" type="radio" name="type" id="field_profile-10" value="Черно-белая" onClick={this.handleChange}/>
                                                    <Transition in={this.state.calcProp.type=='Черно-белая'} timeout={200}>
                                                        {status=>(
                                                            <div className={`modal__check-icon--form ${status}`}></div>
                                                        )}
                                                    </Transition>
                                                    <span>{this.getTranslation().mono_print}</span>
                                                </label>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="wrapper-container wrapper-container--modal">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--radio">
                                            <div className="modal-block__title">{this.getTranslation().material.title}</div>
                                            <div className="modal-block__content">
                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-11" className= {`${this.state.calcProp.basis=='Бумажная'?'active':''}`}>
                                                        <input className="radio-input" type="radio" name="basis" id="field_profile-11" value="Бумажная" onClick={this.handleChange}/>
                                                        <Transition in={this.state.calcProp.basis=='Бумажная'} timeout={200}>
                                                            {status=>(
                                                                <div className={`modal__check-icon--form ${status}`}></div>
                                                            )}
                                                        </Transition>
                                                        <div className="modal-block__content_item__icon--rect modal-block__content_item__icon"></div>
                                                        <span>{this.getTranslation().material.paper}</span>
                                                    </label>
                                                </div>
                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-12" className= {`${this.state.calcProp.basis=='Пластиковая'?'active':''}`}>
                                                        <input className="radio-input" type="radio" name="basis" id="field_profile-12" value="Пластиковая" onClick={this.handleChange}/>
                                                        <Transition in={this.state.calcProp.basis=='Пластиковая'} timeout={200}>
                                                            {status=>(
                                                                <div className={`modal__check-icon--form ${status}`}></div>
                                                            )}
                                                        </Transition>
                                                        <div className="modal-block__content_item__icon--plastic modal-block__content_item__icon"></div>
                                                        <span>{this.getTranslation().material.plastic}</span>
                                                    </label>
                                                </div>
                                                {this.state.calcProp.basis=='Пластиковая'&&(
                                                    <React.Fragment>
                                                        <div className="modal-block__content_item">
                                                            <label htmlFor="field_profile-13" className= {`modal-block__content_item__label ${this.state.calcProp.basis_param=='transparent'?'active':''}`}>
                                                                <input className="radio-input" type="radio" name="basis_param" id="field_profile-13" value="transparent" onClick={this.handleChange}/>
                                                                <Transition in={this.state.calcProp.basis_param=='transparent'} timeout={200}>
                                                                    {status=>(
                                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                                    )}
                                                                </Transition>
                                                                <div className="modal-block__content_item__icon--transparent modal-block__content_item__icon"></div>
                                                                <span>{this.getTranslation().material.transparent}</span>
                                                                <div className="modal-block__content_item__description">
                                                                {this.getTranslation().material.transparent_info}
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <div className="modal-block__content_item">
                                                            <label htmlFor="field_profile-14" className= {`${this.state.calcProp.basis_param=='white'?'active':''}`}>
                                                                <input className="radio-input" type="radio" name="basis_param" id="field_profile-14" value="white" onClick={this.handleChange}/>
                                                                <Transition in={this.state.calcProp.basis_param=='white'} timeout={200}>
                                                                    {status=>(
                                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                                    )}
                                                                </Transition>
                                                                <div className="modal-block__content_item__icon--white modal-block__content_item__icon"></div>
                                                                <span>{this.getTranslation().material.white}</span>
                                                            </label>
                                                        </div>
                                                    </React.Fragment>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="wrapper-container wrapper-container--modal-grey">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--radio">
                                            <div className="modal-block__title">{this.getTranslation().post_print.title}</div>
                                            <div className="modal-block__content">
                                                <div className="modal-block__content_item">
                                                    <div className="modal-block__content_item__checkbox-container">
                                                        <div className="modal-block__content_item__checkbox-container__checkboxes mobile-column">
                                                            <label htmlFor="field_profile-16">
                                                                <div className= {`modal-block__content_item__checkbox ${this.state.calcProp.lamination=='matt'?'active':''}`}>
                                                                    <div className="modal-checkbox"></div>
                                                                </div>
                                                                <input type="checkbox" name="lamination" id="field_profile-16" value="matt" checked ={this.state.calcProp.lamination=='matt'}  onClick={this.handleChange}/>
                                                                <div className="modal-checkbox__title">{this.getTranslation().post_print.matt}</div>
                                                            </label>
                                                            <label htmlFor="field_profile-15">
                                                            <div className= {`modal-block__content_item__checkbox ${this.state.calcProp.lamination=='gloss'?'active':''}`}>
                                                                <div className="modal-checkbox"></div>
                                                            </div>
                                                            <input type="checkbox" name="lamination" id="field_profile-15" value="gloss" checked ={this.state.calcProp.lamination=='gloss'} onClick={this.handleChange}/>
                                                            <div className="modal-checkbox__title">{this.getTranslation().post_print.gloss}</div>
                                                        </label>
                                                        </div>
                                                        <hr/>
                                                        <div className="modal-block__content_item__description">
                                                        {this.getTranslation().post_print.info}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*<div className="modal-block__content_item">*/}
                                                    {/*<div className="modal-block__content_item__checkbox-container">*/}
                                                        {/*<div className="modal-block__content_item__checkbox-container__checkboxes">*/}
                                                            {/*<label htmlFor="field_profile-17" className="disable">*/}
                                                                {/*<div className= {`modal-block__content_item__checkbox ${this.state.calcProp.stamping?'active':''}`}>*/}
                                                                    {/*<div className="modal-checkbox disable"></div>*/}
                                                                {/*</div>*/}
                                                                {/*<input type="checkbox" disabled name="stamping" id="field_profile-17" value={false} checked ={this.state.calcProp.stamping}  onClick={this.handleChange}/>*/}
                                                                {/*<div className="modal-checkbox__title">Тиснение</div>*/}
                                                            {/*</label>*/}
                                                            {/*<label htmlFor="field_profile-18" className="disable">*/}
                                                                {/*<div className= {`modal-block__content_item__checkbox ${this.state.calcProp.varnish?'active':''}`}>*/}
                                                                    {/*<div className="modal-checkbox disable"></div>*/}
                                                                {/*</div>*/}
                                                                {/*<input type="checkbox" disabled name="varnish" id="field_profile-18" value={false} checked ={this.state.calcProp.varnish} onClick={this.handleChange}/>*/}
                                                                {/*<div className="modal-checkbox__title">УФ-лак</div>*/}
                                                            {/*</label>*/}
                                                        {/*</div>*/}
                                                        {/*<hr/>*/}
                                                        {/*<div className="modal-block__content_item__description">*/}
                                                            {/*Эта опция пока недоступна в калькуляторе, обратитесь за просчетом к нашим сотрудникам.*/}
                                                        {/*</div>*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>

                                <div className="wrapper-container wrapper-container--modal">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--radio">
                                            <div className="modal-block__title">{this.getTranslation().deadline.title}</div>
                                            <div className="modal-block__content">
                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-20" className= {`${this.state.calcProp.print_time=='4'?'active':''}`}>
                                                        <input className="radio-input" type="radio" name="print_time" id="field_profile-20" defaultChecked value="4" onClick={this.handleChange}/>
                                                        <Transition in={this.state.calcProp.print_time=='4'} timeout={200}>
                                                            {status=>(
                                                                <div className={`modal__check-icon--form ${status}`}></div>
                                                            )}
                                                        </Transition>
                                                        <div className="modal-block__content_item__icon--plastic modal-block__content_item__icon"></div>
                                                        <span>{this.getTranslation().deadline.regular}</span>
                                                    </label>
                                                </div>
                                                {this.state.calcProp.basis_param!='transparent' &&(
                                                    <div className="modal-block__content_item">
                                                        <label htmlFor="field_profile-19" className= {`${this.state.calcProp.print_time=='2'?'active':''}`}>
                                                            <input className="radio-input" type="radio" name="print_time" id="field_profile-19" value="2" onClick={this.handleChange}/>
                                                            <Transition in={this.state.calcProp.print_time=='2'} timeout={200}>
                                                                {status=>(
                                                                    <div className={`modal__check-icon--form ${status}`}></div>
                                                                )}
                                                            </Transition>
                                                            <div className="modal-block__content_item__icon--paper modal-block__content_item__icon"></div>
                                                            <span>{this.getTranslation().deadline.fast}</span>
                                                        </label>
                                                    </div>
                                                )}
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="wrapper-container wrapper-container--modal">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--radio">
                                            <div className="modal-block__content modal-block__content--button">
                                                <div className="modal-block__content_item">
                                                        <a rel="nofollow" className="button button--design" onClick={()=>{
                                                            gtag('event', 'Отправить', {'event_category': 'Кнопка', 'event_label': 'Перейти к дизайну'});
                                                            this.props.handleBookmark({
                                                            print:false,
                                                            design:true,
                                                            deliver:false
                                                        })}}>{this.getTranslation().buttons.design}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div id="design" className={`${!this.props.state.design?'hidden-part':''}`}>


                                <div className="wrapper-container wrapper-container--modal-grey">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--design">
                                            <div className="modal-block__title">{this.getTranslation().maket.title}</div>
                                            <div className="modal-block__content modal-block__content--design">
                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-21" className= {`modal-block__content_item__label modal-block__content_item__label--design ${this.state.calcProp.design=='design-all'?'active':''}`}>
                                                        <div className="file-upload-header">
                                                            <input className="radio-input" type="radio" name="design" id="field_profile-21" value="design-all" onClick={this.handleChange}/>
                                                            <Transition in={this.state.calcProp.design=='design-all'} timeout={200}>
                                                                {status=>(
                                                                    <div className={`modal__check-icon--form ${status}`}></div>
                                                                )}
                                                            </Transition>
                                                            <span>{this.getTranslation().maket.maket1.title}</span>
                                                        </div>
                                                        <Transition in={this.state.calcProp.design=='design-all'} timeout={200}>
                                                            {status=>(
                                                            <div className={`file-upload-container ${status}`}>
                                                                <div className="modal-block__content_item__description">
                                                                    {this.state.files&&this.state.files.length===0&&!this.state.fileError&&(<span>{this.getTranslation().maket.maket1.info}</span>)}
                                                                    {this.state.files&&this.state.files.length>0&&!this.state.fileError&&(
                                                                         this.state.files.map((file,key)=>{
                                                                             return <React.Fragment key={key}>
                                                                                 <div className="uploaded-file-container">
                                                                                 <span key={key} className="file-success">{file.name}</span>
                                                                                 <Icon  name="times" className="abort_upload" onClick={()=> this.handleFileDelete(file)}/>
                                                                                 </div>
                                                                                 </React.Fragment>
                                                                         })
                                                                    )}
                                                                </div>
                                                                <div className="abort-upload-container">
                                                                <label htmlFor="upload1" className="file-upload">
                                                                    <div className="fileform">
                                                                        <div className="button button--design js-maket-download">
                                                                            <span>{this.getTranslation().maket.maket1.button}</span>
                                                                        </div>
                                                                        <input className="upload23"  id="upload1" type="file" name="files[]" multiple onClick={this.handleFiles} />
                                                                        <div className="requirements-info">{this.getTranslation().maket.maket1.helper}</div>
                                                                    </div>

                                                                </label>
                                                                    {this.state.jqXHR&&<Icon  size="2x" name="times" className="abort_upload" onClick={(e)=>{
                                                                        if (this.state.jqXHR) {
                                                                            this.state.jqXHR.abort();
                                                                            this.setState(state=>({
                                                                                ...state,
                                                                                jqXHR:null
                                                                            }));
                                                                        }
                                                                        jQuery('.button').removeAttr('style');
                                                                        e.stopPropagation()
                                                                        e.nativeEvent.stopImmediatePropagation();
                                                                        return false;
                                                                    }}/> }
                                                                </div>
                                                            </div>
                                                            )}
                                                        </Transition>
                                                    </label>
                                                </div>

                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-22" className= {`modal-block__content_item__label modal-block__content_item__label--design ${this.state.calcProp.design=='design-outline'?'active':''}`}>
                                                        <div className="file-upload-header">
                                                            <input className="radio-input" type="radio" name="design" id="field_profile-22" value="design-outline" onClick={this.handleChange}/>
                                                            <Transition in={this.state.calcProp.design=='design-outline'} timeout={200}>
                                                                {status=>(
                                                                    <div className={`modal__check-icon--form ${status}`}></div>
                                                                )}
                                                            </Transition>
                                                            <span>{this.getTranslation().maket.maket2.title}</span>
                                                        </div>
                                                        <Transition in={this.state.calcProp.design=='design-outline'} timeout={200}>
                                                            {status=>(
                                                                <div className={`file-upload-container ${status}`}>
                                                                    <div className="modal-block__content_item__outline">
                                                                        <div className="outline-content">
                                                                            <label htmlFor="outline1" className={`outline-item ${this.state.calcProp.outline=='rectangle'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--rectangle"></div>
                                                                                <div className="outline-description">{this.getTranslation().maket.maket2.forms.rect}</div>
                                                                                <input className="radio-input" id="outline1" type="radio" name="outline"  value="rectangle" onClick={this.handleChange}/>
                                                                            </label>
                                                                        </div>
                                                                        <div className="outline-content">{this.getTranslation().maket.maket2.forms.custom_title}</div>
                                                                        <div className="outline-content">
                                                                            <label htmlFor="outline2" className={`outline-item ${this.state.calcProp.outline=='radius35'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--radius35"></div>
                                                                                <div className="outline-description">{this.getTranslation().maket.maket2.forms.rad35}</div>
                                                                                <input className="radio-input" id="outline2" type="radio" name="outline"  value="radius35" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline3" className={`outline-item ${this.state.calcProp.outline=='radius50'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--radius50"></div>
                                                                                <div className="outline-description">{this.getTranslation().maket.maket2.forms.rad50}</div>
                                                                                <input className="radio-input" id="outline3" type="radio" name="outline"  value="radius50" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline4" className={`outline-item ${this.state.calcProp.outline=='radius100'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--radius100"></div>
                                                                                <div className="outline-description">{this.getTranslation().maket.maket2.forms.rad100}</div>
                                                                                <input className="radio-input" id="outline4" type="radio" name="outline"  value="radius100" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline5" className={`outline-item ${this.state.calcProp.outline=='ellipse'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--ellipse"></div>
                                                                                <div className="outline-description">{this.getTranslation().maket.maket2.forms.oval}</div>
                                                                                <input className="radio-input" id="outline5" type="radio" name="outline"  value="ellipse" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline9" className={`outline-item ${this.state.calcProp.outline=='chopped'?'active':''}`}>
                                                                                <div className="outline-icon-draw outline-icon-draw--chopped"></div>
                                                                                <div className="outline-description outline-description--draw">{this.getTranslation().maket.maket2.forms.chopped}</div>
                                                                                <input className="radio-input" id="outline9" type="radio" name="outline"  value="chopped" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline7" className={`outline-item ${this.state.calcProp.outline=='star'?'active':''}`}>
                                                                                <div className="outline-icon-draw outline-icon-draw--star"></div>
                                                                                <div className="outline-description">{this.getTranslation().maket.maket2.forms.star}</div>
                                                                                <input className="radio-input" id="outline7" type="radio" name="outline"  value="star" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline8" className={`outline-item ${this.state.calcProp.outline=='cloud'?'active':''}`}>
                                                                                <div className="outline-icon-draw outline-icon-draw--cloud"></div>
                                                                                <div className="outline-description outline-description--draw">{this.getTranslation().maket.maket2.forms.cloud}</div>
                                                                                <input className="radio-input" id="outline8" type="radio" name="outline"  value="cloud" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline6" className={`outline-item outline-item--centered ${this.state.calcProp.outline=='circle'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--circle"></div>
                                                                                <div className="outline-description">{this.getTranslation().maket.maket2.forms.circle}</div>
                                                                                <input className="radio-input" id="outline6" type="radio" name="outline"  value="circle" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline10" className={`outline-item ${this.state.calcProp.outline=='accent'?'active':''}`}>
                                                                                <div className="outline-icon-draw outline-icon-draw--accent"></div>
                                                                                <div className="outline-description outline-description--draw">{this.getTranslation().maket.maket2.forms.accent}</div>
                                                                                <input className="radio-input" id="outline10" type="radio" name="outline"  value="accent" onClick={this.handleChange}/>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="modal-block__content_item__description">
                                                                        {this.state.files&&this.state.files.length>0&&!this.state.fileError&&(
                                                                            this.state.files.map((file,key)=>{
                                                                                return <React.Fragment key={key}>
                                                                                    <div className="uploaded-file-container">
                                                                                        <span key={key} className="file-success">{file.name}</span>
                                                                                        <Icon  name="times" className="abort_upload" onClick={()=> this.handleFileDelete(file)}/>
                                                                                    </div>
                                                                                </React.Fragment>
                                                                            })
                                                                        )}
                                                                    </div>
                                                                    <div className="abort-upload-container">
                                                                    <label htmlFor="upload2" className="file-upload">
                                                                        <div className="fileform fileform--outline">
                                                                            <div className="button button--design js-maket-download">
                                                                                <span>{this.getTranslation().maket.maket2.button}</span>
                                                                            </div>
                                                                            <input className="upload" id="upload2" type="file" name="files[]" multiple onClick={this.handleFiles}/>
                                                                            <div className="requirements-info">{this.getTranslation().maket.maket2.helper}</div>
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
                                                            )}
                                                        </Transition>
                                                    </label>
                                                </div>

                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-23" className= {`modal-block__content_item__label modal-block__content_item__label--design ${this.state.calcProp.design=='design-none'?'active':''}`}>
                                                        <div className="file-upload-header">
                                                            <input className="radio-input" type="radio" name="design" id="field_profile-23" value="design-none" onClick={this.handleChange}/>
                                                            <Transition in={this.state.calcProp.design=='design-none'} timeout={200}>
                                                                {status=>(
                                                                    <div className={`modal__check-icon--form ${status}`}></div>
                                                                )}
                                                            </Transition>
                                                            <span>{this.getTranslation().maket.maket3.title}</span>
                                                        </div>
                                                        <Transition in={this.state.calcProp.design=='design-none'} timeout={200}>
                                                            {status=>(
                                                                <div className={`file-upload-container ${status}`}>
                                                                    <div className="modal-block__content_item__description">
                                                                        {this.state.files&&this.state.files.length===0&&!this.state.fileError&&(<span>{this.getTranslation().maket.maket3.info}</span>)}
                                                                        {this.state.files&&this.state.files.length>0&&!this.state.fileError&&(
                                                                            this.state.files.map((file,key)=>{
                                                                                return <React.Fragment key={key}>
                                                                                    <div className="uploaded-file-container">
                                                                                        <span key={key} className="file-success">{file.name}</span>
                                                                                        <Icon name="times" className="abort_upload" onClick={()=> this.handleFileDelete(file)}/>
                                                                                    </div>
                                                                                </React.Fragment>
                                                                            })
                                                                        )}
                                                                    </div>
                                                                    <div className="abort-upload-container">
                                                                    <label htmlFor="upload3" className="file-upload">
                                                                        <div className="fileform">
                                                                            <div className="button button--design js-maket-download">
                                                                                <span>{this.getTranslation().maket.maket3.button}</span>
                                                                            </div>
                                                                            <input className="upload"  id="upload3" type="file" name="files[]" multiple onClick={this.handleFiles}/>
                                                                            <div className="requirements-info">{this.getTranslation().maket.maket3.helper}</div>
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
                                                            )}
                                                        </Transition>
                                                    </label>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wrapper-container wrapper-container--modal">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--radio">
                                            <div className="modal-block__content modal-block__content--button">
                                                <div className="modal-block__content_item">
                                                    <a rel="nofollow" className="button button--back button--design  button--modal" onClick={()=>{this.props.handleBookmark({
                                                        print:true,
                                                        design:false,
                                                        deliver:false
                                                    })}}><div>{this.getTranslation().buttons.back}</div></a>
                                                </div>
                                                <div className="modal-block__content_item">
                                                    <a rel="nofollow" className="button button--design button--modal" onClick={()=>{
                                                        gtag('event', 'Отправить', {'event_category': 'Кнопка', 'event_label': 'Оформить заказ1'} );
                                                        this.props.handleBookmark({
                                                        print:false,
                                                        design:false,
                                                        deliver:true
                                                    })}}>{!this.state.isEditOrder?this.getTranslation().buttons.order:'Редактировать заказ'}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>

                    <div id="order" className={`${!this.props.state.deliver?'hidden-part':''}`}>

                        <div className="wrapper-container wrapper-container--modal-grey">
                            <div className="container container--modal-info">
                                <div className="modal-block modal-block--radio">
                                    <div className="modal-block__content modal-block__content--order">
                                        <div className="feedback-form__input-block">
                                            <label className="feedback-form__label" htmlFor="name">{this.getTranslation().name}</label>
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
                                                    if(name.length<=50) {
                                                        this.setState(state=>({
                                                            user: {...state.user, name},
                                                            delivery: {...state.delivery, name}
                                                        }))
                                                    }
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
                                            <label className="feedback-form__label" htmlFor="phone">{this.getTranslation().phone}</label>
                                            <Textbox
                                                classNameInput="validation_input"
                                                classNameWrapper="validation_wrapper"
                                                classNameContainer="validation_container"
                                                id="phone"
                                                name="phone"
                                                type="phone"
                                                tabIndex="0"
                                                validate={this.state.validate}
                                                validationCallback={(res) => {
                                                        this.setState({hasPhoneError: res, validate: !res})
                                                        this.validateContacts();
                                                    }
                                                }

                                                value={this.state.user.phone}
                                                onBlur={()=>{}}
                                                onChange={phone=> {
                                                    if(phone.length<=13) {
                                                        if (!phone || !phone.match(/\+/)) {
                                                            this.setState(state=>({
                                                                user: {...state.user, phone: '+380'},
                                                                delivery: {...state.delivery, phone: '+380'}
                                                            }))
                                                        }
                                                        else if (!phone.match(/^\+[0-9]*$/)) {
                                                            ;
                                                        }
                                                        else if (phone.match(/^\+380[0-9]{0,9}$/)) {
                                                            this.setState(state=>({
                                                                user: {...state.user, phone},
                                                                delivery: {...state.delivery, phone}
                                                            }))
                                                        } else if (phone.length < 4) {
                                                            this.setState(state=>({
                                                                user: {...state.user, phone: '+380'},
                                                                delivery: {...state.delivery, phone: '+380'}
                                                            }))
                                                        }
                                                    }
                                                }
                                                }
                                                validationOption={{
                                                    type:"string",
                                                    reg:/((\+380)+([0-9]){9})/,
                                                    regMsg:'Некорректный телефон',
                                                    showMsg:true,
                                                    check: true,
                                                    required: true
                                                }}
                                            />
                                        </div>

                                        <div className="feedback-form__input-block">
                                            <label className="feedback-form__label" htmlFor="email">{this.getTranslation().email}</label>
                                                <Textbox
                                                classNameInput="validation_input"
                                                classNameWrapper="validation_wrapper"
                                                classNameContainer="validation_container"
                                                id="email"
                                                name="email"
                                                type="text"
                                                tabIndex="0"
                                                validate={this.state.validate}
                                                validationCallback={(res) =>{
                                                    this.setState({ hasEmailError: res, validate:!res});
                                                    this.validateContacts();
                                                }
                                                    }
                                                value={this.state.user.email}
                                                onBlur={()=>{}}
                                                onChange={email=> {
                                                    if(email.length<=50) {
                                                        this.setState(state=>({user: {...state.user, email}}))
                                                    }
                                                }
                                                }
                                                validationOption={{
                                                    type:"string",
                                                    reg:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                    regMsg:'Некорректный E-mail',
                                                    showMsg:true,
                                                    msgOnError:'Некорректный E-mail',
                                                    check: true,
                                                    required: true

                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wrapper-container wrapper-container--modal">
                            <div className="container container--modal-info">
                                <div className="modal-block modal-block--design">
                                    <div className="modal-block__title">{this.getTranslation().payment.title}</div>
                                    <div className="modal-block__content modal-block__content--design">
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-24" className= {`modal-block__content_item__label modal-block__content_item__label--pay ${this.state.user.payment_method=='liq-pay'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="user_payment_method" id="field_profile-24" value="liq-pay"
                                                       onClick={
                                                           (method)=>
                                                               this.setState(
                                                                   (state)=>(
                                                                   {
                                                                       ...state,
                                                                       user: {
                                                                           ...state.user,
                                                                           payment_method: 'liq-pay'
                                                                       }
                                                                   }
                                                                   )
                                                               )
                                                       }
                                                />
                                                <Transition in={this.state.user.payment_method=='liq-pay'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <div className="modal-block__content_item__icon modal-block__content_item__icon--design modal-block__content_item__icon--liq-pay"></div>
                                                <span>{this.getTranslation().payment.liq}</span>
                                            </label>
                                        </div>

                                        <div className="modal-block__content_item">
                                            <label  htmlFor="field_profile-25" className= {`modal-block__content_item__label modal-block__content_item__label--pay ${this.state.user.payment_method=='cashless'?'active':''}`}>
                                                <input tabIndex="0" className="radio-input" type="radio" name="user_payment_method" id="field_profile-25" value="cashless"
                                                       onClick={
                                                           (method)=>this.setState(
                                                               (state)=>(
                                                               {
                                                                   ...state,
                                                                   user:{
                                                                       ...state.user,
                                                                       payment_method:'cashless'
                                                                   }
                                                               }
                                                               )
                                                           )
                                                       }
                                                />
                                                <Transition in={this.state.user.payment_method=='cashless'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <div className="modal-block__content_item__icon modal-block__content_item__icon--design modal-block__content_item__icon--cashless"></div>
                                                <span>{this.getTranslation().payment.cash}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wrapper-container wrapper-container--modal-grey">
                            <div className="container container--modal-info">
                                <div className="modal-block modal-block--radio">
                                    <div className="modal-block__title">{this.getTranslation().delivery.title}</div>
                                    <div className="modal-block__content">
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-28" className= {`modal-block__content_item__label ${this.state.delivery.method=='self'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="user_delivery" id="field_profile-28" value="self"
                                                       onClick={
                                                           (method)=>this.setState(
                                                               (state)=>(
                                                               {
                                                                   ...state,
                                                                   calcProp:{
                                                                       ...state.calcProp,
                                                                       delivery:false
                                                                   },
                                                                   delivery:{
                                                                       ...state.delivery,
                                                                       method:'self'
                                                                   },
                                                                   deliveryNameError:false,
                                                                   deliveryPhoneError:false
                                                               }
                                                               )
                                                           )
                                                       }/>
                                                <Transition in={this.state.delivery.method=='self'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <span>{this.getTranslation().delivery.self.title}</span>
                                                <a target="_blank" href="https://www.google.com.ua/maps/place/%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%A1%D0%BE%D0%BB%D0%BE%D0%BC'%D1%8F%D0%BD%D1%81%D1%8C%D0%BA%D0%B0,+5,+120,+%D0%9A%D0%B8%D1%97%D0%B2,+02000/@50.4291077,30.4728771,17z/data=!3m1!4b1!4m5!3m4!1s0x40d4cec097a3ebdf:0x851409c29a5bffd5!8m2!3d50.4291077!4d30.4750658?hl=ru">
                                                <div className="modal-block__content_item__description">{this.getTranslation().delivery.self.text}</div></a>
                                            </label>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-26" className= {`${this.state.delivery.method=='np'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="user_delivery" id="field_profile-26" value="np"
                                                       onClick={
                                                           (method)=>this.setState(
                                                               (state)=>(
                                                               {
                                                                   ...state,
                                                                   calcProp:{
                                                                       ...state.calcProp,
                                                                       delivery:false
                                                                   },
                                                                   delivery:{
                                                                       ...state.delivery,
                                                                       method:'np'
                                                                   },
                                                                   deliveryNameError:true,
                                                                   deliveryPhoneError:true
                                                               }
                                                               )
                                                           )
                                                       }/>
                                                <Transition in={this.state.delivery.method=='np'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <span>{this.getTranslation().delivery.np.title}</span>
                                            </label>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-27" className= {`modal-block__content_item__label ${this.state.delivery.method=='kiev'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="user_delivery" id="field_profile-27" value="kiev"
                                                       onClick={
                                                           (method)=>this.setState(
                                                               (state)=>(
                                                               {
                                                                   ...state,
                                                                   calcProp:{
                                                                       ...state.calcProp,
                                                                       delivery:true
                                                                   },
                                                                   delivery:{
                                                                       ...state.delivery,
                                                                       method:'kiev'
                                                                   },
                                                                   deliveryNameError:true,
                                                                   deliveryPhoneError:true
                                                               }
                                                               )
                                                           )
                                                       }/>
                                                <Transition in={this.state.delivery.method=='kiev'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <span>{this.getTranslation().delivery.kiev.title}</span>
                                                <div className="modal-block__content_item__description">{this.getTranslation().delivery.kiev.text}</div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="wrapper-container wrapper-container--modal">
                            <div className="container container--modal-info">
                                <div className="modal-block modal-block">
                                    <div className="modal-block__content modal-block__content--deliver">
                                        {this.state.delivery.method!='self'&&(
                                            <React.Fragment>
                                                <div className="feedback-form__input-block">
                                                    <label className="feedback-form__label" htmlFor="delivery_name">{this.getTranslation().delivery.np.form.name}</label>
                                                    <Textbox
                                                        classNameInput="validation_input validation_input--deliver"
                                                        classNameWrapper="validation_wrapper"
                                                        classNameContainer="validation_container"
                                                        id="delivery_name"
                                                        name="delivery_name"
                                                        type="text"
                                                        tabIndex="0"
                                                        validate={this.state.validate}
                                                        validationCallback={(res) =>{
                                                            let validate = this.state.validate;
                                                            if(validate && !res){
                                                                validate = true;
                                                            }
                                                            return this.setState({ deliveryNameError: res, validate})
                                                        }}
                                                        value={this.state.delivery.name}
                                                        onBlur={()=>{}}
                                                        onChange={(name)=> {
                                                            if(name.length<=50) {
                                                                this.setState(state=>({delivery: {...state.delivery,name}}))
                                                            }
                                                        }}
                                                        validationOption={{
                                                            type:"string",
                                                            showMsg:true,
                                                            msgOnError:'Введите ФИО получателя',
                                                            check: true,
                                                            required: true
                                                        }}
                                                    />
                                                </div>

                                                <div className="feedback-form__input-block">
                                                    <label className="feedback-form__label" htmlFor="delivery_phone">{this.getTranslation().delivery.np.form.phone}</label>
                                                    <Textbox
                                                        classNameInput="validation_input validation_input--deliver"
                                                        classNameWrapper="validation_wrapper"
                                                        classNameContainer="validation_container"
                                                        id="delivery_phone"
                                                        name="delivery_phone"
                                                        type="phone"
                                                        tabIndex="0"
                                                        validate={this.state.validate}
                                                        validationCallback={(res) =>{
                                                            let validate = this.state.validate;
                                                            if(validate && !res){
                                                                validate = true;
                                                            }
                                                            return this.setState({ deliveryNameError: res, validate})
                                                        }}
                                                        value={this.state.delivery.phone}
                                                        onBlur={()=>{}}
                                                        onChange={phone=> {
                                                            if(phone.length<=13){
                                                                    if (!phone||!phone.match(/\+/)){
                                                                        this.setState(state=>({delivery: {...state.delivery,phone:'+380'}}))
                                                                    }
                                                                    else if(!phone.match(/^\+[0-9]*$/)){;
                                                                    }
                                                                    else if (phone.match(/^\+380[0-9]{0,9}$/)) {
                                                                        this.setState(state=>({delivery: {...state.delivery,phone}}))
                                                                    }else if(phone.length<4){
                                                                        this.setState(state=>({delivery: {...state.delivery,phone:'+380'}}))
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        validationOption={{
                                                            type:"string",
                                                            reg:/\+380[0-9]{9}/,
                                                            regMsg:'Некорректный телефон',
                                                            showMsg:true,
                                                            msgOnError:'Некорректный телефон',
                                                            check: true,
                                                            required: true
                                                        }}
                                                    />
                                                </div>
                                            </React.Fragment>
                                        )}
                                        {this.state.delivery.method=='np'&&(
                                            <React.Fragment>
                                                <div className="feedback-form__input-block">
                                                    <label className="feedback-form__label" htmlFor="email">{this.getTranslation().delivery.np.form.city}</label>
                                                    <div className="feedback-form__field feedback-form__field--deliver custom-select custom-select--deliver">
                                                        <Select
                                                            id="city-select"
                                                            ref={(ref) => { this.select = ref; }}
                                                            onBlurResetsInput={false}
                                                            onSelectResetsInput={false}
                                                            options={this.state.options.cities}
                                                            clearable={false}
                                                            simpleValue
                                                            name="city"
                                                            value={this.state.np.city}
                                                            onChange={value=>{this.selectHandleChange(value, 'city')}}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="feedback-form__input-block">
                                                    <label className="feedback-form__label" htmlFor="email">{this.getTranslation().delivery.np.form.number}</label>
                                                    <div className="feedback-form__field feedback-form__field--deliver custom-select custom-select--deliver">
                                                        <Select
                                                            id="warehouse-select"
                                                            ref={(ref) => { this.select = ref; }}
                                                            onBlurResetsInput={false}
                                                            onSelectResetsInput={false}
                                                            options={this.state.options.warehouses}
                                                            clearable={false}
                                                            simpleValue
                                                            name="city"
                                                            value={this.state.np.warehouse}
                                                            onChange={value=>{this.selectHandleChange(value, 'warehouse')}}
                                                        />
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )}

                                        <div className="feedback-form__input-block">
                                            <label className="feedback-form__label" htmlFor="delivery_comment">{this.getTranslation().message}</label>
                                            <Textbox
                                                classNameInput="validation_input validation_input--deliver"
                                                classNameWrapper="validation_wrapper"
                                                classNameContainer="validation_container"
                                                id="delivery_comment"
                                                name="delivery_comment"
                                                type="text"
                                                tabIndex="0"
                                                value={this.state.delivery.comment}
                                                onBlur={()=>{}}
                                                onChange={
                                                    (comment)=> {
                                                        if(comment.length<=100) {
                                                            this.setState(state=>(
                                                                {delivery: {...state.delivery, comment}})
                                                            )
                                                        }
                                                    }
                                                }
                                                validationOption={{
                                                    check: false,
                                                    required: false
                                                }}
                                            />
                                        </div>
                                        <div className="terms">{this.getTranslation().terms.text} <Link to={`/terms/${this.props.locale}`} target="_blank" >{this.getTranslation().terms.link}</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wrapper-container wrapper-container--modal-grey">
                            <div className="container container--modal-info">
                                <div className="modal-block modal-block--radio">
                                    <div className="modal-block__content modal-block__content--button">
                                        <div className="modal-block__content_item">
                                            <a rel="nofollow" className="button button--back button--design  button--modal" onClick={()=>{this.props.handleBookmark({
                                                print:false,
                                                design:true,
                                                deliver:false
                                            })}}><div>{this.getTranslation().buttons.back}</div></a>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <div
                                                className="button button--design button--modal"
                                                onClick={()=>{
                                                    gtag('event', 'Отправить', {'event_category': 'Кнопка', 'event_label': 'Оформить заказ2'} );
                                                        this.validateForm()
                                                    }
                                                }
                                            >
                                                {!this.state.isEditOrder?this.getTranslation().buttons.order:'Сохранить правки'}
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
                                        recaptcha:true
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
                                <div className="modal-error__message">
                                    <div className="modal-order-title">{this.getTranslation().order_popup.order} <b>№{this.state.currentOrder.id}</b> {this.getTranslation().order_popup.confirm}</div>
                                    <div>{this.getTranslation().order_popup.email_info} <b>{this.state.user.email}</b></div>
                                    <div>{this.getTranslation().order_popup.info}</div>
                                </div>
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
export default Section1;
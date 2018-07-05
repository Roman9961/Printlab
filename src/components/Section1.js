import React from 'react';
import {Transition} from 'react-transition-group'
import InputRange from 'react-input-range';
import customSelect from '../custom_select';
import base from '../base';
import calc from './calculator';

class Section1 extends React.Component{
    state = {
        tooltip:false,
        range:4,
        calculator : {

        },
        calcProp:{
            "basis" : "Пластиковая",
            "basis_param":"white",
            "print_type" : "",
            "cut_form" : "",
            "design" : "",
            "form" : "",
            "height" : "",
            "lamination" : "",
            "numberoflist" : "",
            "print_time" : 4,
            "quantity" : "",
            "stamping" : "",
            "stickersonlist" : "",
            "type" : "",
            "user_comment" : "",
            "user_contacts" : "",
            "user_delivery" : "",
            "user_delivery_district" : "",
            "user_mail" : "",
            "user_name" : "",
            "user_payment_method" : "",
            "user_phone" : "",
            "varnish" : "",
            "width" : "",
            "margin":4,
            "selector": "final-price-main",
            "outline":''
        },
        np:{
            cities:[],
            warehouses:[],
            city:'Киев',
            warehouse:'1'
        }
    };
    componentDidMount(){
        this.ref = base.fetch('Stickers/calculator',{
            context: this

        }).then ((data)=>{
            {
                this.setState({calculator:data});
                if(Object.keys(this.props.calcProp).length !== 0){
                    this.props.calcProp.selector="final-price-main";
                    this.setState((state)=>({
                        ...state,
                        calcProp:this.props.calcProp
                    }));
                }
                calc(this.state);
            };
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
                        "apiKey": "0252bfcbba5e10fda4f7e7cdfb497458"
                    })
            });
            const content = await rawResponse.json();

            let cities=[];
            content.data.map((city)=>{
                cities.push({name:city.DescriptionRu})
            });
            cities = cities.sort((a,b)=>{
                if(a.name<b.name) return -1;
                if(a.name>b.name) return 1;
                return 0;
            });
            this.setState(state=>({
                ...state,
                np:{
                    ...state.np,
                    cities
                }
            }));
            customSelect();
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
                        "apiKey": "0252bfcbba5e10fda4f7e7cdfb497458"
                    })
            });
            const content = await rawResponse.json();

            let warehouses=[];
            content.data.map((warehouse)=>{
                warehouses.push({name:warehouse.DescriptionRu, id:warehouse.Number})
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
                    warehouses
                }
            }));
            customSelect();
        })();

    }
    componentDidUpdate(){
        calc(this.state);
    }

     updatecalcProp =  (key, value) =>{
        const calcProp = {...this.state.calcProp};

         calcProp[key] = value;
         if(calcProp.form === 'Рулонная'){
             calcProp.print_type = 'Рулонная';
             if(parseInt(calcProp.margin)<3){
                 this.state.range=3;
             }else if(parseInt(calcProp.margin)>500){
                 this.state.range=500;
             }else if(isNaN(parseInt(calcProp.margin, 10))){
                this.state.range=3;
            }else{
                 this.state.range=parseInt(calcProp.margin);
             }
         }else{
             calcProp.print_type = 'Листовая';
             calcProp.margin = 4;
             this.state.range=4;
         }
         if(calcProp.height>378 || calcProp.width>278 ||  value === 'Рулонная'){
             calcProp.print_type = 'Рулонная';
         }

         calcProp.margin = parseInt(calcProp.margin);

         this.setState((state)=>({
             ...state,
             calcProp
         }));
    }
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
                    event.currentTarget.value);
           const calculator = this.state;
           await calc(calculator);
       }
    };

    toolTipVisible = () => {
        this.setState((state)=>({
            ...state,
            tooltip: !state.tooltip
        }
        ))
    };

    selectHandleChange = async (event) => {
        const id = event.currentTarget.value;


        if(event.currentTarget.name ==='city') {
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
                            "apiKey": "0252bfcbba5e10fda4f7e7cdfb497458"
                        })
                });
                const content = await rawResponse.json();

                let warehouses = [];
                content.data.map((warehouse)=> {
                    warehouses.push({name: warehouse.DescriptionRu, id: warehouse.Number})
                });
                warehouses = warehouses.sort((a, b)=> {
                    if (parseInt(a.id) < parseInt(b.id)) return -1;
                    if (parseInt(a.id) > parseInt(b.id)) return 1;
                    return 0;
                });
                this.setState(state=>({
                    ...state,
                    np: {
                        ...state.np,
                        warehouses
                    }
                }));
                customSelect();
            })();
        }
        await this.updateDeliveryProp(event.currentTarget.name, id);
    };

    render(){
        return (
    <section className="form-row">
        <div id="form-calculator" >
        <div className="close-popup btn-close-popup"><i className="icon-cross"></i></div>
        <div id="final-price-main" className="price-wrapper">
            <div>Сумма заказа:</div>
            <span>0</span>
        </div>
            <div className="wrapper-container wrapper-container--modal">
                <div className="container container--modal-info">
                    <div>Укажите, на что хотите печатать наклейки:</div>
                    <div><input className="modal-info__field" type="text" placeholder="на банки"/></div>
                </div>
            </div>


                <div className="row">
                    <div className="col-xs-12">
                        <form id="sendorder">

                            <div id="part-1" className={`${!this.props.state.print?'hidden-part':''}`}>
                                <div className="wrapper-container wrapper-container--modal-grey">
                                <div className="container container--modal-info">
                                    <div className="modal-block modal-block--radio">
                                    <div className="modal-block__title">Форма наклейки:</div>
                                    <div className="modal-block__content">
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-01" className= {`${this.state.calcProp.form=='Прямоугольная'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="form" id="field_profile-01" value="Прямоугольная" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.form=='Прямоугольная'} timeout={200}>
                                                    {status=>(
                                                            <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <div className="modal-block__content_item__icon modal-block__content_item__icon--rect"></div>
                                                <span>Прямоугольная(без скругления)</span>
                                            </label>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-02" className= {`${this.state.calcProp.form=='Простая форма'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="form" id="field_profile-02" value="Простая форма" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.form=='Простая форма'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <div className="modal-block__content_item__icon modal-block__content_item__icon--simple"></div>
                                                <span>Наклейки простой формы</span>
                                            </label>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-03" className= {`${this.state.calcProp.form=='Сложная форма'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="form" id="field_profile-03" value="Сложная форма" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.form=='Сложная форма'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <div className="modal-block__content_item__icon modal-block__content_item__icon--hard"></div>
                                                <span>Наклейки сложной формы</span>
                                            </label>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-04" className= {`${this.state.calcProp.form=='Рулонная'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="form" id="field_profile-04" value="Рулонная" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.form=='Рулонная'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <div className="modal-block__content_item__icon--roll modal-block__content_item__icon"></div>
                                                <span>Рулонная цифровая печать</span>
                                            </label>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>

                                <div className="wrapper-container wrapper-container--modal">
                                    <div className="container container--modal-input">
                                        <div className="modal-block">
                                            <div className="modal-block__title">Размер:</div>
                                            <div className="modal-block__content modal-block__content--input">
                                                <div className="modal-block__content_item modal-block__content_item--input">
                                                    <input className="number-input"  type="number" name="height" id="field_profile-05" value={this.state.calcProp.height} min="3" max={(this.state.calcProp.print_type === 'Рулонная')?49000:438} onChange={this.handleChange} placeholder="302"/>
                                                    <span>Высота, мм</span>
                                                </div>
                                                <div>x</div>
                                                <div className="modal-block__content_item modal-block__content_item--input">
                                                    <input className="number-input" type="number" name="width" id="field_profile-06" value={this.state.calcProp.width} onChange={this.handleChange} min="3" max={(this.state.calcProp.print_type === 'Рулонная')?1500:308}  placeholder="200"/>
                                                    <span>Ширина, мм</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-block">
                                            <div className="modal-block__title">Количество:</div>
                                             <div className="modal-block__content modal-block__content--input">
                                                 <div className="modal-block__content_item modal-block__content_item--input">
                                                     <input className="number-input" type="number" name="quantity" id="field_profile-07" value={this.state.calcProp.quantity} onChange={this.handleChange} min="0" max="99999" step="1" placeholder="21800"/>
                                                     <span>Штук</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.calcProp.print_type==='Рулонная'&&(
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
                                                    <span>Ширина, мм</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )}

                                </div>
                                <div className="wrapper-container wrapper-container--modal-grey">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--radio">
                                            <div className="modal-block__title">Тип печати:</div>
                                            <div className="modal-block__content">
                                            <div className="modal-block__content_item">
                                                <label htmlFor="field_profile-09" className= {`${this.state.calcProp.type=='Цветная'?'active':''}`}>
                                                    <input className="radio-input" type="radio" name="type" id="field_profile-09" value="Цветная" onClick={this.handleChange}/>
                                                    <Transition in={this.state.calcProp.type=='Цветная'} timeout={200}>
                                                        {status=>(
                                                            <div className={`modal__check-icon--form ${status}`}></div>
                                                        )}
                                                    </Transition>
                                                    <span>Цветная</span>
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
                                                    <span>Черно-белая</span>
                                                </label>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="wrapper-container wrapper-container--modal">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--radio">
                                            <div className="modal-block__title">Основа:</div>
                                            <div className="modal-block__content">
                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-11" className= {`${this.state.calcProp.basis=='Бумажная'?'active':''}`}>
                                                        <input className="radio-input" type="radio" name="basis" id="field_profile-11" value="Бумажная" onClick={this.handleChange}/>
                                                        <Transition in={this.state.calcProp.basis=='Бумажная'} timeout={200}>
                                                            {status=>(
                                                                <div className={`modal__check-icon--form ${status}`}></div>
                                                            )}
                                                        </Transition>
                                                        <div className="modal-block__content_item__icon--paper modal-block__content_item__icon"></div>
                                                        <span>Самоклеящаяся бумага</span>
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
                                                        <span>Самоклеящаяся пленка</span>
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
                                                                <span>Прозрачная основа</span>
                                                                <div className="modal-block__content_item__description">
                                                                    Для лучшего качества печати на прозрачной основе
                                                                    используется рулонная цифровая или УФ печать, предварительно печатается слой белой краски (белила) для обеспечения более насыщенного основного изображения
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
                                                                <span>Белая основа</span>
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
                                            <div className="modal-block__title">Дополнительная обработка:</div>
                                            <div className="modal-block__content">
                                                <div className="modal-block__content_item">
                                                    <div className="modal-block__content_item__checkbox-container">
                                                        <div className="modal-block__content_item__checkbox-container__checkboxes">
                                                            <label htmlFor="field_profile-16">
                                                                <div className= {`modal-block__content_item__checkbox ${this.state.calcProp.lamination=='matt'?'active':''}`}>
                                                                    <div className="modal-checkbox"></div>
                                                                </div>
                                                                <input type="checkbox" name="lamination" id="field_profile-16" value="matt" checked ={this.state.calcProp.lamination=='matt'}  onClick={this.handleChange}/>
                                                                <div className="modal-checkbox__title">Матовая ламинация</div>
                                                            </label>
                                                            <label htmlFor="field_profile-15">
                                                            <div className= {`modal-block__content_item__checkbox ${this.state.calcProp.lamination=='gloss'?'active':''}`}>
                                                                <div className="modal-checkbox"></div>
                                                            </div>
                                                            <input type="checkbox" name="lamination" id="field_profile-15" value="gloss" checked ={this.state.calcProp.lamination=='gloss'} onClick={this.handleChange}/>
                                                            <div className="modal-checkbox__title">Глянцевая ламинация</div>
                                                        </label>
                                                        </div>
                                                        <hr/>
                                                        <div className="modal-block__content_item__description">
                                                            Советуем ламинировать наклейки для часто используемых поверхностей (ноутбук, телефон, флакон, чемодан).
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-block__content_item">
                                                    <div className="modal-block__content_item__checkbox-container">
                                                        <div className="modal-block__content_item__checkbox-container__checkboxes">
                                                            <label htmlFor="field_profile-17">
                                                                <div className= {`modal-block__content_item__checkbox ${this.state.calcProp.stamping?'active':''}`}>
                                                                    <div className="modal-checkbox"></div>
                                                                </div>
                                                                <input type="checkbox" disabled name="stamping" id="field_profile-17" value={false} checked ={this.state.calcProp.stamping}  onClick={this.handleChange}/>
                                                                <div className="modal-checkbox__title">Тиснение</div>
                                                            </label>
                                                            <label htmlFor="field_profile-18">
                                                                <div className= {`modal-block__content_item__checkbox ${this.state.calcProp.varnish?'active':''}`}>
                                                                    <div className="modal-checkbox"></div>
                                                                </div>
                                                                <input type="checkbox" disabled name="varnish" id="field_profile-18" value={false} checked ={this.state.calcProp.varnish} onClick={this.handleChange}/>
                                                                <div className="modal-checkbox__title">УФ-лак</div>
                                                            </label>
                                                        </div>
                                                        <hr/>
                                                        <div className="modal-block__content_item__description">
                                                            Эта опция пока недоступна в калькуляторе, обратитесь за просчетом к нашим сотрудникам.
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>

                                <div className="wrapper-container wrapper-container--modal">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--radio">
                                            <div className="modal-block__title">Срок печати:</div>
                                            <div className="modal-block__content">
                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-19" className= {`${this.state.calcProp.print_time=='2'?'active':''}`}>
                                                        <input className="radio-input" type="radio" name="print_time" id="field_profile-19" value="2" onClick={this.handleChange}/>
                                                        <Transition in={this.state.calcProp.print_time=='2'} timeout={200}>
                                                            {status=>(
                                                                <div className={`modal__check-icon--form ${status}`}></div>
                                                            )}
                                                        </Transition>
                                                        <div className="modal-block__content_item__icon--paper modal-block__content_item__icon"></div>
                                                        <span>2дня (+20%)</span>
                                                    </label>
                                                </div>
                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-20" className= {`${this.state.calcProp.print_time=='4'?'active':''}`}>
                                                        <input className="radio-input" type="radio" name="print_time" id="field_profile-20" defaultChecked value="4" onClick={this.handleChange}/>
                                                        <Transition in={this.state.calcProp.print_time=='4'} timeout={200}>
                                                            {status=>(
                                                                <div className={`modal__check-icon--form ${status}`}></div>
                                                            )}
                                                        </Transition>
                                                        <div className="modal-block__content_item__icon--plastic modal-block__content_item__icon"></div>
                                                        <span>4 дня</span>
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
                                                        <a rel="nofollow" className="button button--design" onClick={()=>{this.props.handleBookmark({
                                                            print:false,
                                                            design:true,
                                                            deliver:false
                                                        })}}>Перейти к дизайну</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div id="part-2" className={`${!this.props.state.design?'hidden-part':''}`}>


                                <div className="wrapper-container wrapper-container--modal-grey">
                                    <div className="container container--modal-info">
                                        <div className="modal-block modal-block--design">
                                            <div className="modal-block__title">Дизайн и контур порезки:</div>
                                            <div className="modal-block__content modal-block__content--design">
                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-21" className= {`modal-block__content_item__label modal-block__content_item__label--design ${this.state.calcProp.design=='design-all'?'active':''}`}>
                                                        <input className="radio-input" type="radio" name="design" id="field_profile-21" value="design-all" onClick={this.handleChange}/>
                                                        <Transition in={this.state.calcProp.design=='design-all'} timeout={200}>
                                                            {status=>(
                                                                <div className={`modal__check-icon--form ${status}`}></div>
                                                            )}
                                                        </Transition>
                                                        <span>У меня есть макет и контур порезки</span>
                                                        <Transition in={this.state.calcProp.design=='design-all'} timeout={200}>
                                                            {status=>(
                                                            <div className={`file-upload-container ${status}`}>
                                                                <div className="modal-block__content_item__description">
                                                                    Если ваш макет соответствует требованиям к макету , то
                                                                    загрузите его:
                                                                </div>
                                                                <label htmlFor="upload1" className="file-upload">
                                                                    <div className="fileform">
                                                                        <div className="button button--design">
                                                                            <span>Загрузить макет</span>
                                                                        </div>
                                                                        <input className="upload"  id="upload1" type="file" name="files[]" multiple/>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                            )}
                                                        </Transition>
                                                    </label>
                                                </div>

                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-22" className= {`modal-block__content_item__label modal-block__content_item__label--design ${this.state.calcProp.design=='design-outline'?'active':''}`}>
                                                        <input className="radio-input" type="radio" name="design" id="field_profile-22" value="design-outline" onClick={this.handleChange}/>
                                                        <Transition in={this.state.calcProp.design=='design-outline'} timeout={200}>
                                                            {status=>(
                                                                <div className={`modal__check-icon--form ${status}`}></div>
                                                            )}
                                                        </Transition>
                                                        <span>У меня есть макет, но мне нужен контур порезки</span>
                                                        <Transition in={this.state.calcProp.design=='design-outline'} timeout={200}>
                                                            {status=>(
                                                                <div className={`file-upload-container ${status}`}>
                                                                    <div className="modal-block__content_item__outline">
                                                                        <div className="outline-content">
                                                                            <label htmlFor="outline1" className={`outline-item ${this.state.calcProp.outline=='rectangle'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--rectangle"></div>
                                                                                <div className="outline-description">Прямоугольный</div>
                                                                                <input className="radio-input" id="outline1" type="radio" name="outline"  value="rectangle" onClick={this.handleChange}/>
                                                                            </label>
                                                                        </div>
                                                                        <div className="outline-content">Скругленные углы:</div>
                                                                        <div className="outline-content">
                                                                            <label htmlFor="outline2" className={`outline-item ${this.state.calcProp.outline=='radius35'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--radius35"></div>
                                                                                <div className="outline-description">Радиус 3,5 мм</div>
                                                                                <input className="radio-input" id="outline2" type="radio" name="outline"  value="radius35" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline3" className={`outline-item ${this.state.calcProp.outline=='radius50'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--radius50"></div>
                                                                                <div className="outline-description">Радиус 5 мм</div>
                                                                                <input className="radio-input" id="outline3" type="radio" name="outline"  value="radius50" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline4" className={`outline-item ${this.state.calcProp.outline=='radius100'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--radius100"></div>
                                                                                <div className="outline-description">Радиус 10 мм</div>
                                                                                <input className="radio-input" id="outline4" type="radio" name="outline"  value="radius100" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline5" className={`outline-item ${this.state.calcProp.outline=='ellipse'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--ellipse"></div>
                                                                                <div className="outline-description">Овал</div>
                                                                                <input className="radio-input" id="outline5" type="radio" name="outline"  value="ellipse" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline6" className={`outline-item outline-item--centered ${this.state.calcProp.outline=='circle'?'active':''}`}>
                                                                                <div className="outline-icon outline-icon--circle"></div>
                                                                                <div className="outline-description">Круг</div>
                                                                                <input className="radio-input" id="outline6" type="radio" name="outline"  value="circle" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline7" className={`outline-item ${this.state.calcProp.outline=='star'?'active':''}`}>
                                                                                <div className="outline-icon-draw outline-icon-draw--star"></div>
                                                                                <div className="outline-description">Звезда</div>
                                                                                <input className="radio-input" id="outline7" type="radio" name="outline"  value="star" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline8" className={`outline-item ${this.state.calcProp.outline=='cloud'?'active':''}`}>
                                                                                <div className="outline-icon-draw outline-icon-draw--cloud"></div>
                                                                                <div className="outline-description outline-description--draw">“Облако” + 100 грн</div>
                                                                                <input className="radio-input" id="outline8" type="radio" name="outline"  value="cloud" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline9" className={`outline-item ${this.state.calcProp.outline=='chopped'?'active':''}`}>
                                                                                <div className="outline-icon-draw outline-icon-draw--chopped"></div>
                                                                                <div className="outline-description outline-description--draw">“Рубленый” +100 грн</div>
                                                                                <input className="radio-input" id="outline9" type="radio" name="outline"  value="chopped" onClick={this.handleChange}/>
                                                                            </label>
                                                                            <label htmlFor="outline10" className={`outline-item ${this.state.calcProp.outline=='accent'?'active':''}`}>
                                                                                <div className="outline-icon-draw outline-icon-draw--accent"></div>
                                                                                <div className="outline-description outline-description--draw">“Акцент” +100 грн</div>
                                                                                <input className="radio-input" id="outline10" type="radio" name="outline"  value="accent" onClick={this.handleChange}/>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <label htmlFor="upload2" className="file-upload">
                                                                        <div className="fileform fileform--outline">
                                                                            <div className="button button--design">
                                                                                <span>Загрузить макет</span>
                                                                            </div>
                                                                            <input className="upload" id="upload2" type="file" name="files[]" multiple/>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            )}
                                                        </Transition>
                                                    </label>
                                                </div>

                                                <div className="modal-block__content_item">
                                                    <label htmlFor="field_profile-23" className= {`modal-block__content_item__label modal-block__content_item__label--design ${this.state.calcProp.design=='design-none'?'active':''}`}>
                                                        <input className="radio-input" type="radio" name="design" id="field_profile-23" value="design-none" onClick={this.handleChange}/>
                                                        <Transition in={this.state.calcProp.design=='design-none'} timeout={200}>
                                                            {status=>(
                                                                <div className={`modal__check-icon--form ${status}`}></div>
                                                            )}
                                                        </Transition>
                                                        <span>У меня нет макета, мне нужен дизайн</span>
                                                        <Transition in={this.state.calcProp.design=='design-none'} timeout={200}>
                                                            {status=>(
                                                                <div className={`file-upload-container ${status}`}>
                                                                    <div className="modal-block__content_item__description">
                                                                        Мы можем создать индивидуальный дизайн наклеек с учетом всех Ваших пожеланий. Наш оператор перезвонит Вам для уточнения всех необходимых деталей.  Также Вы можете загрузить пример желаемого дизайна.
                                                                    </div>
                                                                    <label htmlFor="upload3" className="file-upload">
                                                                        <div className="fileform">
                                                                            <div className="button button--design">
                                                                                <span>Загрузить пример</span>
                                                                            </div>
                                                                            <input className="upload"  id="upload3" type="file" name="files[]" multiple/>
                                                                        </div>
                                                                    </label>
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
                                                    })}}><div>Назад</div></a>
                                                </div>
                                                <div className="modal-block__content_item">
                                                    <a rel="nofollow" className="button button--design button--modal" onClick={()=>{this.props.handleBookmark({
                                                        print:false,
                                                        design:false,
                                                        deliver:true
                                                    })}}>Оформить заказ</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>

                    <div id="part-3" className={`${!this.props.state.deliver?'hidden-part':''}`}>

                        <div className="wrapper-container wrapper-container--modal-grey">
                            <div className="container container--modal-info">
                                <div className="modal-block modal-block--radio">
                                    <div className="modal-block__content modal-block__content--order">
                                        <div className="feedback-form__input-block">
                                            <label className="feedback-form__label" htmlFor="name">Ваше имя:</label>
                                            <input className="feedback-form__field" type="text" id="name" name="name"/>
                                        </div>

                                        <div className="feedback-form__input-block">
                                            <label className="feedback-form__label" htmlFor="phone">Ваше телефон:</label>
                                            <input className="feedback-form__field" type="text" id="phone" name="phone"/>
                                        </div>

                                        <div className="feedback-form__input-block">
                                            <label className="feedback-form__label" htmlFor="email">Ваше email:</label>
                                            <input className="feedback-form__field" type="text" id="email" name="email"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wrapper-container wrapper-container--modal">
                            <div className="container container--modal-info">
                                <div className="modal-block modal-block--design">
                                    <div className="modal-block__title">Оплата:</div>
                                    <div className="modal-block__content modal-block__content--design">
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-24" className= {`modal-block__content_item__label modal-block__content_item__label--design ${this.state.calcProp.user_payment_method=='liq-pay'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="user_payment_method" id="field_profile-24" value="liq-pay" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.user_payment_method=='liq-pay'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <div className="modal-block__content_item__icon modal-block__content_item__icon--design modal-block__content_item__icon--liq-pay"></div>
                                                <span>Оплата LiqPay (Visa/MasterCard, Приват24, Терминал)</span>
                                            </label>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-25" className= {`modal-block__content_item__label modal-block__content_item__label--design ${this.state.calcProp.user_payment_method=='cashless'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="user_payment_method" id="field_profile-25" value="cashless" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.user_payment_method=='cashless'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <div className="modal-block__content_item__icon modal-block__content_item__icon--design modal-block__content_item__icon--cashless"></div>
                                                <span>Оплата LiqPay (Visa/MasterCard, Приват24, Терминал)</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wrapper-container wrapper-container--modal-grey">
                            <div className="container container--modal-info">
                                <div className="modal-block modal-block--radio">
                                    <div className="modal-block__title">Способ доставки:</div>
                                    <div className="modal-block__content">
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-26" className= {`${this.state.calcProp.user_delivery=='np'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="user_delivery" id="field_profile-26" value="np" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.user_delivery=='np'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <span>Новая Почта (оплата по тарифам Новой Почты)</span>
                                            </label>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-27" className= {`modal-block__content_item__label ${this.state.calcProp.user_delivery=='kiev'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="user_delivery" id="field_profile-27" value="kiev" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.user_delivery=='kiev'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <span>Доставка по Киеву</span>
                                                <div className="modal-block__content_item__description">+30-50 грн в зависимости от Вашего района</div>
                                            </label>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <label htmlFor="field_profile-28" className= {`${this.state.calcProp.user_delivery=='self'?'active':''}`}>
                                                <input className="radio-input" type="radio" name="user_delivery" id="field_profile-28" value="self" onClick={this.handleChange}/>
                                                <Transition in={this.state.calcProp.user_delivery=='self'} timeout={200}>
                                                    {status=>(
                                                        <div className={`modal__check-icon--form ${status}`}></div>
                                                    )}
                                                </Transition>
                                                <span>Самовывоз</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="wrapper-container wrapper-container--modal">
                            <div className="container container--modal-info">
                                <div className="modal-block modal-block--radio">
                                    <div className="modal-block__content modal-block__content--deliver">
                                        <div className="feedback-form__input-block">
                                            <label className="feedback-form__label" htmlFor="delivery_sirname">ФИО получателя:</label>
                                            <input className="feedback-form__field feedback-form__field--deliver" type="text" id="delivery_sirname" name="delivery_sirname" value={this.state.calcProp.delivery_sirname}/>
                                        </div>

                                        <div className="feedback-form__input-block">
                                            <label className="feedback-form__label" htmlFor="delivery_phone">Ваше телефон:</label>
                                            <input className="feedback-form__field feedback-form__field--deliver" type="text" id="delivery_phone" name="delivery_phone" value={this.state.calcProp.delivery_phone}/>
                                        </div>

                                        <div className="feedback-form__input-block">
                                            <label className="feedback-form__label" htmlFor="email">Населенный пункт:</label>
                                            <div className="feedback-form__field feedback-form__field--deliver custom-select custom-select--deliver">
                                                <select name="city" onChange={this.selectHandleChange} value={this.state.np.city}>
                                                    {
                                                       this.state.np.cities.map((city,key)=> {
                                                            return(
                                                                <option key={key} value={city.name}>{city.name}</option>
                                                                )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="feedback-form__input-block">
                                            <label className="feedback-form__label" htmlFor="email">Отделение Новой почты:</label>
                                            <div className="feedback-form__field feedback-form__field--deliver custom-select custom-select--deliver">
                                                <select name="warehouse" onChange={this.selectHandleChange} value={this.state.np.warehouse}>
                                                    {
                                                        this.state.np.warehouses.map((warehouse,key)=> {
                                                            return(
                                                                <option key={key} value={warehouse.id}>{warehouse.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="feedback-form__input-block">
                                            <label className="feedback-form__label" htmlFor="delivery_comment">ФИО получателя:</label>
                                            <input className="feedback-form__field feedback-form__field--deliver" type="text" id="delivery_comment" name="delivery_comment" value={this.state.calcProp.delivery_comment}/>
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
                                            <a rel="nofollow" className="button button--back button--design  button--modal" onClick={()=>{this.props.handleBookmark({
                                                print:false,
                                                design:true,
                                                deliver:false
                                            })}}><div>Назад</div></a>
                                        </div>
                                        <div className="modal-block__content_item">
                                            <a rel="nofollow" className="button button--design button--modal" onClick={()=>{alert('Заказ принят ;)')}}>Оформить заказ</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>

</div>
</section>
        )
    }
}
export default Section1;
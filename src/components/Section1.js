import React from 'react';
import {Transition} from 'react-transition-group'
import InputRange from 'react-input-range';
import base from '../base';
import calc from './calculator';

class Section1 extends React.Component{
    state = {
        tooltip:false,
        range:4,
        calculator : {

        },
        calcProp:{
            "basis" : "",
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
            "selector": "final-price-main"
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
        })

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
         if(calcProp.print_type === 'Рулонная'){
             calcProp.basis = 'Пластиковая';
         }
         calcProp.margin = parseInt(calcProp.margin);

        this.setState({calcProp});
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
           await this.updatecalcProp(event.currentTarget.name, (event.currentTarget.name === 'lamination') ? event.currentTarget.checked : event.currentTarget.value);
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
                                    <div className="modal-block">
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
                                                    <input className="number-input"  type="number" name="height" id="field_profile-14" value={this.state.calcProp.height} min="3" max={(this.state.calcProp.print_type === 'Рулонная')?49000:438} onChange={this.handleChange} placeholder="302"/>
                                                    <span>Высота, мм</span>
                                                </div>
                                                <div>x</div>
                                                <div className="modal-block__content_item modal-block__content_item--input">
                                                    <input className="number-input" type="number" name="width" id="field_profile-15" value={this.state.calcProp.width} onChange={this.handleChange} min="3" max={(this.state.calcProp.print_type === 'Рулонная')?1500:308}  placeholder="200"/>
                                                    <span>Ширина, мм</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-block">
                                            <div className="modal-block__title">Количество:</div>
                                             <div className="modal-block__content modal-block__content--input">
                                                 <div className="modal-block__content_item modal-block__content_item--input">
                                                     <input className="number-input" type="number" name="quantity" id="field_profile-16" value={this.state.calcProp.quantity} onChange={this.handleChange} min="0" max="99999" step="1" placeholder="21800"/>
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
                                                    <div className={`range-tooltip ${this.state.tooltip?'active':''}`} onMouseDown={this.toolTipVisible} onMouseUp={this.toolTipVisible}>
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
                                                    <input className="number-input" type="number" name="margin" id="field_profile-15" value={this.state.calcProp.margin} onChange={this.handleChange} min="3" max="500"/>
                                                    <span>Ширина, мм</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )}

                                </div>

                                <div className="form-field">
                                    <div className="row">
                                <div className="col-lg-7 col-sm-6">
                                    <div className="h3 primary-label">Тип печати:</div>
                                    <div className="frm_container frm_opt_container">
                                        <div className="frm_item frm_radio">
                                            <label htmlFor="field_profile-117">
                                                <input type="radio" name="print_type" id="field_profile-117" value="Листовая"  checked={this.state.calcProp.print_type === 'Листовая'} onClick={this.handleChange}/>
                                                <i></i>
                                                Листовая
                                            </label>
                                        </div>
                                        <div className="frm_item frm_radio">
                                            <label htmlFor="field_profile-118">
                                                <input type="radio" name="print_type" id="field_profile-118" value="Рулонная" checked={this.state.calcProp.print_type === 'Рулонная'}  onChange={this.handleChange}/>
                                                <i></i>
                                                Рулонная
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                    </div>
                                </div>


                                <div className="form-field">
                                    <div className="row">
                                        <div className="col-lg-7 col-sm-6">
                                            <div className="h3 primary-label">Тип печати:</div>
                                            <div className="frm_container frm_opt_container">
                                                <div className="frm_item frm_radio">
                                                    <label htmlFor="field_profile-17">
                                                        <input type="radio" name="type" id="field_profile-17"
                                                               value="Цветная" onClick={this.handleChange}/>
                                                        <i></i>
                                                        Цветная
                                                    </label>
                                                </div>
                                                <div className="frm_item frm_radio">
                                                    <label htmlFor="field_profile-18">
                                                        <input type="radio" name="type" id="field_profile-18"
                                                               value="Черно-белая" onClick={this.handleChange}/>
                                                        <i></i>
                                                        Черно-белая
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        {!(this.state.calcProp.print_type === 'Рулонная') &&
                                        <div className="col-lg-5 col-sm-6">
                                            <div className="h3 primary-label">Основа:</div>
                                            <div className="frm_container frm_opt_container">
                                                <div className="frm_item frm_radio">
                                                    <label htmlFor="field_profile-19">
                                                        <input type="radio" name="basis" id="field_profile-19"
                                                               value="Бумажная"
                                                               checked={!(this.state.calcProp.print_type === 'Рулонная') && (this.state.calcProp.basis === 'Бумажная')     }
                                                               onClick={this.handleChange}/>
                                                        <i></i>
                                                        Бумажная <br/>(самоклейка)
                                                    </label>
                                                </div>
                                                <div className="frm_item frm_radio">
                                                    <label htmlFor="field_profile-110">
                                                        <input type="radio" name="basis" id="field_profile-110"
                                                               value="Пластиковая"
                                                               checked={(this.state.calcProp.print_type === 'Рулонная') || (this.state.calcProp.basis === 'Пластиковая')}
                                                               onChange={this.handleChange}/>
                                                        <i></i>
                                                        Пластиковая <br/>(Oracal)
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>

                                <div className="form-field dop-obrobotka-row">
                                    <div className="h3 primary-label">Дополнительная обработка:</div>
                                    <div className="frm_container">
                                        <div className="row">

                                            <div className="col-sm-6">
                                                <div className="frm_container frm_opt_container">
                                                    <div className="frm_item frm_checkbox">
                                                        <label htmlFor="field_profile-113">
                                                            <input type="checkbox" name="lamination" id="field_profile-113"  onClick={this.handleChange}/>
                                                                <i></i>
                                                                Ламинация
                                                        </label>
                                                    </div>
                                                </div>
                                                <p className="description bottom">Рекомендуем ламинировать наклейки для часто используемых поверхностей (ноутбук, телефон, флакон, чемодан).</p>
                                            </div>

                                            <div className="col-sm-6">
                                                <div className="frm_container frm_opt_container">
                                                    <div className="frm_item frm_checkbox disabled">
                                                        <label htmlFor="field_profile-111">
                                                            <input type="checkbox" disabled name="stamping" id="field_profile-111" value="Да" />
                                                                <i></i>
                                                                Тиснение
                                                        </label>
                                                    </div>
                                                    <div className="frm_item frm_checkbox disabled">
                                                        <label htmlFor="field_profile-112">
                                                            <input type="checkbox" disabled name="varnish" id="field_profile-112" value="Да"/>
                                                                <i></i>
                                                                УФ-лак
                                                        </label>
                                                    </div>
                                                </div>
                                                <p className="description bottom">Эта опция пока недоступна в калькуляторе, обратитесь за просчетом к нашим сотрудникам.</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="form-field">
                                    <div className="h3 primary-label">Срок печати:</div>
                                    <div className="frm_container frm_opt_container">
                                        <div className="frm_item frm_radio">
                                            <label htmlFor="field_profile-114">
                                                <input type="radio" name="print_time" id="field_profile-114" value="2" onClick={this.handleChange}/>
                                                    <i></i>
                                                    2дня (+20%)
                                            </label>
                                        </div>
                                        <div className="frm_item frm_radio">
                                            <label htmlFor="field_profile-115">
                                                <input type="radio" name="print_time" id="field_profile-115" defaultChecked value="4" onClick={this.handleChange}/>
                                                    <i></i>
                                                    4 дня
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <a href="javascript:;" data-step="2" rel="nofollow" className="btn-step btn btn-primary">Перейти к дизайну</a>
                                </div>

                            </div>

                            <div id="part-2" className={`${!this.props.state.design?'hidden-part':''}`}>
                                <div className="h3 primary-label">Дизайн и контур порезки:</div>
                                <div className="form-field">
                                    <div className="row frm_opt_container frm_container">
                                        <div className="col-sm-4">
                                            <div className="frm_item frm_radio designselector">
                                                <label htmlFor="field_profile-21">
                                                    <input type="radio" name="design" id="field_profile-21" value="У меня есть макет и контур порезки"/>
                                                        <i></i>
                                                        У меня есть макет <br/>и контур порезки
                                                </label>
                                            </div>
                                            <div className="txt-content">
                                                <p>Если ваш макет соответствует</p>
                                                <p><a href="images/trebovaniya-k-maketam-nakleyki-na.pdf" target="_blank" download="Abaka требования к макетам">требования к макету</a></p>
                                                <p>то загрузите его:</p>

                                                <div className="fileform">
                                                    <div className="selectbutton btn btn-primary">
                                                        <span>Загрузить макет</span>
                                                    </div>
                                                    <input id="upload" type="file" name="files[]" multiple/>
                                                </div>
                                                <svg className="sprite-icon linked-file">
                                                    {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#linked-file"></use>*/}
                                                </svg>
                                                <div id="fileformlabel">
                                            </div>
                                            <input name="file_link" type="text" placeholder="Или вставьте ссылку на скачивание"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="frm_item frm_radio designselector">
                                            <label htmlFor="field_profile-22">
                                                <input type="radio" name="design" id="field_profile-22" value="У меня есть макет, но мне нужен контур порезки"/>
                                                    <i></i>
                                                    У меня есть макет, но мне нужен <br/>контур порезки
                                            </label>
                                        </div>
                                        <div className="txt-content">
                                            <div className="frm_container frm_opt_container row">
                                                <div className="frm_item frm_radio col-lg-12 col-xs-6">
                                                    <label htmlFor="field_profile-210">
                                                        <input type="radio" name="cut_form" id="field_profile-210" value="прямоугольный"/>
                                                            <svg className="sprite-icon form-part2-shape1">
                                                                {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#form-part2-shape1"></use>*/}
                                                            </svg>
                                                            <span>Прямоугольный</span>
                                                    </label>
                                                </div>

                                                <div className="frm_item frm_radio col-lg-4 col-xs-6">
                                                    <label htmlFor="field_profile-211">
                                                        <input type="radio" name="cut_form" id="field_profile-211" value="радиус 3.5мм"/>
                                                            <svg className="sprite-icon form-part2-shape2">
                                                                {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#form-part2-shape2"></use>*/}
                                                            </svg>
                                                            <span>радиус 3,5мм</span>
                                                    </label>
                                                </div>

                                                <div className="frm_item frm_radio col-lg-4 col-xs-6">
                                                    <label htmlFor="field_profile-212">
                                                        <input type="radio" name="cut_form" id="field_profile-212" value="радиус 5мм"/>
                                                            <svg className="sprite-icon form-part2-shape3">
                                                                {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#form-part2-shape3"></use>*/}
                                                            </svg>
                                                            <span>радиус 5мм</span>
                                                    </label>
                                                </div>

                                                <div className="frm_item frm_radio col-lg-4 col-xs-6">
                                                    <label htmlFor="field_profile-213">
                                                        <input type="radio" name="cut_form" id="field_profile-213" value="радиус 10мм"/>
                                                            <svg className="sprite-icon form-part2-shape4">
                                                                {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#form-part2-shape4"></use>*/}
                                                            </svg>
                                                            <span>радиус 10мм</span>
                                                    </label>
                                                </div>

                                                <div className="frm_item frm_radio col-lg-4 col-xs-6">
                                                    <label htmlFor="field_profile-214">
                                                        <input type="radio" name="cut_form" id="field_profile-214" value="овал"/>
                                                            <svg className="sprite-icon form-part2-shape5">
                                                                {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#form-part2-shape5"></use>*/}
                                                            </svg>
                                                            <span>овал</span>
                                                    </label>
                                                </div>

                                                <div className="frm_item frm_radio col-lg-4 col-xs-6">
                                                    <label htmlFor="field_profile-215">
                                                        <input type="radio" name="cut_form" id="field_profile-215" value="круг"/>
                                                            <svg className="sprite-icon form-part2-shape6">
                                                                {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#form-part2-shape6"></use>*/}
                                                            </svg>
                                                            <span>круг</span>
                                                    </label>
                                                </div>

                                                <div className="frm_item frm_radio col-lg-4 col-xs-6">
                                                    <label htmlFor="field_profile-216">
                                                        <input type="radio" name="cut_form" id="field_profile-216" value="звезда"/>
                                                            <svg className="sprite-icon form-part2-shape7">
                                                                {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#form-part2-shape7"></use>*/}
                                                            </svg>
                                                            <span>звезда</span>
                                                    </label>
                                                </div>

                                                <div className="frm_item frm_radio col-lg-4 col-xs-6">
                                                    <label htmlFor="field_profile-217">
                                                        <input type="radio" name="cut_form" id="field_profile-217" value="«Облако» +100грн"/>
                                                            <svg className="sprite-icon form-part2-shape8">
                                                                {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#form-part2-shape8"></use>*/}
                                                            </svg>
                                                            <span>«Облако»<br/>+100грн</span>
                                                    </label>
                                                </div>

                                                <div className="frm_item frm_radio col-lg-4 col-xs-6">
                                                    <label htmlFor="field_profile-218">
                                                        <input type="radio" name="cut_form" id="field_profile-218" value="«Рубленый» +100грн"/>
                                                            <svg className="sprite-icon form-part2-shape9">
                                                                {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#form-part2-shape9"></use>*/}
                                                            </svg>
                                                            <span>«Рубленый»<br/>+100грн</span>
                                                    </label>
                                                </div>

                                                <div className="frm_item frm_radio col-lg-4 col-xs-6">
                                                    <label htmlFor="field_profile-219">
                                                        <input type="radio" name="cut_form" id="field_profile-219" value="«Акцент» +100грн"/>
                                                            <svg className="sprite-icon form-part2-shape10">
                                                                {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#form-part2-shape10"></use>*/}
                                                            </svg>
                                                            <span>«Акцент»<br/>+100грн</span>
                                                    </label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="frm_item frm_radio designselector">
                                            <label htmlFor="field_profile-23">
                                                <input type="radio" name="design" id="field_profile-23" value="У меня нет макета, мне нужен дизайн"/>
                                                    <i></i>
                                                    У меня нет макета, <br/>мне нужен дизайн
                                            </label>
                                        </div>
                                        <div className="txt-content">
                                            <p className="description">Мы делаем отличный дизайн наклеек. Стоимость индивидуального дизайна от 400грн, в зависимости от уровня сложности работы.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <a href="javascript:;" data-step="1" rel="nofollow" className="btn-step btn btn-primary">Назад к просчету</a>
                                <a href="javascript:;" data-step="3" rel="nofollow" className="btn-step btn btn-primary">Оформить заказ</a>
                            </div>
                    </div>

                    <div id="part-3" className={`${!this.props.state.deliver?'hidden-part':''}`}>
                        <div className="form-field">
                            <div className="h3 primary-label">Ваше имя:</div>
                            <div className="frm_container">
                                <input name="user_name" type="text" placeholder="Вадим"/>
                            </div>
                        </div>
                        <div className="form-field">
                            <div className="row">
                                <div className="col-lg-5 col-sm-6">
                                    <div className="h3 primary-label">Телефон:</div>
                                    <div className="frm_container">
                                        <input name="user_phone" type="tel" placeholder="+38 066 910 32 19"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="h3 primary-label">Почта:</div>
                                    <div className="frm_container">
                                        <input name="user_mail" type="email" placeholder="vadim@gmail.com"/>
                                            <p className="error-msg"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-field">
                            <div className="h3 primary-label">Оплата:</div>
                            <div className="frm_container frm_opt_container">
                                <div className="frm_item frm_radio">
                                    <label htmlFor="field_profile-31">
                                        <input name="user_payment_method" type="radio" id="field_profile-31" value="Оплата LiqPay"/>
                                            <i></i>
                                            Оплата LiqPay (Visa/MasterCard, <br/>Приват24, Терминал)
                                    </label>
                                </div>
                                <div className="frm_item frm_radio">
                                    <label htmlFor="field_profile-32">
                                        <input type="radio" name="user_payment_method" id="field_profile-32" value="Безналичный"/>
                                            <i></i>
                                            Безналичный расчет <br/>(для юр.лиц + 5%)
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-field">
                            <div className="h3 primary-label">Доставка:</div>
                            <div className="frm_container frm_opt_container">

                                <div className="frm_item frm_radio">
                                    <label htmlFor="field_profile-37">
                                        <input type="radio" name="user_delivery" id="field_profile-37" value="Новая Почта"/>
                                            <i></i>
                                            Новая Почта (оплата по тарифам Новой Почты)
                                    </label>
                                </div>
                                <div className="frm_item frm_radio">
                                    <label htmlFor="field_profile-36">
                                        <input type="radio" name="user_delivery" id="field_profile-36" value="Доставка по Одессе"/>
                                            <i></i>
                                            Доставка по Одессе
                                    </label>
                                    <p className="description" id="form_delivery" style={{display : 'none'}}>+30-50 грн в зависимости <br className="hidden-xs"/>от Вашего района</p>
                                </div>
                                <div className="frm_item frm_radio">
                                    <label htmlFor="field_profile-35">
                                        <input type="radio" name="user_delivery" id="field_profile-35" value="Самовывоз"/>
                                            <i></i>
                                            Самовывоз
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div id="form_contacts" style={{display : 'none'}} className="form-field">
                            <div className="h3 primary-label">Адрес доставки:</div>
                            <div className="frm_container">
                                <input type="textarea" name="user_contacts" rows="3" placeholder="Укажите имя получателя, его телефон, город и номер отделения Новой почты" />
                            </div>
                        </div>
                        <div className="form-field">
                            <div className="h3 primary-label">Комментарий:</div>
                            <div className="frm_container">
                                <input type="textarea" name="user_comment" rows="3" placeholder="Введите ваш комментарий" />
                            </div>
                        </div>
                        <div id="user_files">

                        </div>

                        <div className="text-right">
                            <input type="submit" className="btn btn-primary" value="Подтвердить заказ"/>
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
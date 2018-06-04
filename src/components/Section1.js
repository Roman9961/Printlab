import React from 'react';
import base from '../base';
import calc from './calculator';

class Section1 extends React.Component{
    state = {
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
            "width" : ""
        }
    };
    componentDidMount(){
        this.ref = base.syncState('Stickers/calculator',{
            context: this,
            state: 'calculator',
            then () {
            }
        });

    }
    componentDidUpdate(){
        calc(this.state);
    }

     updatecalcProp =  (key, value) =>{
        const calcProp = {...this.state.calcProp};

         calcProp[key] = value;
         if(calcProp.height>378 || calcProp.width>278 ||  value == 'Рулонная'){
             calcProp.print_type = 'Рулонная';
         }
         if(calcProp.print_type == 'Рулонная'){
             calcProp.basis = 'Пластиковая';
         }

        this.setState({calcProp});
    }

    handleChange = async (event) => {
       await this.updatecalcProp(event.currentTarget.name, (event.currentTarget.name==='lamination')?event.currentTarget.checked:event.currentTarget.value);
        const calculator = this.state;
        await calc(calculator);
    };
    render(){
        return (
    <section className="form-row"><div id="form-calculator" className="popup-wrapper">
        <div className="close-popup btn-close-popup"><i className="icon-cross"></i></div>
        <div id="final-price" className="price-wrapper">
            <span>0</span>
        </div>
        <div className="popup">
            <div className="container">

                <div className="row">
                    <div className="col-md-1 col-sm-2 col-xs-12">
                        <div className="logo">
                            <img alt="Наклейки" title="Наклейки" src="images/nakleyki-logo-header-on-white.svg"/>
                        </div>
                        <h2 className="visible-xs">Калькулятор <br/>цены и заказ</h2>
                    </div>
                    <div className="col-sm-4 col-xs-9 hidden-xs">
                        <h2>Калькулятор <br/>цены и заказ</h2>
                    </div>
                    <div className="col-sm-6 col-md-offset-1 col-sm-offset-0 col-xs-12 text-right">
                        <input name="p1_printOn" type="text" placeholder="на банки"/>
                            <p className="with-green-arrow-top">Укажите на что хотите напечатать наклейки</p>
                    </div>
                </div>

                <div className="row no-padding">
                    <div className="col-xs-4">
                        <div className="form-step-wrapper active">
                            <i data-step="1" className="icon-checkmark btn-step"></i>
                            <p>1. Печать</p>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="form-step-wrapper">
                            <i data-step="2" className="icon-checkmark btn-step"></i>
                            <p>2. Дизайн</p>
                        </div>
                    </div>
                    <div className="col-xs-4">
                        <div className="form-step-wrapper">
                            <i data-step="3" className="icon-checkmark btn-step"></i>
                            <p>3. Оплата и доставка</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12">
                        <form id="sendorder">

                            <div id="part-1">
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
                                {!(this.state.calcProp.print_type === 'Рулонная') &&
                                <div className="form-field shape-row">
                                    <div className="h3 primary-label">Форма наклейки:</div>
                                    <div className="frm_container frm_opt_container">
                                        <div className="frm_radio">
                                            <label htmlFor="field_profile-11">
                                                <input type="radio" name="form" id="field_profile-11" value="Прямоугольная" onClick={this.handleChange}/>
                                                    <div className="shape-wrapper">
                                                        <svg className="sprite-icon icon-shape">
                                                            {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#shape-rect"></use>*/}
                                                        </svg>
                                                        <i className="icon-check"></i>
                                                    </div>
                                                    <span>Прямоугольная<br/>(без скругления)</span>
                                            </label>
                                        </div>
                                        <div className="frm_radio">
                                            <label htmlFor="field_profile-12">
                                                <input type="radio" name="form" id="field_profile-12" value="Простая форма" onClick={this.handleChange}/>
                                                    <div className="shape-wrapper">
                                                        <svg className="sprite-icon icon-shape">
                                                            {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#shape-round"></use>*/}
                                                        </svg>
                                                        <i className="icon-check"></i>
                                                    </div>
                                                    <span>Простая форма</span>
                                            </label>
                                        </div>
                                        <div className="frm_radio">
                                            <label htmlFor="field_profile-13">
                                                <input type="radio" name="form" id="field_profile-13" value="Сложная форма" onClick={this.handleChange}/>
                                                    <div className="shape-wrapper">
                                                        <svg className="sprite-icon icon-shape">
                                                            {/*<use xmlns:xlink="http://www.w3.org/2000/xlink" xlink:href="#shape-compl"></use>*/}
                                                        </svg>
                                                        <i className="icon-check"></i>
                                                    </div>
                                                    <span>Сложная форма</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                }

                                <div className="form-field">
                                    <div className="row">
                                        <div className="col-lg-7 col-md-6 col-sm-12">
                                            <div className="h3 primary-label">Размер:</div>
                                            <div className="frm_container">
                                                <p className="error-msg"></p>
                                                <div className="frm_item">
                                                    <span className="description top">Высота, мм</span>
                                                    <input  type="number" name="height" id="field_profile-14" value={this.state.calcProp.height} min="3" max="438" onChange={this.handleChange} placeholder="302"/>
                                                        <i className="icon-check"></i>
                                                </div>
                                                <div className="frm_item h3 gray">х</div>
                                                <div className="frm_item">
                                                    <span className="description top">Ширина, мм</span>
                                                    <input type="number" name="width" id="field_profile-15" value={this.state.calcProp.width} onChange={this.handleChange} min="3" max="308"  placeholder="200"/>
                                                        <i className="icon-check"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-5 col-md-6 col-sm-12">
                                            <div className="h3 primary-label">Количество:</div>
                                            <div className="frm_container">
                                                <div className="frm_item">
                                                    <span className="description top">Штук</span>
                                                    <input type="number" name="quantity" id="field_profile-16" value={this.state.calcProp.quantity} onChange={this.handleChange} min="0" max="99999" step="1" placeholder="21800"/>
                                                        <i className="icon-check"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {!(this.state.calcProp.print_type === 'Рулонная') &&
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
                                    </div>
                                </div>
                                }
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

                            <div id="part-2" style={{display : 'none'}}>
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

                    <div id="part-3" style={{display : 'none'}}>
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
                                <textarea name="user_contacts" rows="3" placeholder="Укажите имя получателя, его телефон, город и номер отделения Новой почты"></textarea>
                            </div>
                        </div>
                        <div className="form-field">
                            <div className="h3 primary-label">Комментарий:</div>
                            <div className="frm_container">
                                <textarea name="user_comment" rows="3" placeholder="Введите ваш комментарий"></textarea>
                            </div>
                        </div>

                        <textarea id="user_files" name="user_files" rows="3" placeholder="" className="none"></textarea>

                        <div className="text-right">
                            <input type="submit" className="btn btn-primary" value="Подтвердить заказ"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>

</div>
</section>
        )
    }
}
export default Section1;
import React from 'react';
import base from '../base';
import calc from './calculator';
import ReactTooltip from 'react-tooltip';

class FastCalculator extends React.Component{
    state = {
        calculator : {

        },
        calcProp:{
            "basis" : "Пластиковая",
            "basis_param":"white",
            "print_type" : "Листовая",
            "cut_form" : "simple",
            "design" : "",
            "form" : "Прямоугольная",
            "height" : 40,
            "width" : 40,
            "lamination" : "",
            "numberoflist" : "",
            "print_time" : 4,
            "quantity" : "100",
            "stamping" : "",
            "stickersonlist" : "",
            "type" : "",
            "varnish" : "",
            "margin":4,
            "price":0,
        },
        customSizes: false,
        customAmount: false,
        title:{
            rectangle:'Наклейки прямоугольные',
            simple:'Наклейки простой формы',
            hard:'Наклейки сложной формы',
            roll:'Рулонная цифровая печать'
        }
    };
    componentDidMount(){

        this.setState((state)=>({
            ...state,
            calculator: this.props.calculator
        }));
                switch (this.props.form) {
                    case 'rectangle':
                        this.updatecalcProp('form', 'Прямоугольная');
                        break;
                    case 'simple':
                        this.updatecalcProp('form', 'Простая форма');
                        break;
                    case 'hard':
                        this.updatecalcProp('form', 'Сложная форма');
                        break;
                    case 'roll':
                        this.updatecalcProp('print_type', 'Рулонная');
                        this.updatecalcProp('form', 'Рулонная');
                        break;
                }
    }

    componentDidUpdate(){
            const price = calc(this.state);

            if(price!=this.state.calcProp.price){
                this.setState((state)=>({
                            ...state,
                            calcProp:{
                                ...state.calcProp,
                                price
                            }

                        }));
            }

    }

    updatecalcProp =   (key, value) =>{
        const calcProp = {...this.state.calcProp};
        
        calcProp[key] = value;
        if(calcProp.form === 'Рулонная'){
            calcProp.print_type = 'Рулонная'
        }else{
            calcProp.print_type = 'Листовая';
            if( calcProp.width>378){
                calcProp.width =378;
            }
            if( calcProp.height>278){
                calcProp.height =278;
            }

        }
         this.setState((state)=>({
             ...state,
             calcProp
         }));
    }

    handleChange = async (event) => {
        await this.updatecalcProp(event.currentTarget.name, event.currentTarget.value);
    };

    selectHandleChange = async (event) => {
        const str = event.currentTarget.value;
        const props = JSON.parse(`${str}`);
        if(
            Number.isInteger(parseInt(props.width))&&
            Number.isInteger(parseInt(props.height))
        ) {
            this.setState((state)=>({
                ...state,
                customSizes: false
            }));
            await this.updatecalcProp('width', props.width);
            await this.updatecalcProp('height', props.height);
        }
        else{
            this.setState((state)=>({
                ...state,
                customSizes: true
            }));
        }
    };

    selectQuantityHandleChange = async (event) => {
        const str = event.currentTarget.value;
        if(
            str !='custom'
        ) {
            this.setState((state)=>({
                ...state,
                customAmount: false
            }));
            await this.updatecalcProp('quantity', str);
        }
        else{
            this.setState((state)=>({
                ...state,
                customAmount: true
            }));
        }
    };
    render(){
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        return (
            <div className="express-calculator">
                <div className="express-calculator__item express-calculator__item--icon">
                    <img src={`images/${this.props.form}.svg`} alt=""/>
                </div>
                <div className="express-calculator__item">
                    <div className="express-calculator__title express-calculator__item--header">{this.state.title[this.props.form]}</div>
                    <a className={`info info--${this.props.form}`} data-for={this.props.form} data-tip />
                    <ReactTooltip className="tooltip_custom" id={this.props.form} type="light"  globalEventOff={ isMobile ? 'touchstart' : undefined } >
                        <div className="tooltip__container">
                            <div className="tooltip__description">
                                {this.props.form=='rectangle'&&(
                                    <React.Fragment>
                                    <div>Прямоугольная наклейка, размером более 40 х 40 мм. Эти наклейки режутся на гильотине, отдаются в пачке, каждая наклейка будет отдельно. Основа может быть бумажной или синтетической (пленка)</div>
                                    <div>Из преимуществ стоит отметить низкую стоимость и оперативную скорость изготовления, как правило это 24 часа с момента подачи макета</div>
                                    </React.Fragment>
                                )
                                }
                                {this.props.form=='simple'&&(
                                    <React.Fragment>
                                        Наклейки могут иметь простую геометрическую форму: круг, овал, треугольник, ромб. Этот тип наклеек мы режем на плоттере. По вашему желанию мы можем отдать наклейки на листе SRA3 (32х45 см) или высечь каждую наклейку отдельно.
                                    </React.Fragment>
                                )
                                }
                                {this.props.form=='hard'&&(
                                    <React.Fragment>
                                        Наклейки могут иметь сложную форму: буквы, стрелочки, сердечки, звездочки. Этот тип наклеек мы тоже режем на плоттере. По вашему желанию мы можем отдать наклейки на листе SRA3 (32х45 см) или высечь каждую наклейку отдельно (необходимо предварительно проконсультироваться с менеджером).
                                    </React.Fragment>
                                )
                                }
                                {this.props.form=='roll'&&(
                                    <React.Fragment>
                                        <div>Наклейки печатаются на цифровой рулонной машине, ширина полотна 330 мм.</div>
                                        <div>Из преимуществ стоит отметить:</div>
                                        <div>Более 3500 сертифицированных материалов для печати</div>
                                        <div>Полноцветная печать, использование белил и пантонов</div>
                                        <div>Тиснение, выборочная лакировка, ламинация, высечка без изготовления штампа</div>
                                        <div>Отсутствие приладок, как это требуется во флексопечати</div>
                                        <div>Возможность использования в этикетировочных машинах</div>
                                    </React.Fragment>
                                )
                                }
                            </div>
                        </div>
                    </ReactTooltip>
                    
                </div>
                <div className="express-calculator__item">
                    <span className="description top">Размеры</span>
                    <div className="custom-select">
                        <select name="sizes" onChange={this.selectHandleChange}>
                            <option value='{"width":40,"height":40}'>40x40</option>
                            <option value='{"width":60,"height":60}'>60x60</option>
                            <option value='{"width":"custom","height":"custom"}'>Произвольные</option>
                        </select>
                    </div>
                </div>
                {
                    this.state.customSizes && (
                        <div className="express-calculator__item express-calculator__item--custom">
                            <span className="custom-sizes-description">Ширина х Высота</span>
                            <div className="custom-sizes-container">
                                <input className="custom-sizes" type="number" name="width" value={this.state.calcProp.width} onChange={this.handleChange}/>
                                <input className="custom-sizes" type="number" name="height" value={this.state.calcProp.height} onChange={this.handleChange}/>
                            </div>
                        </div>
                    )
                }


                <div className="express-calculator__item">
                    <span className="description top">Количество</span>
                    <div className="custom-select">
                        <select name="quantity" onChange={this.selectQuantityHandleChange}>
                            <option value="100">100шт.</option>
                            <option value="200">200шт.</option>
                            <option value="500">500шт.</option>
                            <option value="1000">1000шт.</option>
                            <option value="custom">Другое</option>
                        </select>
                    </div>
                </div>
                {
                    this.state.customAmount && (
                        <div className="express-calculator__item express-calculator__item--custom">
                            <span className="custom-sizes-description"></span>
                            <div className="custom-sizes-container">
                                <input className="custom-sizes" type="number" name="quantity" value={this.state.calcProp.quantity} onChange={this.handleChange}/>
                            </div>
                        </div>
                    )
                }

                <div className="express-calculator__item">
                    <span className="description top">Материал</span>
                    <div className="custom-select">
                        <select name="basis" onChange={this.handleChange}>
                            <option value="Пластиковая">Пленка</option>
                            <option value="Бумажная">Бумага</option>
                        </select>
                    </div>
                </div>
                {this.props.form=='roll'&&(
                        <div className="express-calculator__item">
                            <span className="description top">Форма</span>
                            <div className="custom-select">
                                <select name="cut_form" onChange={this.handleChange}>
                                    <option value="simple">Простая</option>
                                    <option value="hard">Сложная</option>
                                </select>
                            </div>
                        </div>
                )
                }
                <div className="express-calculator__item express-calculator__item--final">
                    <input type="hidden" name="print_type" id="field_profile-117" value="Листовая"/>
                    <div>
                        <div>Стоимость:</div>
                        <div className="express-calculator__final-price">
                            <span>{this.state.calcProp.price}</span><span> грн</span>
                        </div>
                    </div>
                    <div className="express-calculator__basket" onClick={()=>{this.props.handleModal(this.state.calcProp)}}>
                        <img src="images/basket.svg" alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}
export default FastCalculator;
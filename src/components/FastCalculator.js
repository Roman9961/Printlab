import React from 'react';
import base from '../base';
import calc from './calculator';
import {updateTooltip} from '../tooltip';

class FastCalculator extends React.Component{
    state = {
        calculator : {

        },
        calcProp:{
            "basis" : "Пластиковая",
            "print_type" : "Листовая",
            "cut_form" : "",
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
            "user_comment" : "",
            "user_contacts" : "",
            "user_delivery" : "",
            "user_delivery_district" : "",
            "user_mail" : "",
            "user_name" : "",
            "user_payment_method" : "",
            "user_phone" : "",
            "varnish" : "",
            "selector": `final-price-${this.props.form}`,
            "margin":4
        }
    };
    componentDidMount(){
        this.ref = base.syncState('Stickers/calculator',{
            context: this,
            state: 'calculator',
            then () {
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
                        break;
                }
            }
        });


    }
    componentDidUpdate(){
        updateTooltip(this.props.form);
        calc(this.state);
    }

     updatecalcProp =  async (key, value) =>{
        const calcProp = {...this.state.calcProp};

         calcProp[key] = value;

       await this.setState(()=>({calcProp}));
    }

    handleChange = async (event) => {
       await this.updatecalcProp(event.currentTarget.name, event.currentTarget.value);
        const calculator = this.state;
        await calc(calculator);
    };

    selectHandleChange = async (event) => {
        const str = event.currentTarget.value;
        const props = JSON.parse(`${str}`);

        await this.updatecalcProp('width', props.width);
        await this.updatecalcProp('height', props.height);

        const calculator = this.state;
        await calc(calculator);
    };
    render(){
        return (
    <div className="express-calculator">
        <div className="express-calculator__item express-calculator__item--icon">
            <img src={`images/${this.props.form}.svg`} alt=""/>
        </div>
                            <div className="express-calculator__item">
                                <div className="express-calculator__title express-calculator__item--header">Наклейки прямоугольные</div>
                                <div
                                    className={`info info--${this.props.form}`}
                                    data-description="sfglskflksd"
                                    data-sizes={`${this.state.calcProp.width}мм x ${this.state.calcProp.height}мм`}
                                    data-basis={`${this.state.calcProp.basis}`}
                                    data-amount={`${this.state.calcProp.quantity} шт.`}
                                    title=""
                                >
                                    <img src="images/information.svg" alt=""/>
                                </div>
                            </div>
                            <div className="express-calculator__item">
                                <span className="description top">Размеры</span>
                                <div className="custom-select">
                                    <select name="sizes" onChange={this.selectHandleChange}>
                                        <option value='{"width":40,"height":40}'>40x40</option>
                                        <option value='{"width":60,"height":60}'>60x60</option>
                                    </select>
                                </div>
                            </div>


                            <div className="express-calculator__item">
                                <span className="description top">Количество</span>
                                <div className="custom-select">
                                <select name="quantity" onChange={this.handleChange}>
                                    <option value="100">100шт.</option>
                                    <option value="200">200шт.</option>
                                    <option value="500">500шт.</option>
                                    <option value="1000">1000шт.</option>
                                </select>
                                    </div>
                            </div>

                            <div className="express-calculator__item">
                                <span className="description top">Материал</span>
                                <div className="custom-select">
                                <select name="basis" onChange={this.handleChange}>
                                    <option value="Пластиковая">Пленка</option>
                                    <option value="Бумажная">Бумага</option>
                                </select>
                                    </div>
                            </div>
        <div className="express-calculator__item express-calculator__item--final">
            <input type="hidden" name="print_type" id="field_profile-117" value="Листовая"/>
            <div id={`final-price-${this.props.form}`} className="price-wrapper">
                <div>Стоимость:</div>
                <div className="express-calculator__final-price">
                <span>0</span><span> грн</span>
                </div>
            </div>
            <div className="express-calculator__basket">
                <img src="images/basket.svg" alt=""/>
            </div>
        </div>
</div>
        )
    }
}
export default FastCalculator;
import React from 'react';
import Scroll from 'react-scroll-to-element';
import { Link } from 'react-router-dom';

const translations = {
    ua:{
        'title': 'Друкуємо наклейки',
        'layout': 'Вимоги до макетів',  
        'prices': 'Ціни',
        'terms': 'Договір надання послуг',
        'payment': 'Оплата і доставка',
    },
    ru:{
        'title': 'Печатаем наклейки',
        'info': 'Не стираются, любой формы, гарантируем качество. Изготовим за 1–3 рабочих дня',
        'layout': 'Требования к макетам',
        'prices': 'Цены',
        'terms': 'Договор оказания услуг',
        'payment': 'Оплата и доставка',
    }
}

const Footer = props => {
    
    const  getTranslation = () => {
        return translations[props.locale]
    }

    return (
    <footer>
        <div className="wrapper-container">
            <div className="container">
                <div  className="header">
                    <div className="header__logo footer__logo">
                    </div>
                    <div className="header__menu">
                        <Scroll type="class" element="prices"><div className="header__menu__item">{getTranslation().prices}</div></Scroll>
                        <Scroll type="class" element="requairements"><div className="header__menu__item">{getTranslation().layout}</div></Scroll>
                        <Scroll type="class" element="delivery__top"><div className="header__menu__item">{getTranslation().payment}</div></Scroll>
                    </div>
                    <div className="footer__terms">
                        <span className="terms"><Link to={`/terms/${props.locale}`} target="_blank" >{getTranslation().terms}</Link></span>
                        <img alt="Наклейки" title="Наклейки" src="images/visa_logo2.svg"/>
                    </div>
                </div>
            </div>
    </div>
    </footer>
    )
};

export default Footer;
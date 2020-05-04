import React from 'react';
import Scroll from 'react-scroll-to-element';
import Modal from 'react-modal';

const stickyMenuOpen =()=>{
    document.getElementsByClassName('sticky-header')[0].classList.add('sticky-hover');
}
const stickyMenuClose =()=>{
    document.getElementsByClassName('sticky-header')[0].classList.remove('sticky-hover');
}

const translations = {
    ua:{
        'title': 'Друкуємо наклейки',
        'info': 'Друкуємо наклейки Зображення не стирається, будь-якої форми, гарантуємо якість. Виготовимо за 1-3 робочих дня',
        'layout': 'Вимоги до макетів',  
        'prices': 'Ціни',
        'check_price': 'Дізнатися ціну',
        'check_stickers': 'Порахувати наклейки',
        'payment': 'Оплата і доставка',
    },
    ru:{
        'title': 'Печатаем наклейки',
        'info': 'Не стираются, любой формы, гарантируем качество. Изготовим за 1–3 рабочих дня',
        'layout': 'Требования к макетам',
        'prices': 'Цены',
        'check_price': 'Узнать цену',
        'check_stickers': 'Посчитать наклейки',
        'payment': 'Оплата и доставка',
    }
}

const Header = (props) => {
    const  getTranslation = () => {
        return translations[props.locale]
    }
    return(
    <header>
        <div className="wrapper-container">
            <div className="container main-header">
                <div  className="header">
                    <div className="header__logo">
                    </div>
                    <div className="mobile-contacts">
                       
                        <div className="header__contacts__phone__icon">
                            <a href="mailto:zakaz@okprint.com.ua"> <img style={{height:'97%'}} alt="Наклейки" title="Наклейки" src="images/email@1x.svg"/> </a>
                        </div>
                        <div className="header__contacts__phone__icon"><a href="javascript:;" style={{textDecoration:'none', color:'#333333', fontSize:'22px'}} onClick={props.changeLocale}>{props.locale=='ua'?'RU':'UA'}</a></div>
                    </div>
                    <div className="header__menu">
                        <Scroll type="class" element="requairements"><div className="header__menu__item">{getTranslation().layout}<br className="hidden-xs"/></div></Scroll>
                        <Scroll type="class" element="prices"><div className="header__menu__item">{getTranslation().prices}</div></Scroll>
                        <Scroll type="class" element="delivery__top"><div className="header__menu__item">{getTranslation().payment}</div></Scroll>
                        <div type="class" element="delivery__top"><div className="header__menu__item"><a href="javascript:;"onClick={props.changeLocale}>{props.locale=='ua'?'RU':'UA'}</a></div></div>
                    </div>
                    <div className="header__contacts">
                        <div className="header__contacts__phone">
                            <div className="header__contacts__phone__icon">
                                <img alt="Наклейки" title="Наклейки" src="images/call.svg"/>
                            </div>
                            <div className="header__contacts__phone__block">
                                <span>(067) 828 32 12</span>
                                <span>(044) 232 10 88</span>
                            </div>
                        </div>
                        <a href="mailto:zakaz@okprint.com.ua">zakaz@okprint.com.ua</a>
                    </div>
                    <div className="menu-icon" onClick={(e)=>{
                        e.currentTarget.classList.toggle('open');
                    }}><i></i>
                    </div>
                    <div className="menu">
                        <Scroll type="class" element="requairements"><div className="header__menu__item">{getTranslation().layout}</div></Scroll>
                        <Scroll type="class" element="prices"><div className="header__menu__item">{getTranslation().prices}</div></Scroll>
                        <Scroll type="class" element="design"><div className="header__menu__item">Дизайн</div></Scroll>
                        <Scroll type="class" element="delivery__top"><div className="header__menu__item">{getTranslation().payment}</div></Scroll>
                    </div>
                </div>
            </div>
            <div className="side-img side-img--right mobile-hidden">
                <img alt="Наклейки" title="Наклейки" src="images/side-image-1.svg"/>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h1 className="header__title">{getTranslation().title}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="header__subtitle">
                        {getTranslation().info}
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="side-img side-img--left">
                        <img alt="Наклейки" title="Наклейки" src="images/orange_path.svg"/>
                    </div>
                    <div className="col-md-6">
                        <a href="javascript:;" rel="nofollow" className="button button--calculator" onClick={()=>{gtag('event', 'Отправить', {'event_category':'Кнопка', 'event_label':'Узнать цену'}); props.handleModal({})}}>{getTranslation().check_price}</a>
                    </div>
                </div>
            </div>

        </div>
        <div className={`sticky-header ${props.stickyMenu?'scroll':''}`} onMouseEnter={stickyMenuOpen} onMouseLeave={stickyMenuClose}>
            <div className="container">
                <div className="row">
                    <div className="col-md-2 col-sm-3">
                        <a href="javascript:;" rel="nofollow" data-scrollto="header" className="logo"><img
                            alt="Цифровая печать" title="Цифровая печать" src="images/logo.svg"/></a>
                    </div>
                    <div className="col-md-7 col-md-offset-1 col-sm-7 col-sm-offset-0">
                        <div className="wrapper-flex">
                            <div className="header__contacts__phone__icon">
                                <div className="phone-container" onClick={props.handleCallModal}>
                                <img className="phone" alt="Наклейки" title="Наклейки" src="images/call.svg"/>
                                </div>
                            </div>
                            <div className="header__contacts header__contacts__phone__block">
                                <a href="tel:+380678283212" onClick={()=>{gtag('event', 'Pop-up позвонить', {'event_category':'Кнопка', 'event_label':'Позвонить'})}}> (067) 828 32 12</a>
                            </div>
                            <a href="javascript:;"  rel="nofollow" className="button button-green" onClick={()=>{gtag('event', 'Pop-up посчитать', {'event_category':'Кнопка', 'event_label':'Посчитать наклейки'}); props.handleModal({})}}>{getTranslation().check_stickers}</a>
                        </div>                </div>
                    <div className="col-md-2 col-sm-2">
                        <div className="menu-icon" onClick={(e)=>{
                            e.currentTarget.classList.toggle('open');
                        }}><i></i></div>
                        <div className={`header__menu sticky-header--menu ${props.stickyMenu?'open':''}`}>
                            <Scroll type="class" element="requairements"><div className="header__menu__item"><a href="javascript:;">{getTranslation().layout}</a></div></Scroll>
                            <Scroll type="class" element="prices"><div className="header__menu__item"><a href="javascript:;">{getTranslation().prices}</a></div></Scroll>
                            <Scroll type="class" element="design"><div className="header__menu__item"><a href="javascript:;">Дизайн</a></div></Scroll>
                            <Scroll type="class" element="delivery__top"><div className="header__menu__item"><a href="javascript:;">{getTranslation().payment}</a></div></Scroll>
                            <div type="class" element="delivery__top"><div className="header__menu__item"><a href="javascript:;"onClick={props.changeLocale}>{props.locale=='ua'?'RU':'UA'}</a></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
);
}

export default Header;

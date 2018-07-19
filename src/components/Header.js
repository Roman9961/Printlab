import React from 'react';
import Scroll from 'react-scroll-to-element';

const stickyMenuOpen =()=>{
    document.getElementsByClassName('sticky-header')[0].classList.add('sticky-hover');
}
const stickyMenuClose =()=>{
    document.getElementsByClassName('sticky-header')[0].classList.remove('sticky-hover');
}

const Header = (props) => (
    <header>
        <div className="wrapper-container">
            <div className="container">
                <div  className="header">
                    <div className="header__logo">
                    </div>
                    <div className="header__menu">
                        <Scroll type="class" element="prices"><div className="header__menu__item"><a href="javascript:;">Цены</a></div></Scroll>
                        <Scroll type="class" element="requairements"><div className="header__menu__item"><a href="javascript:;" >Требования к макетам <br className="hidden-xs"/></a></div></Scroll>
                        <Scroll type="class" element="delivery__top"><div className="header__menu__item"><a href="javascript:;" >Оплата и доставка</a></div></Scroll>
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
                </div>
            </div>
            <div className="side-img side-img--right">
                <img alt="Наклейки" title="Наклейки" src="images/side-image-1.svg"/>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h1 className="header__title">Печатаем наклейки</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <h2 className="header__subtitle">Не стираются, любой формы, гарантируем
                            качество. Изготовим за 1–3 рабочих дня.
                        </h2>
                    </div>
                </div>
                <div className="row">
                    <div className="side-img side-img--left">
                        <img alt="Наклейки" title="Наклейки" src="images/orange_path.svg"/>
                    </div>
                    <div className="col-md-6">
                        <a href="javascript:;" rel="nofollow" className="button button--calculator" onClick={()=>(props.handleModal({}))}>Посчитать цену</a>
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
                    <div className="col-md-6 col-md-offset-1 col-sm-7 col-sm-offset-0">
                        <div className="wrapper-flex">
                            <div className="header__contacts__phone__icon">
                                <img alt="Наклейки" title="Наклейки" src="images/call.svg"/>
                            </div>
                            <div className="header__contacts header__contacts__phone__block">
                                <a href="tel:+380678283212"> (067) 828 32 12</a>
                            </div>
                            <a href="javascript:;"  rel="nofollow" className="button" onClick={()=>(props.handleModal({}))}>Посчитать наклейки</a>
                        </div>                </div>
                    <div className="col-md-3 col-sm-2">
                        <div className="menu-icon" onClick={(e)=>{
                            e.currentTarget.classList.toggle('open');
                        }}><i></i></div>
                        <div className={`header__menu sticky-header--menu ${props.stickyMenu?'open':''}`}>
                            <Scroll type="class" element="prices"><div className="header__menu__item"><a href="javascript:;">Цены</a></div></Scroll>
                            <Scroll type="class" element="requairements"><div className="header__menu__item"><a href="javascript:;">Требования к макетам</a></div></Scroll>
                            <Scroll type="class" element="design"><div className="header__menu__item"><a href="javascript:;">Дизайн</a></div></Scroll>
                            <Scroll type="class" element="delivery__top"><div className="header__menu__item"><a href="javascript:;">Оплата и доставка</a></div></Scroll>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
);

export default Header;
